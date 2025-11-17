import { media } from '@/lib/data';
import { MediaCard } from '@/components/media-card';
import type { MediaType } from '@/lib/types';
import { notFound } from 'next/navigation';
import { SearchX } from 'lucide-react';

export default function SearchPage({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  const query = searchParams?.q;

  if (!query) {
    notFound();
  }

  const filteredMedia = media.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 font-headline">
        Search Results for "{query}"
      </h1>
      {filteredMedia.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {filteredMedia.map((item: MediaType) => (
            <MediaCard key={item.id} media={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-16">
          <SearchX className="h-16 w-16 text-primary mb-4" />
          <p className="text-lg text-muted-foreground">No Results Found for "{query}"</p>
        </div>
      )}
    </div>
  );
}
