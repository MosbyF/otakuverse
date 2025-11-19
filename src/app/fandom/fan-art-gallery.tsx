'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import type { FanArt } from '@/lib/types';
import { Upload, Eye } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';
import { useUser } from '@/firebase';
import { cn } from '@/lib/utils';

const DESCRIPTION_TRUNCATE_LENGTH = 100;

export function FanArtGallery({ initialArt }: { initialArt: FanArt[] }) {
  const [art, setArt] = useState<FanArt[]>(initialArt);
  const [newArt, setNewArt] = useState({ title: '', imageUrl: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<number, boolean>>({});
  const { toast } = useToast();
  const { isAuthenticated, openLogin } = useAuth();
  const { user } = useUser();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewArt(prev => ({ ...prev, [name]: value }));
  };

  const handleArtSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArt.title || !newArt.imageUrl || isSubmitting || !isAuthenticated) return;

    setIsSubmitting(true);
    // In a real app, this would involve an actual upload and backend call
    const newSubmission: FanArt = {
      id: Date.now(),
      title: newArt.title,
      author: user?.displayName || user?.email || 'Anonymous',
      imageUrl: newArt.imageUrl,
      description: newArt.description,
      timestamp: 'Just now',
    };

    setTimeout(() => {
      setArt([newSubmission, ...art]);
      setNewArt({ title: '', imageUrl: '', description: '' });
      setIsSubmitting(false);
      setIsUploadDialogOpen(false);
      toast({
        title: 'Success!',
        description: 'Your fan art has been submitted.',
      });
    }, 1000);
  };
  
  const toggleDescription = (id: number) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        {isAuthenticated ? (
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg">
                <Upload className="mr-2 h-5 w-5" />
                Upload Fan Art
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Share Your Creation</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleArtSubmit} className="grid gap-4 py-4">
                <Input
                  name="title"
                  placeholder="Title of your artwork"
                  value={newArt.title}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  required
                />
                <Input
                  name="imageUrl"
                  placeholder="Image URL (e.g., from Imgur)"
                  value={newArt.imageUrl}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  required
                />
                <Textarea
                  name="description"
                  placeholder="Brief description (optional)"
                  value={newArt.description}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Art'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        ) : (
          <Button size="lg" onClick={openLogin}>
            <Upload className="mr-2 h-5 w-5" />
            Login to Upload Fan Art
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {art.map((item) => {
          const isExpanded = expandedDescriptions[item.id];
          const isLongDescription = item.description.length > DESCRIPTION_TRUNCATE_LENGTH;
          
          return (
            <Dialog key={item.id}>
              <Card className="group overflow-hidden flex flex-col">
                  <DialogTrigger asChild>
                    <div className="relative aspect-square w-full cursor-pointer">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        crossOrigin="anonymous"
                      />
                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Eye className="h-10 w-10 text-white" />
                      </div>
                    </div>
                  </DialogTrigger>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg truncate">{item.title}</CardTitle>
                  {item.description && (
                    <div>
                      <CardDescription className={cn("text-sm text-muted-foreground", !isExpanded && "line-clamp-2")}>
                        {item.description}
                      </CardDescription>
                      {isLongDescription && (
                        <button
                          onClick={() => toggleDescription(item.id)}
                          className="text-xs text-primary hover:underline mt-1"
                        >
                          {isExpanded ? 'View Less' : 'View More'}
                        </button>
                      )}
                    </div>
                  )}
                </CardHeader>
                <CardFooter className="p-4 pt-0 text-sm text-muted-foreground mt-auto">
                  <span>by {item.author}</span>
                </CardFooter>
              </Card>

              <DialogContent className="max-w-4xl p-0 border-0">
                <div className="relative aspect-video w-full">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-contain"
                    crossOrigin="anonymous"
                  />
                </div>
              </DialogContent>
            </Dialog>
          );
        })}
      </div>
    </div>
  );
}
