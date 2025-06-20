'use server';

import { z } from 'zod';

const RsvpSchema = z.object({
  name: z.string().min(2, { message: 'Por favor, insira seu nome completo.' }),
  message: z.string().max(500, 'A mensagem não pode ter mais de 500 caracteres.').optional(),
});

export type RsvpState = {
  message?: string | null;
  errors?: {
    name?: string[];
    message?: string[];
  };
  success: boolean;
};

export async function submitRsvp(
  prevState: RsvpState,
  formData: FormData
): Promise<RsvpState> {
  const validatedFields = RsvpSchema.safeParse({
    name: formData.get('name'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos faltando. Falha ao enviar a confirmação.',
      success: false,
    };
  }

  const { name, message } = validatedFields.data;

  try {
    // In a real application, you would save this data to a database.
    console.log(`RSVP received from ${name}, Message: ${message}`);
    
    return {
      message: "Obrigado por confirmar sua presença!",
      success: true,
    };
  } catch (error) {
    console.error('RSVP Submission Error:', error);
    return {
      message: 'Ocorreu um erro inesperado. Por favor, tente novamente.',
      success: false,
    };
  }
}
