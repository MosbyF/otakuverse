'use client';

import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, deleteDoc, doc, getDocs, writeBatch } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { ShelfItem } from '@/lib/types';
import { getAuth, deleteUser } from 'firebase/auth';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const userShelfQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return collection(firestore, 'users', user.uid, 'shelfItems');
  }, [firestore, user]);

  const { data: shelfItems, isLoading: isLoadingShelf } = useCollection<ShelfItem>(userShelfQuery);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-16 w-16 animate-spin" />
      </div>
    );
  }

  const handleSignOut = () => {
    getAuth().signOut();
    router.push('/');
  };

  const handleDeleteAccount = async () => {
    if (!user || !firestore) return;

    setIsDeleting(true);

    try {
      // 1. Delete all shelf items in a batch
      if (userShelfQuery) {
        const shelfSnapshot = await getDocs(userShelfQuery);
        const batch = writeBatch(firestore);
        shelfSnapshot.forEach((doc) => {
          batch.delete(doc.ref);
        });
        await batch.commit();
      }

      // 2. Delete the user's profile document
      await deleteDoc(doc(firestore, 'users', user.uid));

      // 3. Delete the user from Firebase Authentication
      await deleteUser(user);

      toast({
        title: 'Account Deleted',
        description: 'Your account and all associated data have been permanently removed.',
      });
      router.push('/');

    } catch (error: any) {
      console.error('Error deleting account:', error);
      toast({
        variant: 'destructive',
        title: 'Error Deleting Account',
        description: error.message || 'Could not delete account. You may need to sign in again to perform this action.',
      });
      if (error.code === 'auth/requires-recent-login') {
         // Force re-authentication
        handleSignOut();
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold font-headline">My Shelf</h1>
          <p className="text-muted-foreground">Welcome, {user.displayName || user.email}</p>
        </div>
        <div className="flex items-center gap-2">
            <Button onClick={handleSignOut} variant="outline">Sign Out</Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={isDeleting}>
                  {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account,
                    your shelf, and all associated data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteAccount} disabled={isDeleting}>
                    Yes, delete my account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
        </div>
      </div>

      {isLoadingShelf && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse bg-muted aspect-[2/3]"></Card>
          ))}
        </div>
      )}

      {!isLoadingShelf && shelfItems && shelfItems.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {shelfItems.sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()).map((item) => (
            <Link href={`/media/${item.mediaId}`} key={item.id}>
              <Card className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1">
                <div className="relative aspect-[2/3]">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-sm truncate">{item.title}</h3>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {!isLoadingShelf && (!shelfItems || shelfItems.length === 0) && (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground mb-4">Your shelf is empty.</p>
          <Link href="/">
            <Button>Start Browsing</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
