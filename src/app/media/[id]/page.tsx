
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { media } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { RecommendationsForm } from './recommendations-form';
import type { MediaType } from '@/lib/types';

export function generateStaticParams() {
  return media.map((item) => ({
    id: item.id,
  }));
}

export default function MediaDetailPage({ params }: { params: { id: string } }) {
  const item = media.find((m) => m.id === params.id) as MediaType;

  if (!item) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        <div className="md:col-span-1">
          <div className="sticky top-24">
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
                data-ai-hint={item.imageHint}
              />
            </div>
            <div className="mt-4 flex items-center justify-center gap-2 text-2xl font-bold text-amber-400">
              <Star className="h-7 w-7 fill-amber-400" />
              <span>{item.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
          <div>
            <Badge variant={'default'} className="mb-2">
              {item.type}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">{item.title}</h1>
            <div className="flex flex-wrap gap-2">
              {item.genres.map((genre) => (
                <Badge key={genre} variant="outline">
                  {genre}
                </Badge>
              ))}
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold font-headline mb-2">Synopsis</h2>
            <p className="text-foreground/80 leading-relaxed">{item.longDescription}</p>
          </div>
          
          <RecommendationsForm media={item} />

        </div>
      </div>
    </div>
  );
}
