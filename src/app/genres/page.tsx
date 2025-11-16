
import { genres } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function GenresPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Explore by Genre</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Dive into your next favorite series by exploring our curated collection of genres.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {genres.map((genre) => (
          <Link href={`/media?genre=${genre.id}`} key={genre.id}>
            <Card className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1 relative">
              <div className="relative h-48 w-full">
                <Image
                  src={genre.imageUrl}
                  alt={genre.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  data-ai-hint={genre.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
              <CardHeader className="absolute bottom-0 left-0 right-0 p-4">
                <CardTitle className="text-2xl font-bold text-white font-headline">{genre.name}</CardTitle>
                <CardDescription className="text-slate-200 line-clamp-2">{genre.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
