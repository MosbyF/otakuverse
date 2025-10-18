import { fandomPosts } from '@/lib/data';
import { DiscussionForum } from './discussion-forum';

export default function FandomPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Fandom Discussions</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Join the conversation! Share your thoughts, theories, and reviews with the community.
        </p>
      </div>
      <DiscussionForum initialPosts={fandomPosts} />
    </div>
  );
}
