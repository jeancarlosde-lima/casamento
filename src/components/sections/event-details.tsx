import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Church, MapPin, PartyPopper } from 'lucide-react';

const eventDetails = [
  {
    icon: <Church className="h-10 w-10 text-primary" />,
    title: 'Cerimônia',
    description: 'Onde celebraremos nossos votos de amor eterno diante de Deus, família e amigos queridos.',
    address: 'R. Capela do Alto, 86 - Vila Virginia, Itaquaquecetuba - SP, 08576-150',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=R.+Capela+do+Alto,+86+-+Vila+Virginia,Itaquaquecetuba+-+SP'
  },
  {
    icon: <PartyPopper className="h-10 w-10 text-primary" />,
    title: 'Recepção',
    description: 'Onde continuaremos a festa com música, dança e momentos inesquecíveis ao lado de vocês.',
    address: 'Estr. do Oura, 420 - Ipelândia, Suzano - SP, 08620-060',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=Estr.+do+Oura,+420+-+Ipelândia,Suzano+-+SP'
  },
];

export function EventDetailsSection() {
  return (
    <div className="container">
      <div className="mx-auto max-w-2xl text-center mb-12">
        <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground">O Casamento</h2>
        <p className="mt-4 text-muted-foreground text-lg">
          Sábado, 10 de Outubro de 2026
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
        {eventDetails.map((detail) => (
          <Card key={detail.title} className="text-center shadow-lg hover:shadow-2xl transition-all duration-300 ease-out hover:-translate-y-2 border-t-4 border-t-primary rounded-3xl">
            <CardHeader className="items-center gap-4">
              {detail.icon}
              <CardTitle className="font-display font-semibold text-3xl">{detail.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{detail.description}</p>
              <div className="bg-primary/10 p-4 rounded-lg text-sm text-foreground font-medium">
                {detail.address}
              </div>
               <Button asChild size="lg" variant="outline" className="rounded-full">
                  <a href={detail.mapLink} target="_blank" rel="noopener noreferrer">
                    <MapPin className="mr-2 h-4 w-4" />
                    Ver no mapa
                  </a>
                </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
