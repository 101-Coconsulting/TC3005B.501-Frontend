export interface BaseInputProps {
    label?: string;
    name: string;
    placeholder?: string;
    value?: string;
    required?: boolean;
    error?: string;
    disabled?: boolean;
    pattern?: string;
    type?: InputTypes;
  }
  
export type InputTypes =
    | 'text'
    | 'email'
    | 'tel'
    | 'url'
    | 'password'
    | 'number'
    | 'date';

export const InputPatterns: Record<InputTypes, string | undefined> = {
    text: undefined,
    email: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
    tel: '^\\+?[0-9\\s-]{7,15}$',
    url: 'https?://.+',
    password: undefined,
    number: '^\\d+$',
    date: '^\\d{4}-\\d{2}-\\d{2}$',
};  