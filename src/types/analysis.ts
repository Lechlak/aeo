export interface AnalysisItemType {
  value: string | string[];
  score: number;
  recommendations: string[];
}

export interface RecommendationType {
  priority: 'High' | 'Medium' | 'Low';
  category: 'AEO' | 'SEO';
  recommendation: string;
}

export interface ContentAnalysisType {
  title: AnalysisItemType;
  headings: AnalysisItemType;
  structuredData: AnalysisItemType;
  contentQuality: AnalysisItemType;
}

export interface SerpOptimizationType {
  richSnippetPotential: AnalysisItemType;
  featuredSnippetOptimization: AnalysisItemType;
  questionBasedContent: AnalysisItemType;
  aiAnswerSourcePotential: AnalysisItemType;
}

export interface TechnicalSeoType {
  metaTags: AnalysisItemType;
  pageSpeed: AnalysisItemType;
  mobileOptimization: AnalysisItemType;
  structuredDataValidity: AnalysisItemType;
}

export interface AnalysisType {
  url: string;
  timestamp: string;
  aeoScore: number;
  seoScore: number;
  contentAnalysis: ContentAnalysisType;
  serpOptimization: SerpOptimizationType;
  technicalSeo: TechnicalSeoType;
  prioritizedRecommendations: RecommendationType[];
}