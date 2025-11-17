'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Frown, Meh, Send, Smile } from 'lucide-react';
import type { FandomPost } from '@/lib/types';
import { getSentiment } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/components/auth/AuthProvider';
import { useUser } from '@/firebase';

function SentimentBadge({ sentiment }: { sentiment?: 'positive' | 'negative' | 'neutral' }) {
  if (!sentiment) return null;

  const sentimentConfig = {
    positive: { icon: Smile, color: 'text-green-500', label: 'Positive' },
    neutral: { icon: Meh, color: 'text-yellow-500', label: 'Neutral' },
    negative: { icon: Frown, color: 'text-red-500', label: 'Negative' },
  };

  const { icon: Icon, color, label } = sentimentConfig[sentiment];

  return (
    <div className={`flex items-center text-xs ${color} font-medium`}>
      <Icon className="h-4 w-4 mr-1" />
      <span>{label}</span>
    </div>
  );
}

export function DiscussionForum({ initialPosts }: { initialPosts: FandomPost[] }) {
  const [posts, setPosts] = useState<FandomPost[]>(initialPosts);
  const [newPostContent, setNewPostContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated, openLogin } = useAuth();
  const { user } = useUser();

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim() || isSubmitting || !isAuthenticated) return;

    setIsSubmitting(true);

    const result = await getSentiment({ text: newPostContent });

    if (result.success && result.data) {
      const newPost: FandomPost = {
        id: Date.now(),
        author: user?.displayName || user?.email || 'Anonymous',
        avatarUrl: user?.photoURL || '',
        avatarHint: 'user avatar',
        content: newPostContent,
        timestamp: 'Just now',
        sentiment: result.data.sentiment,
        sentimentScore: result.data.score,
      };
      setPosts([newPost, ...posts]);
      setNewPostContent('');
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error || 'Could not submit post.',
      });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {isAuthenticated ? (
        <Card>
          <CardContent className="p-4">
            <form onSubmit={handlePostSubmit} className="flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <Textarea
                  placeholder="What's on your mind?"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  rows={3}
                  className="flex-1"
                  disabled={isSubmitting}
                />
              </div>
              <Button type="submit" className="self-end" disabled={isSubmitting || !newPostContent.trim()}>
                {isSubmitting ? 'Posting...' : 'Post'}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="text-center p-6">
            <CardContent className="p-0">
                <p className="text-muted-foreground mb-4">You must be logged in to join the discussion.</p>
                <Button onClick={openLogin}>Login to Post</Button>
            </CardContent>
        </Card>
      )}


      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={post.avatarUrl} alt={post.author} data-ai-hint={post.avatarHint} />
                  <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                       <span className="font-semibold">{post.author}</span>
                       <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                    </div>
                    <SentimentBadge sentiment={post.sentiment} />
                  </div>
                  <p className="text-foreground/90 whitespace-pre-wrap">{post.content}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
