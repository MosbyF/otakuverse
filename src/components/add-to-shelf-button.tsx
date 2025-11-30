'use client';

import { useState } from 'react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { useAuth } from '@/components/auth/AuthProvider';
import { useUser, useFirestore, addDocumentNonBlocking } from '@/firebase';
import { collection } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { PlusSquare, Check } from 'lucide-react';
import type { MediaType } from '@/lib/types';
import { cn } from '@/lib/utils';

interface AddToShelfButtonProps extends Omit<ButtonProps, 'onClick' | 'disabled'> {
  media: MediaType;
}

export function AddToShelfButton({ media, variant, ...props }: AddToShelfButtonProps) {
  const { isAuthenticated, openLogin, isAuthLoading } = useAuth();
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToShelf = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      openLogin();
      return;
    }

    if (!user || !firestore || isAdding || isAdded) return;

    setIsAdding(true);

    const shelfItem = {
      userId: user.uid,
      mediaId: media.id,
      type: media.type,
      title: media.title,
      imageUrl: media.imageUrl,
      addedAt: new Date().toISOString(),
    };
    
    const shelfRef = collection(firestore, 'users', user.uid, 'shelfItems');
    // We don't await here for optimistic UI
    addDocumentNonBlocking(shelfRef, shelfItem);

    setIsAdded(true);
    toast({
      title: 'Added to Shelf!',
      description: `${media.title} has been added to your collection.`,
    });
    
    // Reset the button state after a delay
    setTimeout(() => {
      setIsAdded(false);
      setIsAdding(false);
    }, 2000);
  };
  
  const isIconButton = variant === 'icon';
  const Icon = isAdded ? Check : PlusSquare;

  return (
    <Button
      onClick={handleAddToShelf}
      disabled={isAuthLoading || isAdding || isAdded}
      variant={variant}
      size={isIconButton ? 'icon' : 'sm'}
      className={cn(
        isIconButton && "h-8 w-8 bg-black/50 hover:bg-primary",
        !isIconButton && "w-full mt-3 text-xs",
        props.className
      )}
      {...props}
    >
      <Icon className={cn("h-4 w-4", !isIconButton && "mr-2")} />
      {!isIconButton && (
          <span>{isAdded ? 'Added!' : isAdding ? 'Adding...' : 'Add to My Shelf'}</span>
      )}
      {isIconButton && <span className="sr-only">Add to shelf</span>}
    </Button>
  );
}
