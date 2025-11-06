'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search, User } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"


const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/media?type=Manga', label: 'Manga' },
  { href: '/media?type=Anime', label: 'Anime' },
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
            pathname === link.href ? 'text-primary' : 'text-gray-400',
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
            <Image src="https://res.cloudinary.com/doklib3it/image/upload/v1762444330/Screenshot_2025-09-22_002714-removebg-preview_tjg6hx.png" alt="Logo" width={100} height={24} className="h-6 w-auto" />
          </Link>
        </div>

        <div className="md:hidden ml-auto">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
               <Link href="/" className="mr-6 flex items-center space-x-2 mb-4" onClick={() => setIsMobileMenuOpen(false)}>
                  <Image src="https://res.cloudinary.com/doklib3it/image/upload/v1762444330/Screenshot_2025-09-22_002714-removebg-preview_tjg6hx.png" alt="Logo" width={100} height={24} className="h-6 w-auto" />
                </Link>
              <NavLinks inSheet />
            </SheetContent>
          </Sheet>
        </div>


        <div className="hidden flex-1 items-center justify-end space-x-4 md:flex">
          <NavLinks />
           <Button variant="ghost" size="icon">
              <Search className="h-5 w-5 text-gray-400" />
              <span className="sr-only">Search</span>
            </Button>
           <Button variant="ghost" size="icon">
              <User className="h-5 w-5 text-gray-400" />
              <span className="sr-only">Profile</span>
            </Button>
        </div>
      </div>
    </header>
  );
}
