// components/forms/DynamicForm.tsx
'use client';

import { useState, FormEvent } from 'react';
import { FormData, FormField } from '@/types/form';

interface DynamicFormProps {
  formData: FormData;
  onSubmit?: (data: any) => void;
}

export default function DynamicForm({ formData, onSubmit }: DynamicFormProps) {
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: FormField, value: any) => {
    if (field.type === 'checkbox' && field.name === 'services') {
      const currentValues = formValues[field.name] || [];
      if (currentValues.includes(field.value)) {
        setFormValues({
          ...formValues,
          [field.name]: currentValues.filter((v: string) => v !== field.value)
        });
      } else {
        setFormValues({
          ...formValues,
          [field.name]: [...currentValues, field.value]
        });
      }
    } else {
      setFormValues({
        ...formValues,
        [field.name]: value
      });
    }

    // Clear error when user starts typing
    if (errors[field.name]) {
      setErrors({
        ...errors,
        [field.name]: ''
      });
    }
  };

  const validateField = (field: FormField, value: any): string => {
    if (field.required && (!value || (typeof value === 'string' && !value.trim()))) {
      return `${field.label} is required`;
    }
    if (field.validation?.pattern && value) {
      try {
        const regex = new RegExp(field.validation.pattern);
        if (!regex.test(value)) {
          return field.validation.message || `Invalid ${field.label}`;
        }
      } catch (e) {
        console.error('Invalid regex pattern:', field.validation.pattern, e);
      }
    }
    return '';
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    formData.sections.forEach(section => {
      section.fields.forEach(field => {
        const value = formValues[field.name];
        const error = validateField(field, value);
        if (error) {
          newErrors[field.name] = error;
        }
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Form submitted:', formValues);
      setSubmitted(true);
      
      if (onSubmit) {
        onSubmit(formValues);
      }
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormValues({});
      }, 3000);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormValues({});
    setErrors({});
  };

  const renderField = (field: FormField) => {
    const value = formValues[field.name] || '';
    const error = errors[field.name];

    switch (field.type) {
      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map(option => (
              <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name={field.name}
                  value={option.value}
                  checked={formValues[field.name] === option.value}
                  onChange={(e) => handleChange(field, e.target.value)}
                  className="w-4 h-4 text-[#c9a84c] focus:ring-[#c9a84c]"
                />
                <span className="text-[#f4f6f8]">{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        if (field.name === 'services') {
          return (
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formValues[field.name]?.includes(field.value) || false}
                onChange={() => handleChange(field, field.value)}
                className="w-4 h-4 text-[#c9a84c] rounded focus:ring-[#c9a84c]"
              />
              <span className="text-[#f4f6f8]">{field.label}</span>
            </label>
          );
        }
        return (
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name={field.name}
              checked={!!formValues[field.name]}
              onChange={(e) => handleChange(field, e.target.checked)}
              className="w-4 h-4 text-[#c9a84c] rounded focus:ring-[#c9a84c]"
            />
            <span className="text-[#f4f6f8]">{field.label}</span>
          </label>
        );

      case 'select':
        return (
          <select
            name={field.name}
            value={value}
            onChange={(e) => handleChange(field, e.target.value)}
            className="w-full px-4 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-md text-[#f4f6f8] focus:border-[#c9a84c] focus:outline-none"
          >
            <option value="">Select...</option>
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'textarea':
        return (
          <textarea
            name={field.name}
            value={value}
            onChange={(e) => handleChange(field, e.target.value)}
            placeholder={field.placeholder}
            rows={field.rows || 4}
            className="w-full px-4 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-md text-[#f4f6f8] focus:border-[#c9a84c] focus:outline-none resize-y"
          />
        );

      default:
        return (
          <input
            type={field.type}
            name={field.name}
            value={value}
            onChange={(e) => handleChange(field, e.target.value)}
            placeholder={field.placeholder}
            className="w-full px-4 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded-md text-[#f4f6f8] focus:border-[#c9a84c] focus:outline-none"
          />
        );
    }
  };

  if (submitted) {
    return (
      <div className="bg-[rgba(39,174,96,0.1)] border border-[#27ae60] rounded-lg p-6 text-center">
        <div className="text-[#27ae60] text-xl mb-2">✓</div>
        <h3 className="text-white text-xl mb-2">Thank You!</h3>
        <p className="text-[#8898aa]">Your request has been submitted successfully. We'll get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} onReset={handleReset} className="space-y-8">
      {formData.sections.map((section, idx) => (
        <div key={idx} className="space-y-6 mb-[30px]">
          <h3 className="text-2xl font-['Bebas_Neue',sans-serif] text-[#eab308] font-extrabold mb-[30px] text-center tracking-wide">
            {section.title}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {section.fields.map((field) => (
              <div key={field.id} className={field.colSpan === 2 ? 'md:col-span-2' : ''}>
                <label className="block text-[#8898aa] text-sm mb-2">
                  {field.required && <span className="text-[#c9a84c] mr-1">*</span>}
                  {field.label}
                </label>
                {renderField(field)}
                {errors[field.name] && (
                  <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex gap-4 pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-[#c9a84c] text-[#0b1120] py-3 px-6 cursor-pointer rounded-md font-['Bebas_Neue',sans-serif] text-lg tracking-wider hover:bg-[#e8c97a] transition-all duration-300 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'SEND'}
        </button>
      </div>

      {formData.disclaimer && (
        <div className="mt-8 p-4 bg-[rgba(201,168,76,0.05)] border-l-4 border-[#c9a84c] rounded">
          <p className="text-[#8898aa] text-sm leading-relaxed">{formData.disclaimer}</p>
        </div>
      )}
    </form>
  );
}