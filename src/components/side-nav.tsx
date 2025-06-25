'use client';

import { useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const navItems = [
  { id: 'hero', title: 'Início' },
  { id: 'gallery', title: 'Galeria' },
  { id: 'quote', title: 'Mensagem' },
  { id: 'event-details', title: 'O Casamento' },
  { id: 'our-story', title: 'Nossa História' },
  { id: 'rsvp', title: 'Confirmar Presença' },
  { id: 'gift-registry', title: 'Presentes' },
];

export function SideNav() {
  const [activeSection, setActiveSection] = useState<string>('hero');

  const handleScroll = useCallback(() => {
    const offset = window.innerHeight * 0.5;
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
    <TooltipProvider>
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex">
        <ul className="flex flex-col items-center gap-4">
          {navItems.map(item => (
            <li key={item.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={`#${item.id}`}
                    className={cn(
                      'block w-3 h-3 rounded-full bg-primary/40 transition-all duration-300 hover:bg-primary hover:scale-125',
                      activeSection === item.id && 'bg-primary scale-150 shadow-md shadow-primary/50'
                    )}
                    aria-label={`Ir para a seção ${item.title}`}
                  >
                    <span className="sr-only">{item.title}</span>
                  </a>
                </TooltipTrigger>
                <TooltipContent side="left" className="bg-foreground text-background font-poppins">
                  <p>{item.title}</p>
                </TooltipContent>
              </Tooltip>
            </li>
          ))}
        </ul>
      </nav>
    </TooltipProvider>
  );
}
