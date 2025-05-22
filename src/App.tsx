import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { UrlForm } from './components/UrlForm';
import { Results } from './components/Results';
import { LoadingState } from './components/LoadingState';
import { AnalysisType } from './types/analysis';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (url: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // In a real-world scenario, this would be an API call to a backend service
      // that handles the actual crawling and analysis
      // For demo purposes, we'll simulate the analysis with a timeout
      setTimeout(() => {
        const mockResults = generateMockResults(url);
        setAnalysisResults(mockResults);
        setIsLoading(false);
      }, 3000);
    } catch (err) {
      setError('An error occurred while analyzing the URL. Please try again.');
      setIsLoading(false);
    }
  };

  const generateMockResults = (url: string): AnalysisType => {
    return {
      url: url,
      timestamp: new Date().toISOString(),
      aeoScore: Math.floor(Math.random() * 40) + 60, // 60-99
      seoScore: Math.floor(Math.random() * 40) + 60, // 60-99
      contentAnalysis: {
        title: {
          value: 'Sample Page Title',
          score: Math.floor(Math.random() * 30) + 70,
          recommendations: ['Consider adding a question-based title for better AEO']
        },
        headings: {
          value: ['H1: Main Heading', 'H2: Subheading 1', 'H2: Subheading 2'],
          score: Math.floor(Math.random() * 30) + 70,
          recommendations: ['Use more question-based H2 headings']
        },
        structuredData: {
          value: 'Found FAQ and Article schema',
          score: Math.floor(Math.random() * 30) + 70,
          recommendations: ['Add HowTo schema for better rich snippet opportunities']
        },
        contentQuality: {
          value: 'Comprehensive with clear sections',
          score: Math.floor(Math.random() * 30) + 70,
          recommendations: ['Improve direct answers to common questions']
        }
      },
      serpOptimization: {
        richSnippetPotential: {
          value: 'Medium',
          score: Math.floor(Math.random() * 30) + 70,
          recommendations: ['Add more structured data for rich snippet opportunities']
        },
        featuredSnippetOptimization: {
          value: 'Low',
          score: Math.floor(Math.random() * 30) + 70,
          recommendations: ['Structure content with clear definitions and steps']
        },
        questionBasedContent: {
          value: '3 question headings found',
          score: Math.floor(Math.random() * 30) + 70,
          recommendations: ['Add more question-based headings with direct answers']
        },
        aiAnswerSourcePotential: {
          value: 'Medium',
          score: Math.floor(Math.random() * 30) + 70,
          recommendations: ['Provide more concise, factual information in short paragraphs']
        }
      },
      technicalSeo: {
        metaTags: {
          value: 'Meta description present, title tag optimized',
          score: Math.floor(Math.random() * 30) + 70,
          recommendations: ['Add meta description with a question format']
        },
        pageSpeed: {
          value: 'Estimated: Medium',
          score: Math.floor(Math.random() * 30) + 70,
          recommendations: ['Optimize image sizes, reduce JavaScript']
        },
        mobileOptimization: {
          value: 'Responsive design detected',
          score: Math.floor(Math.random() * 30) + 70,
          recommendations: ['Improve tap target spacing for mobile users']
        },
        structuredDataValidity: {
          value: 'Valid schema detected',
          score: Math.floor(Math.random() * 30) + 70,
          recommendations: ['Expand schema coverage to all major content sections']
        }
      },
      prioritizedRecommendations: [
        {
          priority: 'High',
          category: 'AEO',
          recommendation: 'Add more question-based H2 headings with direct answers below them'
        },
        {
          priority: 'High',
          category: 'SEO',
          recommendation: 'Implement FAQ schema markup for common questions'
        },
        {
          priority: 'Medium',
          category: 'AEO',
          recommendation: 'Structure content as direct answers to likely queries'
        },
        {
          priority: 'Medium',
          category: 'SEO',
          recommendation: 'Improve meta description with a question format'
        },
        {
          priority: 'Low',
          category: 'SEO',
          recommendation: 'Add alt text to all images'
        }
      ]
    };
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AEO & SEO Analyzer
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Analyze any webpage for Answer Engine Optimization and Search Engine Optimization scores and get actionable recommendations.
          </p>
        </div>

        <UrlForm onAnalyze={handleAnalyze} isLoading={isLoading} />

        {error && (
          <div className="mt-8 p-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {isLoading && <LoadingState />}

        {!isLoading && analysisResults && (
          <Results analysis={analysisResults} />
        )}
      </div>
    </Layout>
  );
}

export default App;