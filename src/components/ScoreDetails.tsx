import React from 'react';
import { AnalysisItemType } from '../types/analysis';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

interface ScoreDetailsItemProps extends AnalysisItemType {
  label: string;
}

interface ScoreDetailsProps {
  title: string;
  description: string;
  items: ScoreDetailsItemProps[];
}

export const ScoreDetails: React.FC<ScoreDetailsProps> = ({ 
  title, 
  description, 
  items 
}) => {
  // Function to get icon based on score
  const getScoreIcon = (score: number) => {
    if (score >= 80) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    } else if (score >= 60) {
      return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    } else {
      return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
      
      <div className="space-y-8">
        {items.map((item, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center bg-gray-50">
              <h3 className="text-base font-medium text-gray-900">{item.label}</h3>
              <div className="flex items-center">
                {getScoreIcon(item.score)}
                <span className={`ml-2 text-sm font-medium ${
                  item.score >= 80 
                    ? 'text-green-700' 
                    : item.score >= 60 
                    ? 'text-yellow-700' 
                    : 'text-red-700'
                }`}>
                  {item.score}/100
                </span>
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <div className="text-sm text-gray-700 mb-4">
                <span className="font-medium text-gray-900">Current Value: </span>
                {Array.isArray(item.value) ? (
                  <ul className="list-disc ml-5 mt-1 space-y-1">
                    {item.value.map((val, i) => (
                      <li key={i}>{val}</li>
                    ))}
                  </ul>
                ) : (
                  item.value
                )}
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Recommendations:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                  {item.recommendations.map((rec, i) => (
                    <li key={i}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};