
import Image from 'next/image';
import Link from 'next/link';
import type { MediaType } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MediaCardProps {
  media: MediaType;
  className?: string;
}

export function MediaCard({ media, className }: MediaCardProps) {
  return (
    <Link href={`/media/${media.id}`} className={cn('block group', className)}>
      <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1">
        <CardContent className="p-0">
          <div className="relative aspect-[2/3]">
            <Image
              src={media.imageUrl}
              alt={media.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              data-ai-hint={media.imageHint}
            />
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
  );
}
