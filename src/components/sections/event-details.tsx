
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, MapPin } from 'lucide-react';

const eventDetails = [
  {
    icon: <Calendar className="h-8 w-8 text-primary" />,
    title: 'Date',
    description: 'Saturday, November 16, 2024',
  },
  {
    icon: <Clock className="h-8 w-8 text-primary" />,
    title: 'Time',
    description: 'Ceremony at 4:00 PM, Reception to follow',
  },
  {
    icon: <MapPin className="h-8 w-8 text-primary" />,
    title: 'Venue',
    description: 'The Grand Palace, 123 Celebration Ave, Happytown',
  },
];

export function EventDetailsSection() {
  return (
    <section id="event-details" className="py-16 md:py-24 bg-secondary/30">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="font-headline text-4xl md:text-5xl">The Wedding</h2>
          <p className="mt-4 text-muted-foreground">
            Here's what you need to know for the big day.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {eventDetails.map((detail) => (
            <Card key={detail.title} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center">
                {detail.icon}
                <CardTitle className="font-headline mt-4">{detail.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{detail.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild size="lg">
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
              <MapPin className="mr-2 h-4 w-4" />
              Open in Google Maps
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
