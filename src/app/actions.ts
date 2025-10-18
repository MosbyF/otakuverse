'use server';

import { 
  animeMangaRecommendations, 
  AnimeMangaRecommendationsInput 
} from "@/ai/flows/anime-manga-recommendations";
import { 
  analyzeSentiment, 
  SentimentAnalysisInput 
} from "@/ai/flows/sentiment-analysis-fandom-posts";

export async function getRecommendations(input: AnimeMangaRecommendationsInput) {
  try {
    const result = await animeMangaRecommendations(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error getting recommendations:", error);
    return { success: false, error: "Failed to generate recommendations." };
  }
}

export async function getSentiment(input: SentimentAnalysisInput) {
  try {
    const result = await analyzeSentiment(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    return { success: false, error: "Failed to analyze sentiment." };
  }
}
