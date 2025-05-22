import React, { useState } from 'react';
import { RecommendationType } from '../types/analysis';
import { AlertTriangle, Check, Filter } from 'lucide-react';

interface RecommendationsProps {
  recommendations: RecommendationType[];
}

export const Recommendations: React.FC<RecommendationsProps> = ({ recommendations }) => {
  const [filter, setFilter] = useState<'all' | 'AEO' | 'SEO'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'High' | 'Medium' | 'Low'>('all');
  
  const filteredRecommendations = recommendations.filter(rec => {
    const matchesCategory = filter === 'all' || rec.category === filter;
    const matchesPriority = priorityFilter === 'all' || rec.priority === priorityFilter;
    return matchesCategory && matchesPriority;
  });

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900">Recommended Improvements</h3>
        <p className="mt-1 text-sm text-gray-500">
          Prioritized list of actions to improve your SEO and AEO performance
        </p>
      </div>
      
      <div className="mb-6 flex flex-wrap gap-3">
        <div className="flex bg-gray-100 rounded-md p-1">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${
              filter === 'all' 
                ? 'bg-white shadow-sm text-gray-900' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('SEO')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${
              filter === 'SEO' 
                ? 'bg-white shadow-sm text-blue-600' 
                : 'text-gray-500 hover:text-blue-600'
            }`}
          >
            SEO
          </button>
          <button
            onClick={() => setFilter('AEO')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${
              filter === 'AEO' 
                ? 'bg-white shadow-sm text-purple-600' 
                : 'text-gray-500 hover:text-purple-600'
            }`}
          >
            AEO
          </button>
        </div>
        
        <div className="flex items-center">
          <span className="mr-2 text-sm text-gray-500">
            <Filter className="h-4 w-4 inline-block" /> Priority:
          </span>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as any)}
            className="form-select rounded-md border-gray-300 py-1.5 text-sm"
          >
            <option value="all">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
        </div>
      </div>
      
      <div className="divide-y divide-gray-200">
        {filteredRecommendations.length === 0 ? (
          <div className="py-4 text-center text-gray-500">
            No recommendations match the selected filters.
          </div>
        ) : (
          filteredRecommendations.map((rec, index) => (
            <div 
              key={index} 
              className="py-4 flex items-start animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mr-4 flex-shrink-0">
                {rec.priority === 'High' ? (
                  <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                  </div>
                ) : rec.priority === 'Medium' ? (
                  <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  </div>
                ) : (
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Check className="h-4 w-4 text-blue-600" />
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center">
                  <span 
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      rec.category === 'SEO' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {rec.category}
                  </span>
                  <span 
                    className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      rec.priority === 'High' 
                        ? 'bg-red-100 text-red-800' 
                        : rec.priority === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {rec.priority} Priority
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-700">{rec.recommendation}</p>
                <button className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  Learn more
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};