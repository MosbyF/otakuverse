'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Menu, Search } from 'lucide-react';
import { useState, FormEvent } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { UserNav } from './auth/UserNav';
import { useAuth } from './auth/AuthProvider';
import { Input } from './ui/input';


const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/media?type=Manga', label: 'Manga' },
  { href: '/media?type=Anime', label: 'Anime' },
  { href: '/fandom', label: 'Fandom' },
  { href: '/about', label: 'About Us' },
];

function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(defaultQuery);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${query}`);
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search anime, manga..."
        className="pl-8 h-9"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

export function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openLogin } = useAuth();

  const isLinkActive = (href: string) => {
    const linkPath = href.split('?')[0];
    if (linkPath !== pathname) {
      return false;
    }
    const linkParams = new URLSearchParams(href.split('?')[1]);
    const type = linkParams.get('type');
    if (type) {
      return searchParams.get('type') === type;
    }
    return true;
  };

  const NavLinks = ({ inSheet }: { inSheet?: boolean }) => (
    <nav className={cn(
      "flex items-center gap-4 lg:gap-6",
      inSheet && "flex-col items-start gap-6 pt-8"
    )}>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            isLinkActive(link.href) ? 'text-primary' : 'text-gray-400',
            inSheet && "text-lg"
          )}
          onClick={() => inSheet && setIsMobileMenuOpen(false)}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );


  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="https://res.cloudinary.com/doklib3it/image/upload/v1762444330/Screenshot_2025-09-22_002714-removebg-preview_tjg6hx.png" alt="Logo" width={150} height={36} className="h-8 w-auto" crossOrigin="anonymous"/>
          </Link>
        </div>

        <div className="md:hidden ml-auto flex items-center">
          <UserNav />
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
               <Link href="/" className="mr-6 flex items-center space-x-2 mb-4" onClick={() => setIsMobileMenuOpen(false)}>
                  <Image src="https://res.cloudinary.com/doklib3it/image/upload/v1762444330/Screenshot_2025-09-22_002714-removebg-preview_tjg6hx.png" alt="Logo" width={150} height={36} className="h-8 w-auto" crossOrigin="anonymous" />
                </Link>
              <NavLinks inSheet />
            </SheetContent>
          </Sheet>
        </div>


        <div className="hidden flex-1 items-center justify-end space-x-4 md:flex">
          <NavLinks />
           <SearchBar />
           <UserNav />
        </div>
      </div>
    </header>
  );
}
