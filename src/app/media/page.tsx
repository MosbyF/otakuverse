
import { media, genres } from '@/lib/data';
import { MediaCard } from '@/components/media-card';
import type { MediaType } from '@/lib/types';
import { notFound } from 'next/navigation';

export default function MediaPage({
  searchParams,
}: {
  searchParams?: { type?: 'Anime' | 'Manga'; genre?: string };
}) {
  const mediaType = searchParams?.type;
  const genreId = searchParams?.genre;

  let filteredMedia = media;

  if (mediaType) {
    filteredMedia = filteredMedia.filter((item) => item.type === mediaType);
  }

  if (genreId) {
    const genre = genres.find((g) => g.id === genreId);
    if (!genre) {
      return notFound();
    }
    filteredMedia = filteredMedia.filter((item) =>
      item.genres.some(g => g.toLowerCase() === genre.name.toLowerCase())
    );
  }

  const title = genreId 
    ? genres.find(g => g.id === genreId)?.name + ' Collection'
    : mediaType
    ? `${mediaType}s`
    : 'Our Collection';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-collection mb-4">{title}</h1>
      </div>

      {filteredMedia.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {filteredMedia.map((item: MediaType) => (
            <MediaCard key={item.id} media={item} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-muted-foreground">No items found for this genre.</p>
        </div>
      )}
    </div>
  );
}
