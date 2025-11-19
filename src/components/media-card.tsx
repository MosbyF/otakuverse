
import Image from 'next/image';
import Link from 'next/link';
import type { MediaType } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Star, Clock, BookOpen, Calendar } from 'lucide-react';
import { AddToShelfButton } from './add-to-shelf-button';

interface MediaCardProps {
  media: MediaType;
  className?: string;
}

export function MediaCard({ media, className }: MediaCardProps) {
  return (
    <div className={cn('group relative', className)}>
      <Link href={`/media/${media.id}`} className="block">
        <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1">
          <CardContent className="p-0">
            <div className="relative aspect-[2/3]">
              <Image
                src={media.imageUrl}
                alt={media.title}
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                data-ai-hint={media.imageHint}
                crossOrigin="anonymous"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-white">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-1 text-sm font-bold text-amber-400">
                    <Star className="h-4 w-4 fill-amber-400" />
                    <span>{media.rating.toFixed(1)}</span>
                  </div>
                  {media.duration && (
                    <div className="flex items-center gap-1 text-xs mt-1">
                      <Clock className="h-3 w-3" />
                      <span>{media.duration}</span>
                    </div>
                  )}
                  {media.chapters && (
                    <div className="flex items-center gap-1 text-xs mt-1">
                      <BookOpen className="h-3 w-3" />
                      <span>{media.chapters} chapters</span>
                    </div>
                  )}
                  {media.releaseYear && (
                      <div className="flex items-center gap-1 text-xs mt-1">
                          <Calendar className="h-3 w-3" />
                          <span>{media.releaseYear}</span>
                      </div>
                  )}
                </div>
              </div>
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-sm truncate group-hover:text-primary">{media.title}</h3>
              <Badge variant={'default'} className="mt-1 text-xs">
                {media.type}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </Link>
      <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <AddToShelfButton media={media} variant="icon" />
      </div>
    </div>
  );
}
