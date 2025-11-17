
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { media } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Star, Eye, Users, MessageSquare, Video, BookOpen, User, Film } from 'lucide-react';
import type { MediaType } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function generateStaticParams() {
  return media.map((item) => ({
    id: item.id,
  }));
}

const CharacterCard = ({ name, role, imageUrl, imageHint }: { name: string, role: string, imageUrl: string, imageHint: string }) => (
  <div className="flex items-center gap-4">
    <Avatar>
      <AvatarImage src={imageUrl} alt={name} data-ai-hint={imageHint} />
      <AvatarFallback>{name.charAt(0)}</AvatarFallback>
    </Avatar>
    <div>
      <p className="font-semibold">{name}</p>
      <p className="text-sm text-muted-foreground">{role}</p>
    </div>
  </div>
);

const EpisodeChapterCard = ({ number, title, length }: { number: number, title: string, length: string }) => (
  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
    <div className="flex items-center gap-4">
      <div className="text-primary font-bold text-lg">{String(number).padStart(2, '0')}</div>
      <p className="font-medium">{title}</p>
    </div>
    <span className="text-sm text-muted-foreground">{length}</span>
  </div>
);

const ReviewCard = ({ author, content, rating, avatarUrl, avatarHint }: { author: string, content: string, rating: number, avatarUrl: string, avatarHint: string}) => (
    <div className="flex items-start gap-4 p-4 border-b">
        <Avatar>
            <AvatarImage src={avatarUrl} alt={author} data-ai-hint={avatarHint} />
            <AvatarFallback>{author.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
                <p className="font-semibold">{author}</p>
                <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="font-bold">{rating.toFixed(1)}</span>
                </div>
            </div>
            <p className="text-sm text-foreground/80">{content}</p>
        </div>
    </div>
)


export default function MediaDetailPage({ params }: { params: { id: string } }) {
  const item = media.find((m) => m.id === params.id) as MediaType;

  if (!item) {
    notFound();
  }
  
  const isManga = item.type === 'Manga';

  // Mock data
  const mainCharacters = [
    { name: 'Character A', role: 'Main', imageUrl: 'https://picsum.photos/seed/char1/40/40', imageHint: 'character face' },
    { name: 'Character B', role: 'Main', imageUrl: 'https://picsum.photos/seed/char2/40/40', imageHint: 'character face' },
  ];
  const supportingCharacters = [
    { name: 'Character C', role: 'Supporting', imageUrl: 'https://picsum.photos/seed/char3/40/40', imageHint: 'character face' },
    { name: 'Character D', role: 'Supporting', imageUrl: 'https://picsum.photos/seed/char4/40/40', imageHint: 'character face' },
  ]
  const episodes = [
    { number: 1, title: 'The Beginning', length: '24min' },
    { number: 2, title: 'The Discovery', length: '24min' },
    { number: 3, title: 'The Confrontation', length: '24min' },
  ];
  const chapters = [
     { number: 1, title: 'First Steps', length: '45 pages' },
     { number: 2, title: 'A New World', length: '42 pages' },
     { number: 3, title: 'The Shadow', length: '48 pages' },
  ];
  const creator = { name: 'Creator Name', role: 'Author' };
  const studio = { name: 'Studio Name', role: 'Animation' };
  const popularity = { views: '1.2M', ratingsCount: '85k' };
  const reviews = [
    { author: 'ExpertReviewer', content: 'An absolute masterpiece of the genre. The character development is second to none.', rating: 5, avatarUrl: 'https://picsum.photos/seed/rev1/40/40', avatarHint: 'profile avatar' },
    { author: 'CasualFan', content: 'Pretty good, but the pacing felt a bit slow in the middle. Still worth a watch!', rating: 4, avatarUrl: 'https://picsum.photos/seed/rev2/40/40', avatarHint: 'profile avatar' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Sidebar */}
        <div className="lg:col-span-3">
          <div className="sticky top-24 space-y-6">
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
                priority
                data-ai-hint={item.imageHint}
              />
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Popularity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground"><Eye className="w-4 h-4"/><span>Views</span></div>
                        <span className="font-bold">{popularity.views}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground"><Star className="w-4 h-4"/><span>Ratings</span></div>
                        <span className="font-bold">{popularity.ratingsCount}</span>
                    </div>
                </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-semibold">{item.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-semibold">{item.status}</span>
                </div>
                 <div className="flex justify-between">
                  <span className="text-muted-foreground">Year</span>
                  <span className="font-semibold">{item.releaseYear}</span>
                </div>
                {item.duration && (
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration</span>
                        <span className="font-semibold">{item.duration}</span>
                    </div>
                )}
                 {item.chapters && (
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Chapters</span>
                        <span className="font-semibold">{item.chapters}</span>
                    </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-9 space-y-8">
          {/* Header */}
          <div>
            <div className="flex flex-wrap gap-2 mb-2">
                {item.genres.map((genre) => (
                    <Badge key={genre} variant="outline">
                    {genre}
                    </Badge>
                ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-headline mb-2">{item.title}</h1>
            <div className="flex items-center gap-2 text-2xl font-bold text-amber-400">
              <Star className="h-7 w-7 fill-amber-400" />
              <span>{item.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Synopsis */}
          <Card>
              <CardHeader>
                <CardTitle>Synopsis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 leading-relaxed">{item.longDescription}</p>
              </CardContent>
          </Card>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Characters */}
            <Card>
              <CardHeader>
                <CardTitle>Main Characters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mainCharacters.map(char => <CharacterCard key={char.name} {...char} />)}
                <Separator/>
                {supportingCharacters.map(char => <CharacterCard key={char.name} {...char} />)}
              </CardContent>
            </Card>

            {/* Creator Info */}
            <Card>
              <CardHeader>
                <CardTitle>Creators</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-primary"/>
                    <div>
                        <p className="font-semibold">{creator.name}</p>
                        <p className="text-sm text-muted-foreground">{creator.role}</p>
                    </div>
                 </div>
                 {!isManga && (
                    <div className="flex items-center gap-3">
                        <Film className="w-5 h-5 text-primary"/>
                        <div>
                            <p className="font-semibold">{studio.name}</p>
                            <p className="text-sm text-muted-foreground">{studio.role}</p>
                        </div>
                    </div>
                 )}
              </CardContent>
            </Card>
          </div>
          

          {/* Episodes/Chapters */}
          <Card>
            <CardHeader>
              <CardTitle>{isManga ? 'Chapters' : 'Episodes'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {(isManga ? chapters : episodes).map(item => (
                <EpisodeChapterCard key={item.number} number={item.number} title={item.title} length={item.length} />
              ))}
            </CardContent>
          </Card>

           {/* Reviews */}
          <Card>
            <CardHeader>
              <CardTitle>Reviews & Comments</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                {reviews.map(review => <ReviewCard key={review.author} {...review} />)}
                <div className="p-4 text-center">
                    <button className="text-primary font-semibold hover:underline">View More</button>
                </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
