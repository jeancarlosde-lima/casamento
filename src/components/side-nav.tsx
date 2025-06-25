'use client';

import { useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';

const navItems = [
  { id: 'hero', title: 'Início' },
  { id: 'gallery', title: 'Galeria' },
  { id: 'quote', title: 'Mensagem' },
  { id: 'event-details', title: 'O Casamento' },
  { id: 'our-story', title: 'Nossa História' },
  { id: 'rsvp', title: 'Confirmar Presença' },
  { id: 'gift-registry', title: 'Presentes' },
];

function NavLinks({ activeSection, onLinkClick, isMobile = false }: { activeSection: string, onLinkClick?: () => void, isMobile?: boolean }) {
    return (
        <ul className={cn("flex flex-col", isMobile ? "gap-3" : "gap-4 items-center")}>
            {navItems.map(item => (
                <li key={item.id} className="w-full">
                    <a
                        href={`#${item.id}`}
                        onClick={onLinkClick}
                        className={cn(
                            'group relative flex items-center transition-all duration-300',
                            isMobile ? 'gap-3 py-2 text-lg' : 'justify-center'
                        )}
                        aria-label={`Ir para a seção ${item.title}`}
                    >
                        <div className={cn(
                            'flex-shrink-0 rounded-full bg-primary transition-all duration-300',
                            activeSection === item.id ? 'w-3 h-3' : 'w-2 h-2 bg-primary/40 group-hover:bg-primary group-hover:scale-110'
                        )}></div>

                        {isMobile ? (
                             <span className={cn(
                                'font-poppins',
                                activeSection === item.id ? 'text-primary font-bold' : 'text-foreground/60 group-hover:text-primary'
                            )}>
                                {item.title}
                            </span>
                        ) : (
                            <span className={cn(
                                'absolute left-full ml-4 whitespace-nowrap rounded-md bg-card px-3 py-1.5 text-sm font-poppins font-semibold text-card-foreground shadow-lg opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none'
                            )}>
                                {item.title}
                            </span>
                        )}
                    </a>
                </li>
            ))}
        </ul>
    );
}

export function SideNav() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    const offset = window.innerHeight * 0.4;
    let currentActiveId = 'hero';

    for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element && element.getBoundingClientRect().top < offset) {
            currentActiveId = item.id;
        }
    }
    
    if (activeSection !== currentActiveId) {
        setActiveSection(currentActiveId);
    }
  }, [activeSection]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden md:block">
        <NavLinks activeSection={activeSection} />
      </nav>

      {/* Mobile Navigation */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                  <Button size="icon" variant="default" className="rounded-full shadow-lg bg-background/70 text-primary backdrop-blur-sm hover:bg-background">
                      <Menu className="h-6 w-6" />
                      <span className="sr-only">Abrir menu</span>
                  </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-card w-4/5 p-0">
                <div className="flex flex-col h-full">
                    <SheetHeader className="flex flex-row justify-between items-center p-4 border-b text-left space-y-0">
                       <SheetTitle className="font-display text-2xl text-primary font-normal">Menu</SheetTitle>
                       <SheetClose asChild>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <X className="h-6 w-6" />
                                <span className="sr-only">Fechar menu</span>
                            </Button>
                       </SheetClose>
                    </SheetHeader>
                    <div className="p-4">
                      <NavLinks activeSection={activeSection} onLinkClick={() => setIsMobileMenuOpen(false)} isMobile={true} />
                    </div>
                    <div className="mt-auto text-center p-6 bg-background/50">
                        <p className="font-display text-3xl text-primary">Eloisa &amp; Jean</p>
                    </div>
                </div>
              </SheetContent>
          </Sheet>
      </div>
    </>
  );
}
