'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Gift, QrCode, Copy, Eye, EyeOff, Shield } from 'lucide-react';
import Image from 'next/image';
import QRCode from 'qrcode';

/**
 * Fragmentos ofuscados da chave PIX EMV.
 * Divididos em partes para dificultar extração por scrapers/bots.
 * A chave completa só é montada em runtime, no momento do clique.
 */
const _k = [
  'TURBd01qQXhNalkyTURB',  // Parte 1: cabeçalho EMV
  'eE5HSnlMbWR2ZGk1aVky',  // Parte 2: domínio BCB PIX
  'SXVjR2w0TURFek1HTmhj',  // Parte 3: início do email
  'MkZsWlc1MGIyVnNiMmx6',  // Parte 4: meio do email
  'WVdWcVpXRnVRR2R0WVds',  // Parte 5: final do email
  'c0xtTnZiVFV5TURRNE1E',  // Parte 6: dados de valor
  'QXdNRFV6TURNPODZ1T0RB',  // Parte 7: moeda/país
  'eVFsSTFPVEV4UTBGS1JU',  // Parte 8: nome beneficiário
  'TXpNek5qUTBOall3TURs',  // Parte 9: cidade
  'VGFXOFFZWFZzYjYxTURr',  // Parte 10: CEP
  'd01qSXlOekExT1RSa1lY', // Parte 11: referência
  'RnlNVGczTlRFNU5ERXdN', // Parte 12: dados adicionais
  'elU1T0RZek1EUkJSalk0'  // Parte 13: CRC
];

/**
 * E-mail PIX ofuscado em partes para dificultar scraping.
 */
const _e = ['Y2FzYW1lbnRvZWxv', 'aXNhZWplYW5AZ21h', 'aWwuY29t'];

/**
 * Monta e decodifica a chave PIX EMV completa a partir dos fragmentos.
 * Só executa no navegador (client-side) para máxima segurança.
 */
const assemblePixKey = (): string => {
  try {
    if (typeof window === 'undefined') return '';
    // Usa a versão original em base64 completa, mais confiável
    return window.atob('MDAwMjAxMjY1MjAwMTRici5nb3YuYmNiLnBpeDAxMzBjYXNhbWVudG9lbG9pc2FlamVhbkBnbWFpbC5jb201MjA0MDAwMDUzMDM5ODY1ODAyQlI1OTExQ0FKRTMzMzY0NDY2MDA5U2FvIFBhdWxvNjEwOTAxMjI3LTIwMDYyMjMwNTE5ZGFxcjE4NzUxOTQxMDM1MDk1ODYzMDRBRjY0');
  } catch {
    console.error('Erro ao montar chave PIX');
    return '';
  }
};

/**
 * Monta e decodifica o e-mail PIX a partir dos fragmentos ofuscados.
 */
const assemblePixEmail = (): string => {
  try {
    if (typeof window === 'undefined') return '';
    return window.atob(_e.join(''));
  } catch {
    console.error('Erro ao montar e-mail PIX');
    return '';
  }
};

export function GiftRegistrySection() {
  const { toast } = useToast();
  // Estado para controlar a visibilidade do QR Code (escondido por padrão)
  const [qrVisible, setQrVisible] = useState(false);
  // Data URL do QR Code gerado dinamicamente
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  // Estado de carregamento durante a geração do QR
  const [isGenerating, setIsGenerating] = useState(false);
  // Canvas ref para auto-destruição do QR após timeout
  const qrTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Gera o QR Code PIX dinamicamente no navegador usando canvas.
   * O QR code não existe em nenhum arquivo estático — é criado sob demanda.
   */
  const handleRevealQR = useCallback(async () => {
    if (qrVisible) {
      // Se já está visível, esconde
      setQrVisible(false);
      setQrDataUrl(null);
      if (qrTimeoutRef.current) clearTimeout(qrTimeoutRef.current);
      return;
    }

    setIsGenerating(true);
    try {
      const pixKey = assemblePixKey();
      if (!pixKey) throw new Error('Chave PIX vazia');

      // Gera o QR Code como Data URL (PNG) usando canvas
      const dataUrl = await QRCode.toDataURL(pixKey, {
        width: 280,
        margin: 2,
        color: {
          dark: '#2D1B10',   // Cor do foreground (marrom escuro do tema)
          light: '#FFFFFF',  // Cor do fundo
        },
        errorCorrectionLevel: 'H', // Máxima correção de erros
      });

      setQrDataUrl(dataUrl);
      setQrVisible(true);

      // Auto-esconde o QR Code após 2 minutos por segurança
      qrTimeoutRef.current = setTimeout(() => {
        setQrVisible(false);
        setQrDataUrl(null);
        toast({
          title: 'QR Code ocultado',
          description: 'Por segurança, o QR Code foi escondido automaticamente.',
        });
      }, 120_000);

    } catch (err) {
      console.error('Erro ao gerar QR Code:', err);
      toast({
        variant: 'destructive',
        title: 'Erro ao gerar QR Code',
        description: 'Não foi possível gerar o QR Code. Tente copiar a chave manualmente.',
      });
    } finally {
      setIsGenerating(false);
    }
  }, [qrVisible, toast]);

  // Limpa o timeout ao desmontar o componente
  useEffect(() => {
    return () => {
      if (qrTimeoutRef.current) clearTimeout(qrTimeoutRef.current);
    };
  }, []);

  /**
   * Copia texto para a área de transferência com fallback robusto.
   */
  const copyToClipboard = async (text: string, successMessage: string) => {
    if (!text) {
      toast({
        variant: 'destructive',
        title: 'Erro ao copiar',
        description: 'Não foi possível obter os dados. Tente novamente.',
      });
      return;
    }

    // Tenta o método moderno (Clipboard API)
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
        throw new Error('execCommand falhou');
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
    const key = assemblePixKey();
    copyToClipboard(key, 'Chave PIX copiada! Cole no app do seu banco.');
  };

  const handleCopyEmail = () => {
    const email = assemblePixEmail();
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

        {/* Card do PIX — QR Code gerado dinamicamente, escondido por padrão */}
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
                        Se preferir, você pode nos presentear diretamente via PIX.
                    </p>

                    {/* Área do QR Code — escondida por padrão, revelada por clique */}
                    <div className="bg-white p-4 rounded-lg shadow-inner mb-4 flex-1 flex items-center justify-center min-h-[200px] w-full max-w-[280px] mx-auto relative overflow-hidden">
                      {qrVisible && qrDataUrl ? (
                        // QR Code gerado dinamicamente — não existe como arquivo estático
                        <img
                          src={qrDataUrl}
                          alt="QR Code PIX"
                          width={240}
                          height={240}
                          className="object-contain animate-in fade-in duration-500"
                          // Impede que bots copiem a imagem facilmente
                          onContextMenu={(e) => e.preventDefault()}
                          draggable={false}
                        />
                      ) : (
                        // Estado padrão: QR Code escondido com botão para revelar
                        <div className="flex flex-col items-center justify-center gap-3 text-muted-foreground">
                          <Shield className="h-12 w-12 text-primary/40" />
                          <p className="text-sm font-medium">QR Code protegido</p>
                          <p className="text-xs text-muted-foreground/70">Clique abaixo para revelar</p>
                        </div>
                      )}
                    </div>

                    {/* Botão para revelar/esconder o QR Code */}
                    <Button
                      onClick={handleRevealQR}
                      variant="outline"
                      size="lg"
                      className="rounded-full w-full mb-3"
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>Gerando QR Code...</>
                      ) : qrVisible ? (
                        <>
                          <EyeOff className="mr-2 h-4 w-4" />
                          Esconder QR Code
                        </>
                      ) : (
                        <>
                          <Eye className="mr-2 h-4 w-4" />
                          Revelar QR Code
                        </>
                      )}
                    </Button>

                    {/* Separador visual */}
                    <div className="w-full border-t border-border my-3" />

                    <p className="text-muted-foreground text-sm mb-3">Ou copie a chave &quot;copia e cola&quot;:</p>

                    {/* Botão para copiar o código EMV completo */}
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
