
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift, QrCode, Copy } from 'lucide-react';
import Image from 'next/image';

export function GiftRegistrySection() {
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
            <Card className="shadow-lg bg-card rounded-2xl text-center h-full flex flex-col">
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
                    src="/images/imagem-lista-de-presentes.png"
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
            <Card className="shadow-lg bg-card rounded-2xl text-center h-full flex flex-col">
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
                            // IMPORTANTE: Substitua este link pelo seu QR Code PIX
                            src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Commons_QR_code.png"
                            alt="QR Code PIX"
                            width={180}
                            height={180}
                            className="object-contain"
                        />
                    </div>
                     <p className="text-muted-foreground text-sm mb-4">Ou use a chave aleatória:</p>
                    <Button variant="secondary" size="lg" className="rounded-full w-full mt-auto">
                        <Copy className="mr-2 h-4 w-4" />
                        Copiar Chave PIX
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
