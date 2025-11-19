

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { media } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Star, Tv, BookOpen } from 'lucide-react';
import type { MediaType } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AddToShelfButton } from '@/components/add-to-shelf-button';

export function generateStaticParams() {
  return media.map((item) => ({
    id: item.id,
  }));
}

const DetailItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: React.ReactNode }) => (
    <div className="flex items-center">
        <div className="flex items-center gap-3 w-32 text-muted-foreground shrink-0">
            <Icon className="w-5 h-5" />
            <span className="font-medium">{label}</span>
        </div>
        <div className="font-semibold text-foreground/90">{value}</div>
    </div>
);

export default function MediaDetailPage({ params }: { params: { id: string } }) {
  const item = media.find((m) => m.id === params.id) as MediaType;

  if (!item) {
    notFound();
  }
  
  const isManga = item.type === 'Manga';

  const sourceMap: { [key: string]: { name: string, url: string } } = {
    'frieren-beyond-journeys-end': { name: 'Crunchyroll', url: 'https://www.crunchyroll.com/series/GG5H5X249/frieren-beyond-journeys-end' },
    'chainsaw-man': { name: 'Crunchyroll', url: 'https://www.crunchyroll.com/series/GVDHX8QNW/chainsaw-man' },
    'jujutsu-kaisen': { name: 'Crunchyroll', url: 'https://www.crunchyroll.com/series/GRDV0019R/jujutsu-kaisen' },
    'attack-on-titan': { name: 'Crunchyroll', url: 'https://www.crunchyroll.com/series/GR751KNZY/attack-on-titan' },
    'demon-slayer': { name: 'Crunchyroll', url: 'https://www.crunchyroll.com/series/GY5P48XEY/demon-slayer-kimetsu-no-yaiba' },
    'default': { name: 'Google', url: `https://www.google.com/search?q=${encodeURIComponent(item.title)}` }
  };
  
  const source = sourceMap[item.id] || sourceMap['default'];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-12 gap-8">
          
          <div className="md:col-span-4">
            <div className="sticky top-24">
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg shadow-primary/20">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                  data-ai-hint={item.imageHint}
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-8 space-y-6">
            <div>
                <Badge variant="default" className="mb-2 text-sm">{item.type}</Badge>
                <div className="flex flex-wrap gap-2 mb-2">
                    {item.genres.map((genre) => (
                        <Badge key={genre} variant="outline" className="font-medium">
                        {genre}
                        </Badge>
                    ))}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold font-headline mb-3">{item.title}</h1>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-2xl font-bold text-amber-400">
                      <Star className="h-7 w-7 fill-amber-400" />
                      <span>{item.rating.toFixed(1)}</span>
                    </div>
                    <AddToShelfButton media={item} />
                </div>
            </div>

            <Card className="bg-primary/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Synopsis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 leading-relaxed">{item.longDescription}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-primary/20 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <DetailItem icon={isManga ? BookOpen : Tv} label={isManga ? "Chapters" : "Episodes"} value={isManga ? (item.chapters ? `${item.chapters} Chapters` : 'Ongoing') : (item.duration || 'Ongoing')} />
                    <Separator />
                    <DetailItem 
                        icon={Star}
                        label="Source" 
                        value={source.name}
                    />
                </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}
