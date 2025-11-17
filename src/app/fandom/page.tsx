
import { fandomPosts, fanArt, fanFiction } from '@/lib/data';
import { DiscussionForum } from './discussion-forum';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FanArtGallery } from './fan-art-gallery';
import { FanFictionLibrary } from './fan-fiction-library';
import { MessageSquare, Image, BookText } from 'lucide-react';

export default function FandomPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Fandom Hub</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Join the conversation, share your creations, and explore the universe of fan content.
        </p>
      </div>

      <Tabs defaultValue="discussion" className="w-full">
        <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-8">
          <TabsTrigger value="discussion">
            <MessageSquare className="mr-2 h-4 w-4" />
            Discussions
          </TabsTrigger>
          <TabsTrigger value="fan-art">
            <Image className="mr-2 h-4 w-4" />
            Fan Art
          </TabsTrigger>
          <TabsTrigger value="fan-fiction">
            <BookText className="mr-2 h-4 w-4" />
            Fanfiction
          </TabsTrigger>
        </TabsList>
        <TabsContent value="discussion">
          <DiscussionForum initialPosts={fandomPosts} />
        </TabsContent>
        <TabsContent value="fan-art">
          <FanArtGallery initialArt={fanArt} />
        </TabsContent>
        <TabsContent value="fan-fiction">
          <FanFictionLibrary initialFanFiction={fanFiction} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
