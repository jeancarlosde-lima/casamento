'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Gift, QrCode, Copy } from 'lucide-react';
import Image from 'next/image';

const getPixKey = () => typeof window !== 'undefined' ? window.atob('MDAwMjAxMjY1MjAwMTRici5nb3YuYmNiLnBpeDAxMzBjYXNhbWVudG9lbG9pc2FlamVhbkBnbWFpbC5jb201MjA0MDAwMDUzMDM5ODY1ODAyQlI1OTExQ0FKRTMzMzY0NDY2MDA5U2FvIFBhdWxvNjEwOTAxMjI3LTIwMDYyMjMwNTE5ZGFxcjE4NzUxOTQxMDM1MDk1ODYzMDRBRjY0') : '';
const getPixEmail = () => typeof window !== 'undefined' ? window.atob('Y2FzYW1lbnRvZWxvaXNhZWplYW5AZ21haWwuY29t') : '';

export function GiftRegistrySection() {
  const { toast } = useToast();

  const copyFallback = (text: string, successMessage: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '-9999px';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        toast({ title: successMessage });
      } else {
        throw new Error('Copy command was not successful');
      }
    } catch (err) {
      console.error('Fallback copy method failed: ', err);
      toast({
        variant: 'destructive',
        title: 'Oops! Não foi possível copiar.',
        description: 'Seu navegador pode estar bloqueando esta ação. Por favor, copie manualmente.',
      });
    }
    document.body.removeChild(textArea);
  }

  const copyToClipboard = (text: string, successMessage: string) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        toast({ title: successMessage });
      }).catch(err => {
        console.warn('navigator.clipboard failed, trying fallback: ', err);
        copyFallback(text, successMessage);
      });
    } else {
      copyFallback(text, successMessage);
    }
  };

  const handleCopyPixKey = () => {
    copyToClipboard(getPixKey(), 'Chave PIX copiada!');
  };

  const handleCopyEmail = () => {
    copyToClipboard(getPixEmail(), 'E-mail copiado!');
  };

  return (
    <div className="container max-w-5xl">
      <div className="text-center mb-10 stagger-item" style={{'--delay': '0ms'} as React.CSSProperties}>
        <h2 className="font-display text-4xl md:text-5xl">Lista de Presentes</h2>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          Sua presença é o maior presente! Mas se você também quiser nos presentear, ficamos felizes em oferecer algumas opções com muito carinho.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Card da Lista de Presentes */}
        <div className="stagger-item" style={{'--delay': '150ms'} as React.CSSProperties}>
            <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 ease-out hover:-translate-y-2 bg-card rounded-2xl text-center h-full flex flex-col">
                <CardHeader className="items-center pt-8">
                  <div className="mx-auto bg-primary rounded-full p-4 w-fit text-primary-foreground mb-4">
                      <Gift className="h-10 w-10" />
                  </div>
                  <CardTitle className="font-display text-3xl">Nossa Lista</CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-4 flex flex-col flex-1 items-center">
                  <p className="text-muted-foreground mb-4">
                      Para acessar nossa lista de presentes em loja, basta clicar no botão abaixo. Agradecemos de coração por fazer parte deste momento!
                  </p>
                  <div className="bg-white p-4 rounded-lg shadow-inner mb-4 flex-1 flex items-center justify-center">
                    <Image
                      src="/images/lista_dePresente.png"
                      alt="Imagem ilustrativa de presentes para casa"
                      width={180}
                      height={180}
                      className="object-contain"
                    />
                  </div>
                  <div className="w-full">
                    <Button asChild size="lg" className="rounded-full w-full mt-auto">
                        <a href="#" target="_blank" rel="noopener noreferrer">
                        Ver Lista de Presentes
                        </a>
                    </Button>
                  </div>
                </CardContent>
            </Card>
        </div>

        {/* Card do PIX */}
        <div className="stagger-item" style={{'--delay': '300ms'} as React.CSSProperties}>
            <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 ease-out hover:-translate-y-2 bg-card rounded-2xl text-center h-full flex flex-col">
                <CardHeader className="items-center pt-8">
                  <div className="mx-auto bg-primary rounded-full p-4 w-fit text-primary-foreground mb-4">
                      <QrCode className="h-10 w-10" />
                  </div>
                  <CardTitle className="font-display text-3xl">Presente em PIX</CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-4 flex flex-col flex-1 items-center">
                    <p className="text-muted-foreground mb-4">
                        Se preferir, você pode nos presentear diretamente via PIX. Aponte a câmera do seu celular para o QR Code abaixo.
                    </p>
                    <div className="bg-white p-4 rounded-lg shadow-inner mb-4 flex-1 flex items-center justify-center">
                        <Image
                            src="/images/pix-qr-code..JPG"
                            alt="QR Code PIX"
                            width={180}
                            height={180}
                            className="object-contain"
                        />
                    </div>
                     <p className="text-muted-foreground text-sm mb-4">Ou use a chave "copia e cola":</p>
                    <Button onClick={handleCopyPixKey} variant="secondary" size="lg" className="rounded-full w-full">
                        <Copy className="mr-2 h-4 w-4" />
                        Copiar Chave PIX
                    </Button>
                    
                     <p className="text-xs text-muted-foreground mt-4">Ou use nossa chave E-mail:</p>
                     <Button onClick={handleCopyEmail} variant="ghost" size="sm" className="mt-2 hover:bg-primary/10 transition-colors duration-200">
                        <span className="font-semibold text-foreground/80">Copiar E-mail PIX</span>
                        <Copy className="ml-2 h-4 w-4" />
                     </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
