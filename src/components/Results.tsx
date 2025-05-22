import React, { useState } from 'react';
import { AnalysisType } from '../types/analysis';
import { ScoreGauge } from './ScoreGauge';
import { ScoreDetails } from './ScoreDetails';
import { Recommendations } from './Recommendations';
import { Download, BarChart } from 'lucide-react';

interface ResultsProps {
  analysis: AnalysisType;
}

export const Results: React.FC<ResultsProps> = ({ analysis }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'seo' | 'aeo' | 'recommendations'>('overview');
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="mt-8 bg-white shadow rounded-lg overflow-hidden transition-all duration-500 ease-in-out">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Analysis Results</h2>
            <p className="mt-1 text-sm text-gray-500">
              {formatDate(analysis.timestamp)}
            </p>
            <p className="text-base font-medium text-gray-800 mt-2 truncate max-w-md">
              {analysis.url}
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 px-6 py-8">
        <div className="flex justify-center space-x-8 sm:space-x-16">
          <ScoreGauge score={analysis.seoScore} label="SEO Score" color="blue" />
          <ScoreGauge score={analysis.aeoScore} label="AEO Score" color="purple" />
        </div>
        
        <div className="flex justify-center mt-6 sm:mt-8">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 w-full max-w-3xl">
            <div className="flex">
              <div className="flex-shrink-0">
                <BarChart className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <span className="font-medium">Opportunity alert:</span> Improving your question-based headings and structured data could significantly boost your AEO score.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm ${
              activeTab === 'seo'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            SEO Analysis
          </button>
          <button
            onClick={() => setActiveTab('aeo')}
            className={`w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm ${
              activeTab === 'aeo'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            AEO Analysis
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm ${
              activeTab === 'recommendations'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Recommendations
          </button>
        </nav>
      </div>
      
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Quick Summary</h3>
              <p className="mt-2 text-gray-600">
                This page has a good foundation but requires optimization for both search engines and answer engines. Focus on improving question-based content structure and implementing proper structured data.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">SEO Highlights</h4>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li>• Meta description is present but could be improved</li>
                  <li>• Basic structured data is implemented</li>
                  <li>• Mobile optimization is good</li>
                  <li>• Page speed needs improvement</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-medium text-purple-800 mb-2">AEO Highlights</h4>
                <ul className="space-y-2 text-sm text-purple-700">
                  <li>• Limited question-based content structure</li>
                  <li>• Content is comprehensive but not optimized for AI extraction</li>
                  <li>• FAQ schema could be expanded</li>
                  <li>• Featured snippet potential is low</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Top 3 Recommendations</h3>
              <div className="space-y-3">
                {analysis.prioritizedRecommendations.slice(0, 3).map((rec, index) => (
                  <div key={index} className="flex items-start">
                    <span className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${
                      rec.priority === 'High' 
                        ? 'bg-red-100 text-red-600' 
                        : rec.priority === 'Medium'
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-blue-100 text-blue-600'
                    } text-sm font-medium`}>
                      {index + 1}
                    </span>
                    <p className="ml-3 text-gray-700">{rec.recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'seo' && (
          <ScoreDetails 
            title="SEO Analysis" 
            description="Detailed breakdown of Search Engine Optimization factors" 
            items={[
              {label: 'Meta Tags', ...analysis.technicalSeo.metaTags},
              {label: 'Page Speed', ...analysis.technicalSeo.pageSpeed},
              {label: 'Mobile Optimization', ...analysis.technicalSeo.mobileOptimization},
              {label: 'Structured Data Validity', ...analysis.technicalSeo.structuredDataValidity},
            ]}
          />
        )}
        
        {activeTab === 'aeo' && (
          <ScoreDetails 
            title="AEO Analysis" 
            description="Detailed breakdown of Answer Engine Optimization factors" 
            items={[
              {label: 'Content Quality', ...analysis.contentAnalysis.contentQuality},
              {label: 'Question-Based Content', ...analysis.serpOptimization.questionBasedContent},
              {label: 'Featured Snippet Potential', ...analysis.serpOptimization.featuredSnippetOptimization},
              {label: 'AI Answer Source Potential', ...analysis.serpOptimization.aiAnswerSourcePotential},
            ]}
          />
        )}
        
        {activeTab === 'recommendations' && (
          <Recommendations recommendations={analysis.prioritizedRecommendations} />
        )}
      </div>
    </div>
  );
};