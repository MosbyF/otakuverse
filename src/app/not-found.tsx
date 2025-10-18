import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SearchX } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center">
      <SearchX className="h-24 w-24 text-primary mb-4" />
      <h1 className="text-4xl md:text-6xl font-bold font-headline mb-2">404 - Not Found</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Oops! The page you're looking for has wandered off into another dimension.
      </p>
      <Link href="/">
        <Button size="lg">Return to the Universe</Button>
      </Link>
    </div>
  );
}
