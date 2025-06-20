
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift } from 'lucide-react';

export function GiftRegistrySection() {
  return (
    <section id="gift-registry" className="py-16 md:py-24 bg-secondary/30">
      <div className="container max-w-lg">
        <Card className="text-center shadow-lg">
          <CardHeader>
             <div className="mx-auto bg-primary rounded-full p-3 w-fit text-primary-foreground mb-4">
                <Gift className="h-8 w-8" />
            </div>
            <CardTitle className="font-headline text-4xl">Gift Registry</CardTitle>
            <CardDescription>
              Your presence at our wedding is the greatest gift of all.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              However, if you wish to honor us with a gift, we have registered for items we would love to have in our new home.
            </p>
            <Button asChild size="lg">
              <a href="#" target="_blank" rel="noopener noreferrer">
                View Our Registry
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
