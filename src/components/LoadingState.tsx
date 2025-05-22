import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingState: React.FC = () => {
  return (
    <div className="mt-8 flex flex-col items-center justify-center py-12">
      <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
      <h3 className="mt-4 text-lg font-medium text-gray-900">Analyzing the URL</h3>
      <p className="mt-1 text-sm text-gray-500">This may take a moment as we thoroughly check various SEO and AEO factors.</p>
      
      <div className="mt-6 w-full max-w-md">
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <span className="text-sm font-medium">1</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">Crawling the URL</p>
              <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-blue-600 h-1.5 rounded-full animate-pulse" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <span className="text-sm font-medium">2</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">Analyzing SEO factors</p>
              <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-blue-600 h-1.5 rounded-full animate-pulse" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-400">
              <span className="text-sm font-medium">3</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Evaluating AEO potential</p>
              <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-gray-300 h-1.5 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-400">
              <span className="text-sm font-medium">4</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Generating recommendations</p>
              <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-gray-300 h-1.5 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};