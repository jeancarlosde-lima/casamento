'use server';

import { z } from 'zod';

const RsvpSchema = z.object({
  name: z.string().trim().min(2, { message: 'Por favor, insira seu nome completo.' }).max(100, 'O nome não pode ter mais de 100 caracteres.'),
  message: z.string().trim().max(500, 'A mensagem não pode ter mais de 500 caracteres.').optional(),
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
  // Use `Object.fromEntries` for cleaner extraction and to avoid potential prototype pollution issues.
  const rawFormData = Object.fromEntries(formData.entries());
  
  const validatedFields = RsvpSchema.safeParse({
    name: rawFormData.name,
    message: rawFormData.message,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos inválidos. Falha ao enviar a confirmação.',
      success: false,
    };
  }

  const { name, message } = validatedFields.data;

  try {
    // In a real application, you would save this data to a database.
    // The data is now validated and sanitized.
    console.log(`RSVP received from ${name}, Message: ${message || 'N/A'}`);
    
    return {
      message: "Obrigado por confirmar sua presença!",
      success: true,
    };
  } catch (error) {
    console.error('RSVP Submission Error:', error);
    return {
      message: 'Ocorreu um erro inesperado no servidor. Por favor, tente novamente.',
      success: false,
    };
  }
}
