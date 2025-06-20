import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PageHeader() {
  const navItems = [
    { name: 'Nossa História', href: '#our-story' },
    { name: 'O Casamento', href: '#event-details' },
    { name: 'Galeria', href: '#gallery' },
    { name: 'Presentes', href: '#gift-registry' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <a href="#hero" className="flex items-center gap-2 mr-8">
          <Heart className="h-6 w-6 text-primary" />
          <span className="font-display text-xl font-bold">E & J</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              {item.name}
            </a>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-2">
          <Button asChild className="rounded-full">
            <a href="#rsvp">Confirmar Presença</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
