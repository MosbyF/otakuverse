'use client';

import { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getRecommendations } from '@/app/actions';
import type { MediaType } from '@/lib/types';
import type { AnimeMangaRecommendationsOutput } from '@/ai/flows/anime-manga-recommendations';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

export function RecommendationsForm({ media }: { media: MediaType }) {
  const [recommendations, setRecommendations] = useState<AnimeMangaRecommendationsOutput['recommendations'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setRecommendations(null);

    const result = await getRecommendations({
      title: media.title,
      genre: media.genres.join(', '),
      description: media.description,
    });
    
    setIsLoading(false);

    if (result.success && result.data) {
      setRecommendations(result.data.recommendations);
    } else {
      toast({
        variant: 'destructive',
        title: 'Recommendation Error',
        description: result.error || 'Failed to generate recommendations.',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Find Your Next Favorite</CardTitle>
        <CardDescription>
          Click the button to get AI-powered recommendations based on {media.title}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Button type="submit" disabled={isLoading}>
            <Wand2 className="mr-2 h-4 w-4" />
            {isLoading ? 'Generating...' : 'Get Recommendations'}
          </Button>
        </form>

        {isLoading && (
          <div className="mt-6 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-4 border rounded-lg">
                <Skeleton className="h-5 w-1/3 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4 mt-1" />
              </div>
            ))}
          </div>
        )}

        {recommendations && (
          <div className="mt-6 space-y-4">
            <h3 className="text-xl font-bold">You might also like:</h3>
            {recommendations.map((rec, index) => (
              <Card key={index} className="bg-muted/50">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-primary">{rec.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{rec.reason}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
