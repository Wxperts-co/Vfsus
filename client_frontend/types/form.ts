// types/form.ts
export interface FormField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date' | 'file';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  validation?: {
    pattern?: string;
    message?: string;
  };
  colSpan?: number;
  rows?: number;
  value?: string;
  hasOtherText?: boolean;
}

export interface FormSection {
  title: string;
  subtitle?: string;
  fields: FormField[];
}

export interface FormData {
  id: string;
  slug: string;
  title?: string;
  description?: string;
  sections: FormSection[];
  submitEndpoint: string;
  submitMethod?: 'POST' | 'PUT';
  disclaimer?: string;
  trustImage?: string;
}