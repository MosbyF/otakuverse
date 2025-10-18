import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { media, genres } from '@/lib/data';
import { MediaCard } from '@/components/media-card';
import { placeholderImages } from '@/lib/placeholder-images.json';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const featured = media.filter((item) => item.status === 'Featured').slice(0, 1);
  const trending = media.filter((item) => item.status === 'Trending').slice(0, 8);
  const latest = media.filter((item) => item.status === 'Latest').slice(0, 8);
  const heroImage = placeholderImages.find(p => p.id === "hero");

  return (
    <div className="flex flex-col">
      {featured.length > 0 && heroImage && (
        <section className="relative w-full h-[60vh] md:h-[70vh]">
          <Image
            src={heroImage.imageUrl}
            alt={featured[0].title}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute inset-0 flex items-end p-4 md:p-8 lg:p-12">
            <div className="max-w-2xl text-foreground space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold font-headline drop-shadow-lg">{featured[0].title}</h1>
              <p className="text-sm md:text-base line-clamp-3">{featured[0].description}</p>
              <Link href={`/media/${featured[0].id}`}>
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Discover More <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      <div className="container mx-auto px-4 py-8 space-y-12">
        <section>
          <h2 className="text-3xl font-bold mb-6 font-headline">Trending Now</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
            {trending.map((item) => (
              <MediaCard key={item.id} media={item} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 font-headline">Latest Updates</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
            {latest.map((item) => (
              <MediaCard key={item.id} media={item} />
            ))}
          </div>
        </section>
        
        <section>
          <h2 className="text-3xl font-bold mb-6 font-headline">Browse by Genre</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {genres.slice(0,4).map((genre) => (
              <Link href="/genres" key={genre.id}>
                <div className="relative rounded-lg overflow-hidden h-40 group">
                  <Image
                    src={genre.imageUrl}
                    alt={genre.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={genre.imageHint}
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white font-headline">{genre.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
