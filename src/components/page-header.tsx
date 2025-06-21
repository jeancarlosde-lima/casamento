import { Heart, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

export default function PageHeader() {
  const navItems = [
    { name: 'Nossa História', href: '#our-story' },
    { name: 'O Casamento', href: '#event-details' },
    { name: 'Galeria', href: '#gallery' },
    { name: 'Presentes', href: '#gift-registry' },
    { name: 'Mande sua mensagem aqui', href: '#rsvp' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-background/20 bg-foreground">
      <div className="container flex h-16 items-center">
        <a href="#hero" className="flex items-center gap-2 mr-auto">
          <Heart className="h-6 w-6 text-background" />
          <span className="font-display text-xl text-background">E & J</span>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-background/80 transition-colors hover:text-background font-medium"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full text-background hover:bg-background/20">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
                <a href="#hero" className="flex items-center gap-2 mb-12">
                    <Heart className="h-6 w-6 text-primary" />
                    <span className="font-display text-xl text-primary">E & J</span>
                </a>
              <nav className="flex flex-col gap-6 text-lg">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.name}>
                    <a href={item.href} className="text-foreground/80 hover:text-primary -ml-4 pl-4 py-2 rounded-lg hover:bg-primary/10">
                      {item.name}
                    </a>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
