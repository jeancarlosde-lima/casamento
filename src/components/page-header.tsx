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
    <header className="w-full border-b border-primary-foreground/20 bg-primary">
      <div className="container flex h-16 items-center">
        <a href="#hero" className="flex items-center gap-2 mr-auto">
          <Heart className="h-6 w-6 text-primary-foreground" />
          <span className="font-display text-xl text-primary-foreground">E & J</span>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="font-display text-[10px] text-primary-foreground/80 transition-colors hover:text-primary-foreground"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full text-primary-foreground hover:bg-primary-foreground/10">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
                <a href="#hero" className="flex items-center gap-2 mb-12">
                    <Heart className="h-6 w-6 text-primary" />
                    <span className="font-display text-xl text-primary">E & J</span>
                </a>
              <nav className="flex flex-col gap-6">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.name}>
                    <a href={item.href} className="font-display text-[10px] text-foreground/80 hover:text-primary -ml-4 pl-4 py-2 rounded-lg hover:bg-primary/10">
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
