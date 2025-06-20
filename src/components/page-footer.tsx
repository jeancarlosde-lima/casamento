
import { Flower2 } from 'lucide-react';

export default function PageFooter() {
  return (
    <footer className="py-8 bg-background">
      <div className="container flex flex-col items-center justify-center gap-4">
        <Flower2 className="h-8 w-8 text-primary" />
        <p className="text-center text-sm leading-loose text-muted-foreground">
          Made with love for Eloisa & Jean.
        </p>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
