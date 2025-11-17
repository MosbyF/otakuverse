'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from './AuthProvider';
import { useUser } from '@/firebase';
import { getAuth } from 'firebase/auth';
import { User as UserIcon } from 'lucide-react';
import Link from 'next/link';

export function UserNav() {
  const { openLogin } = useAuth();
  const { user, isUserLoading } = useUser();
  const auth = getAuth();

  if (isUserLoading) {
    return <Button variant="ghost" size="icon" disabled><UserIcon className="h-5 w-5 text-gray-400" /></Button>;
  }

  if (!user) {
    return (
      <Button variant="ghost" onClick={openLogin}>
        <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
        Login
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.photoURL || undefined} alt={user.displayName || user.email || 'user'} />
            <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.displayName || user.email}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/profile">
            <DropdownMenuItem>
              Profile
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={() => auth.signOut()}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
