'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import type { FanFiction } from '@/lib/types';
import { Upload } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';
import { useUser } from '@/firebase';

export function FanFictionLibrary({ initialFanFiction }: { initialFanFiction: FanFiction[] }) {
  const [stories, setStories] = useState<FanFiction[]>(initialFanFiction);
  const [newStory, setNewStory] = useState({ title: '', synopsis: '', content: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated, openLogin } = useAuth();
  const { user } = useUser();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewStory(prev => ({ ...prev, [name]: value }));
  };

  const handleStorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStory.title || !newStory.content || isSubmitting || !isAuthenticated) return;

    setIsSubmitting(true);
    // In a real app, this would involve a backend call
    const newSubmission: FanFiction = {
      id: Date.now(),
      title: newStory.title,
      author: user?.displayName || user?.email || 'Anonymous',
      synopsis: newStory.synopsis,
      content: newStory.content,
      timestamp: 'Just now',
    };

    setTimeout(() => {
      setStories([newSubmission, ...stories]);
      setNewStory({ title: '', synopsis: '', content: '' });
      setIsSubmitting(false);
      setIsDialogOpen(false);
      toast({
        title: 'Success!',
        description: 'Your fanfiction has been submitted.',
      });
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        {isAuthenticated ? (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg">
                <Upload className="mr-2 h-5 w-5" />
                Post Fanfiction
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Share Your Story</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleStorySubmit} className="grid gap-4 py-4">
                <Input
                  name="title"
                  placeholder="Story Title"
                  value={newStory.title}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  required
                />
                <Input
                  name="synopsis"
                  placeholder="Synopsis (a short summary)"
                  value={newStory.synopsis}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  required
                />
                <Textarea
                  name="content"
                  placeholder="Your story begins here..."
                  value={newStory.content}
                  onChange={handleInputChange}
                  rows={10}
                  disabled={isSubmitting}
                  required
                />
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Posting...' : 'Post Story'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        ) : (
           <Button size="lg" onClick={openLogin}>
              <Upload className="mr-2 h-5 w-5" />
              Login to Post Fanfiction
            </Button>
        )}
      </div>

      <div className="space-y-6">
        {stories.map((story) => (
          <Card key={story.id}>
            <CardHeader>
              <CardTitle>{story.title}</CardTitle>
              <CardDescription>{story.synopsis}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80 line-clamp-4 whitespace-pre-wrap">{story.content}</p>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground flex justify-between">
              <span>by {story.author}</span>
              <span>{story.timestamp}</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
