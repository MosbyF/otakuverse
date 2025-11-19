import { OtakuVerseLogo } from './icons';
import { Twitter, Instagram, Facebook } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
             <Image src="https://res.cloudinary.com/doklib3it/image/upload/v1762444330/Screenshot_2025-09-22_002714-removebg-preview_tjg6hx.png" alt="Logo" width={100} height={24} className="h-6 w-auto" crossOrigin="anonymous" />
          </div>
          <div className="text-center text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} OtakuVerse. All Rights Reserved.
          </div>
          <div className="flex space-x-4">
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
            <Link href="#" aria-label="Facebook">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
