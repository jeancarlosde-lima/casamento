import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift } from 'lucide-react';

export function GiftRegistrySection() {
  return (
    <div className="container max-w-lg">
      <div className="text-center mb-10 stagger-item" style={{'--delay': '0ms'} as React.CSSProperties}>
        <h2 className="font-display text-4xl md:text-5xl">Lista de Presentes</h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          Sua presença é o maior presente! Mas se você também quiser nos presentear, preparamos uma lista de presentes com muito carinho.
        </p>
      </div>
      <Card className="shadow-lg bg-card rounded-2xl text-center stagger-item" style={{'--delay': '150ms'} as React.CSSProperties}>
        <CardHeader className="items-center pt-8">
          <div className="mx-auto bg-primary rounded-full p-4 w-fit text-primary-foreground mb-4">
            <Gift className="h-10 w-10" />
          </div>
          <CardTitle className="font-display text-3xl">Nossa Lista</CardTitle>
        </CardHeader>
        <CardContent className="p-8 pt-4">
          <p className="text-muted-foreground mb-6">
            Para acessar nossa lista de presentes, basta clicar no botão abaixo. Agradecemos de coração por fazer parte deste momento tão especial!
          </p>
          <Button asChild size="lg" className="rounded-full">
            <a href="#" target="_blank" rel="noopener noreferrer">
              Ver Lista de Presentes
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
