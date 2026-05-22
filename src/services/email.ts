import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

emailjs.init(PUBLIC_KEY);

export interface ContactEmailParams {
  from_name: string;
  from_email: string;
  message: string;
  to_name?: string;
}

export function sendContactEmail(params: ContactEmailParams) {
  return emailjs.send(SERVICE_ID, TEMPLATE_ID, { ...params });
}

export function sendNewsletterEmail(email: string) {
  return emailjs.send(SERVICE_ID, TEMPLATE_ID, { email, to_name: 'Vortex Cubes' });
}
