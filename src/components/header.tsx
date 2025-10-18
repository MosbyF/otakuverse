'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search, X } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { OtakuVerseLogo } from '@/components/icons';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"


const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/media', label: 'Anime/Manga' },
  { href: '/genres', label: 'Genres' },
  { href: '/fandom', label: 'Fandom' },
  { href: '/about', label: 'About Us' },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            pathname === link.href ? 'text-primary' : 'text-muted-foreground',
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
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <OtakuVerseLogo className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline">OtakuVerse</span>
          </Link>
          <NavLinks />
        </div>

        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
               <Link href="/" className="mr-6 flex items-center space-x-2 mb-4" onClick={() => setIsMobileMenuOpen(false)}>
                  <OtakuVerseLogo className="h-6 w-6 text-primary" />
                  <span className="font-bold font-headline">OtakuVerse</span>
                </Link>
              <NavLinks inSheet />
            </SheetContent>
          </Sheet>
        </div>


        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <form>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search titles..."
                  className="pl-8 sm:w-40 md:w-56"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}
