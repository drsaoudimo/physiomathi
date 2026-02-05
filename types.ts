export type Language = 'fr' | 'ar';

export interface LocalizedText {
  fr: string;
  ar: string;
}

export interface Theorem {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  formalCheck: string;
}

export interface GenerationResult {
  title: string;
  content: string;
}

export interface AIError {
  message: string;
  type: 'API_KEY' | 'CONNECTION' | 'GENERATION' | 'UNKNOWN';
}

export interface AIResponse {
  success: boolean;
  content: string;
  errorType?: AIError['type'];
}
