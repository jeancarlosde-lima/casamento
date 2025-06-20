'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { RsvpState, submitRsvp } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Heart } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Submitting...' : 'Send RSVP'}
    </Button>
  );
}

export function RsvpSection() {
  const initialState: RsvpState = { message: null, errors: {}, success: false };
  const [state, dispatch] = useActionState(submitRsvp, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message && !state.success) {
      toast({
        variant: 'destructive',
        title: 'Oops! Something went wrong.',
        description: state.message,
      });
    }
    if (state.message && state.success) {
      toast({
        title: 'Thank you!',
        description: state.message,
      });
      formRef.current?.reset();
    }
  }, [state, toast]);
  
  if (state.success) {
    return (
      <section id="rsvp" className="py-16 md:py-24 bg-background">
        <div className="container max-w-lg text-center">
            <Card className="shadow-lg">
                <CardHeader>
                    <div className="mx-auto bg-primary rounded-full p-3 w-fit text-primary-foreground mb-4">
                        <Heart className="h-8 w-8" />
                    </div>
                    <CardTitle className="font-headline text-3xl">Thank You!</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{state.message}</p>
                </CardContent>
            </Card>
        </div>
      </section>
    );
  }


  return (
    <section id="rsvp" className="py-16 md:py-24 bg-background">
      <div className="container max-w-lg">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-4xl">Will you be there?</CardTitle>
            <CardDescription>Please RSVP by October 16th, 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <form ref={formRef} action={dispatch} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" placeholder="Your name(s)" />
                {state.errors?.name && <p className="text-sm font-medium text-destructive">{state.errors.name[0]}</p>}
              </div>
              <div className="space-y-2">
                <Label>Will you be attending?</Label>
                <RadioGroup name="attending" className="flex gap-4 pt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="attending-yes" />
                    <Label htmlFor="attending-yes" className="font-normal">Joyfully Accepts</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="attending-no" />
                    <Label htmlFor="attending-no" className="font-normal">Regretfully Declines</Label>
                  </div>
                </RadioGroup>
                {state.errors?.attending && <p className="text-sm font-medium text-destructive">{state.errors.attending[0]}</p>}
              </div>
              <SubmitButton />
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
