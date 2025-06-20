
'use server';

import { z } from 'zod';

const RsvpSchema = z.object({
  name: z.string().min(2, { message: 'Please enter your full name.' }),
  attending: z.enum(['yes', 'no'], {
    required_error: 'Please let us know if you can make it.',
  }),
});

export type RsvpState = {
  message?: string | null;
  errors?: {
    name?: string[];
    attending?: string[];
  };
  success: boolean;
};

export async function submitRsvp(
  prevState: RsvpState,
  formData: FormData
): Promise<RsvpState> {
  const validatedFields = RsvpSchema.safeParse({
    name: formData.get('name'),
    attending: formData.get('attending'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Submit RSVP.',
      success: false,
    };
  }

  const { name, attending } = validatedFields.data;

  try {
    // In a real application, you would save this data to a database.
    // For example: await db.rsvp.create({ data: { name, attending } });
    console.log(`RSVP received from ${name}, Attending: ${attending}`);
    
    return {
      message: "Thank you for your response! We can't wait to celebrate with you.",
      success: true,
    };
  } catch (error) {
    console.error('RSVP Submission Error:', error);
    return {
      message: 'An unexpected error occurred. Please try again.',
      success: false,
    };
  }
}
