import { media } from '@/lib/data';
import { MediaCard } from '@/components/media-card';

export default function MediaPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Our Collection</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Browse our extensive library of anime and manga. Your next adventure awaits.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {media.map((item) => (
          <MediaCard key={item.id} media={item} />
        ))}
      </div>
    </div>
  );
}
