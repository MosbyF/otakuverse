
import { media } from '@/lib/data';
import { MediaCard } from '@/components/media-card';
import type { MediaType } from '@/lib/types';

export default function MediaPage({
  searchParams,
}: {
  searchParams?: { type?: 'Anime' | 'Manga' };
}) {
  const mediaType = searchParams?.type;

  const filteredMedia = media.filter((item) => {
    if (!mediaType) return true;
    return item.type === mediaType;
  });

  const title = mediaType ? `${mediaType} Collection` : 'Our Collection';
  const description = mediaType
    ? `Browse our extensive library of ${mediaType.toLowerCase()}.`
    : 'Browse our extensive library of anime and manga. Your next adventure awaits.';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-collection mb-4">{title}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {filteredMedia.map((item: MediaType) => (
          <MediaCard key={item.id} media={item} />
        ))}
      </div>
    </div>
  );
}
