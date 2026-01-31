'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle, Search, UserCheck } from 'lucide-react';
import { useDebounce } from '@/hooks/use-debounce';
import { Label } from '@/components/ui/label';

interface Guest {
    id: string;
    name: string;
    party_size: number;
    isConfirmed?: boolean;
}

export function RsvpSection() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Guest[]>([]);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [status, setStatus] = useState<'idle' | 'searching' | 'confirming' | 'confirmed' | 'error'>('idle');
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  useEffect(() => {
    if (debouncedSearchTerm.length > 2) {
      const searchGuests = async () => {
        setStatus('searching');
        try {
          const response = await fetch(`/api/guests?search=${debouncedSearchTerm}`);
          if (response.ok) {
            const data: Guest[] = await response.json();
            setResults(data);
          } else {
            setResults([]);
          }
        } catch (error) {
          console.error('Search error:', error);
          setResults([]);
        }
        setStatus('idle');
      };
      searchGuests();
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm]);

  const handleSelectGuest = (guest: Guest) => {
    setSelectedGuest(guest);
    setSearchTerm(guest.name);
    setResults([]);
  };

  const handleConfirm = async () => {
    if (!selectedGuest) return;

    setStatus('confirming');
    try {
      const response = await fetch('/api/guests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guestId: selectedGuest.id }),
      });

      if (response.ok) {
        setStatus('confirmed');
        toast({
          title: 'Presença Confirmada!',
          description: `Obrigado, ${selectedGuest.name}! Sua presença foi registrada.`,
        });
      } else {
        throw new Error('Falha ao confirmar presença.');
      }
    } catch (error) {
      setStatus('error');
      toast({
        variant: 'destructive',
        title: 'Erro ao confirmar.',
        description: 'Não foi possível registrar sua presença. Tente novamente.',
      });
      setStatus('idle');
    }
  };

  const resetForm = () => {
      setStatus('idle');
      setSelectedGuest(null);
      setSearchTerm('');
  }

  if (status === 'confirmed') {
    return (
        <div className="container max-w-2xl py-20">
            <Card className="shadow-lg bg-card text-center p-8">
                <CheckCircle className="h-16 w-16 mx-auto text-green-500 mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Obrigado, {selectedGuest?.name}!</h3>
                <p className="text-muted-foreground mb-6">Sua presença foi confirmada com sucesso. Mal podemos esperar para celebrar com você!</p>
                <Button onClick={resetForm}>Confirmar outro nome</Button>
            </Card>
        </div>
    )
  }

  return (
    <div className="container max-w-2xl py-20">
      <Card className="shadow-lg bg-card">
        <CardHeader className="text-center">
          <CardTitle className="font-display text-4xl">Confirme sua Presença</CardTitle>
          <CardDescription className="pt-2">Digite seu nome para encontrar seu convite e confirmar.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid gap-4">
                <div className="relative" ref={searchRef}>
                    <Label htmlFor="name-search" className="sr-only">Seu nome</Label>
                    <div className="relative">
                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                         <Input
                            id="name-search"
                            placeholder="Digite seu primeiro nome..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            disabled={status === 'confirming' || !!selectedGuest}
                            className="pl-10 h-12"
                        />
                         {status === 'searching' && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin" />}
                    </div>
                   
                    {results.length > 0 && (
                        <ul className="absolute z-10 w-full mt-2 bg-card border rounded-md shadow-lg max-h-60 overflow-y-auto">
                            {results.map((guest) => (
                                <li key={guest.id} onClick={() => handleSelectGuest(guest)} 
                                    className="px-4 py-3 cursor-pointer hover:bg-primary/10 flex justify-between items-center">
                                    <span>{guest.name}</span>
                                    {guest.isConfirmed && <span className="text-xs text-green-500 flex items-center"><UserCheck className="h-4 w-4 mr-1"/> Já Confirmado</span>}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                 {selectedGuest && (
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                        <p className="font-semibold text-lg">{selectedGuest.name}</p>
                        <p className="text-sm text-muted-foreground">Convite para {selectedGuest.party_size} pessoa(s).</p>
                    </div>
                )}
                <Button onClick={handleConfirm} disabled={!selectedGuest || status === 'confirming'} size="lg" className="h-12">
                    {status === 'confirming' ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Confirmando...
                    </> 
                    ) : (
                    'Confirmar Presença'
                    )}
              </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
