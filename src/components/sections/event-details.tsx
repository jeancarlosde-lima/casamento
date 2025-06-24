import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import Image from 'next/image';
import { Countdown } from '@/components/countdown';

const eventDetails = [
  {
    imageSrc: 'https://i.imgur.com/0KtnE8c.png',
    title: 'Cerimônia',
    venueName: 'Paróquia Santos Apóstolos',
    description: 'Onde celebraremos nossos votos de amor eterno diante de Deus, família e amigos queridos.',
    address: 'R. Capela do Alto, 86 - Vila Virginia, Itaquaquecetuba - SP, 08576-150',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=R.+Capela+do+Alto,+86+-+Vila+Virginia,Itaquaquecetuba+-+SP',
    wazeLink: 'https://www.waze.com/ul?q=R.%20Capela%20do%20Alto,%2086%20-%20Vila%20Virginia,%20Itaquaquecetuba%20-%20SP'
  },
  {
    imageSrc: 'https://i.imgur.com/B6xX83O.png',
    title: 'Recepção',
    venueName: 'Sítio Recanto das Palmeiras',
    description: 'Onde continuaremos a festa com música, dança e momentos inesquecíveis ao lado de vocês.',
    address: 'Estr. do Oura, 420 - Ipelândia, Suzano - SP, 08620-060',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=Estr.+do+Oura,+420+-+Ipelândia,Suzano+-+SP',
    wazeLink: 'https://www.waze.com/ul?q=Estr.%20do%20Oura,%20420%20-%20Ipel%C3%A2ndia,%20Suzano%20-%20SP'
  },
];

const WazeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M14.078 3.518c.289.45.242.943.242 1.487 0 .545-.047 1.037-.242 1.488-.195.45-.586.727-.977.727-.39 0-.78-.277-.976-.727-.195-.45-.242-.943-.242-1.488 0-.544.047-1.037.242-1.487C12.321 3.068 12.712 2.79 13.1 2.79c.391 0 .782.277.978.728zm2.93 1.488c.484.9.484 2.296 0 3.243-.485.943-1.319 1.581-2.293 1.581-.975 0-1.808-.638-2.293-1.581-.484-.947-.484-2.343 0-3.243.485-.943 1.318-1.58 2.293-1.58.974 0 1.808.637 2.293 1.58zm-7.914 0c.484.9.484 2.296 0 3.243-.484.943-1.319 1.581-2.292 1.581-.975 0-1.809-.638-2.293-1.581-.484-.947-.484-2.343 0-3.243C2.69 4.062 3.525 3.425 4.5 3.425c.973 0 1.808.637 2.293 1.58zm-2.293 3.243c0 .943.484 1.772 1.121 2.264.638.492.833.882.833 1.343v1.86c0 .491-.39 1.173-1.027 1.173-.637 0-1.028-.682-1.028-1.173v-1.86c0-.46.195-.851.834-1.343.637-.492 1.12-1.321 1.12-2.264zm7.914 0c0 .943.485 1.772 1.121 2.264.638.492.834.882.834 1.343v1.86c0 .491-.39 1.173-1.027 1.173-.638 0-1.028-.682-1.028-1.173v-1.86c0-.46.196-.851.834-1.343.637-.492 1.121-1.321 1.121-2.264zM19.5 15c-1.468 0-2.74 1.272-2.74 2.74 0 1.47 1.272 2.742 2.74 2.742s2.74-1.272 2.74-2.742c0-1.468-1.272-2.74-2.74-2.74zm-15 0c-1.468 0-2.74 1.272-2.74 2.74 0 1.47 1.272 2.742 2.74 2.742s2.74-1.272 2.74-2.742c0-1.468-1.272-2.74-2.74-2.74zm7.5 0c-1.468 0-2.74 1.272-2.74 2.74 0 1.47 1.272 2.742 2.74 2.742s2.74-1.272 2.74-2.742c0-1.468-1.272-2.74-2.74-2.74z"></path>
    </svg>
);

export function EventDetailsSection() {
  return (
    <div className="container">
      <div className="mx-auto max-w-2xl text-center mb-12 stagger-item" style={{'--delay': '0ms'} as React.CSSProperties}>
        <h2 className="font-display text-4xl md:text-5xl text-foreground">O Casamento</h2>
        <p className="mt-4 text-muted-foreground text-lg">
          Sábado, 10 de Outubro de 2026
        </p>
        <Countdown />
      </div>
      <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
        {eventDetails.map((detail, index) => (
          <Card key={detail.title} className="flex flex-col text-center shadow-lg hover:shadow-2xl transition-all duration-300 ease-out hover:-translate-y-2 border-t-4 border-t-primary rounded-3xl stagger-item" style={{'--delay': `${150 * (index + 1)}ms`} as React.CSSProperties}>
            <CardHeader className="items-center gap-4">
               <Image
                src={detail.imageSrc}
                alt={`${detail.title} icon`}
                width={80}
                height={80}
                className="rounded-full object-cover aspect-square bg-primary/10 p-1"
              />
              <CardTitle className="font-display text-3xl">{detail.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-1">
              <p className="font-poppins font-semibold text-primary/90 text-xl -mt-2 mb-4">{detail.venueName}</p>
              <p className="text-muted-foreground mb-4">{detail.description}</p>
              <div className="bg-primary/10 p-4 rounded-lg text-sm text-foreground font-medium">
                {detail.address}
              </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2 mt-auto">
                    <Button asChild className="rounded-full flex-1 font-poppins">
                      <a href={detail.mapLink} target="_blank" rel="noopener noreferrer">
                        <MapPin className="mr-2 h-5 w-5" />
                        Google Maps
                      </a>
                    </Button>
                    <Button asChild className="rounded-full flex-1 bg-[#33363B] hover:bg-[#4b4e52] font-poppins">
                      <a href={detail.wazeLink} target="_blank" rel="noopener noreferrer">
                        <WazeIcon className="mr-2 h-5 w-5" />
                        Waze
                      </a>
                    </Button>
                </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
