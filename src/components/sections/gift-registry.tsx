'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Gift, QrCode, Copy } from 'lucide-react';
import Image from 'next/image';

/**
 * Decodifica a chave PIX (código EMV completo) a partir de base64.
 * Usa try/catch para evitar falhas silenciosas.
 */
const decodePixKey = (): string => {
  try {
    if (typeof window === 'undefined') return '';
    return window.atob('MDAwMjAxMjY1MjAwMTRici5nb3YuYmNiLnBpeDAxMzBjYXNhbWVudG9lbG9pc2FlamVhbkBnbWFpbC5jb201MjA0MDAwMDUzMDM5ODY1ODAyQlI1OTExQ0FKRTMzMzY0NDY2MDA5U2FvIFBhdWxvNjEwOTAxMjI3LTIwMDYyMjMwNTE5ZGFxcjE4NzUxOTQxMDM1MDk1ODYzMDRBRjY0');
  } catch {
    console.error('Erro ao decodificar chave PIX');
    return '';
  }
};

/**
 * Decodifica o e-mail PIX a partir de base64.
 */
const decodePixEmail = (): string => {
  try {
    if (typeof window === 'undefined') return '';
    return window.atob('Y2FzYW1lbnRvZWxvaXNhZWplYW5AZ21haWwuY29t');
  } catch {
    console.error('Erro ao decodificar e-mail PIX');
    return '';
  }
};

export function GiftRegistrySection() {
  const { toast } = useToast();

  /**
   * Copia texto para a área de transferência usando o método moderno (Clipboard API)
   * com fallback para o método legado (execCommand) caso falhe.
   */
  const copyToClipboard = async (text: string, successMessage: string) => {
    // Verificação: se a chave está vazia, avisa o usuário
    if (!text) {
      toast({
        variant: 'destructive',
        title: 'Erro ao copiar',
        description: 'Não foi possível obter os dados. Tente novamente.',
      });
      return;
    }

    // Tenta o método moderno primeiro
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        toast({ title: successMessage });
        return;
      } catch (err) {
        console.warn('Clipboard API falhou, tentando método alternativo:', err);
      }
    }

    // Fallback: método legado com textarea oculta
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      // Posiciona fora da tela para não ser visível
      textArea.style.position = 'fixed';
      textArea.style.top = '-9999px';
      textArea.style.left = '-9999px';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);

      if (successful) {
        toast({ title: successMessage });
      } else {
        throw new Error('execCommand copy falhou');
      }
    } catch (err) {
      console.error('Todos os métodos de cópia falharam:', err);
      toast({
        variant: 'destructive',
        title: 'Não foi possível copiar',
        description: 'Tente pressionar e segurar o botão, ou copie manualmente.',
      });
    }
  };

  const handleCopyPixKey = () => {
    const key = decodePixKey();
    copyToClipboard(key, 'Chave PIX copiada! Cole no app do seu banco.');
  };

  const handleCopyEmail = () => {
    const email = decodePixEmail();
    copyToClipboard(email, 'E-mail PIX copiado!');
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
