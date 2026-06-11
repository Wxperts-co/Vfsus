// data/formsDetails.ts
import { FormData } from '@/types/form';

export const serviceRequestForm: FormData = {
  id: '1',
  slug: 'service-request',
  title: 'Service Request',
  trustImage: '/images/trust.gif',
  submitEndpoint: '/api/process-service-request',
  submitMethod: 'POST',
  disclaimer: `By submitting the service request form, you as customer hereby acknowledge, that payment for the service rendered will be paid in full to us the agency within 15 days of the date of invoice. If payment is not made, then you the customer acknowledge full responsibility for late fee(s), Interest(s), any and all legal, court(s) & attorney(s) fee(s). For nonpayment, we the Agency will have no alternative but to exercise whatever rights and remedies we the agency have under the law to enforce such payments including but not limited to institution of legal proceedings against you to recover the amount, together with interest and legal expenses`,
  
  sections: [
    {
      title: 'TYPE OF SERVICE NEEDED',
      fields: [
        {
          id: 'svctype1',
          name: 'svctype1',
          label: 'Security Type',
          type: 'radio',
          required: true,
          options: [
            { value: 'Armed', label: 'Armed' },
            { value: 'Unarmed', label: 'Unarmed' }
          ]
        },
        {
          id: 'svctype2',
          name: 'svctype2',
          label: 'Appearance Type',
          type: 'radio',
          required: true,
          options: [
            { value: 'Plain Clothed', label: 'Plain Clothed' },
            { value: 'Uniformed', label: 'Uniformed' }
          ]
        }
      ]
    },
    {
      title: 'SERVICES NEEDED',
      fields: [
        {
          id: 'svcdet01',
          name: 'services',
          label: 'Security Service',
          type: 'checkbox',
          value: 'Security Service'
        },
        {
          id: 'svcdet03',
          name: 'services',
          label: 'Fire Watch Service',
          type: 'checkbox',
          value: 'Fire Watch Service'
        },
        {
          id: 'svcdet05',
          name: 'services',
          label: 'Concierge',
          type: 'checkbox',
          value: 'Concierge'
        },
        {
          id: 'svcdet06',
          name: 'services',
          label: 'Courier Service',
          type: 'checkbox',
          value: 'Courier Service'
        },
        {
          id: 'svcdet07',
          name: 'services',
          label: 'Investigations',
          type: 'checkbox',
          value: 'Investigations'
        },
        {
          id: 'svcdet08',
          name: 'services',
          label: 'Executive/VIP Protection',
          type: 'checkbox',
          value: 'Executive/VIP Protection'
        },
        {
          id: 'svcdet09',
          name: 'services',
          label: 'Bodyguard',
          type: 'checkbox',
          value: 'Bodyguard'
        },
        {
          id: 'svcdet12',
          name: 'services',
          label: 'Others',
          type: 'checkbox',
          value: 'Others',
          hasOtherText: true
        }
      ]
    },
    {
      title: 'CUSTOMER INFORMATION',
      fields: [
        {
          id: 'requestor',
          name: 'requestor',
          label: 'Name & Title of Requestor',
          type: 'text',
          required: true,
          placeholder: 'Enter your name and title'
        },
        {
          id: 'company',
          name: 'company',
          label: 'Company',
          type: 'text',
          required: true,
          placeholder: 'Company name'
        },
        {
          id: 'contact',
          name: 'contact',
          label: 'Contact',
          type: 'text',
          required: true,
          placeholder: 'Contact number'
        },
        {
          id: 'address',
          name: 'address',
          label: 'Address',
          type: 'text',
          required: true,
          placeholder: 'Street address'
        },
        {
          id: 'city',
          name: 'city',
          label: 'City',
          type: 'text',
          required: true,
          placeholder: 'City'
        },
        {
          id: 'state',
          name: 'state',
          label: 'State',
          type: 'text',
          required: true,
          placeholder: 'State'
        },
        {
          id: 'zip',
          name: 'zip',
          label: 'Zip',
          type: 'text',
          required: true,
          placeholder: 'Zip code'
        },
        {
          id: 'phone',
          name: 'phone',
          label: 'Phone',
          type: 'tel',
          required: true,
          placeholder: '(000) 000-0000'
        },
        {
          id: 'fax',
          name: 'fax',
          label: 'Fax',
          type: 'tel',
          required: true,
          placeholder: 'Fax number'
        },
        {
          id: 'fromemail',
          name: 'fromemail',
          label: 'Email',
          type: 'email',
          required: true,
          placeholder: 'email@example.com',
          validation: {
            pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
            message: 'Please enter a valid email address'
          }
        }
      ]
    },
    {
      title: 'SERVICE DATES',
      fields: [
        {
          id: 'startdate',
          name: 'startdate',
          label: 'Start Date',
          type: 'date',
          required: true,
          placeholder: 'Select start date'
        },
        {
          id: 'enddate',
          name: 'enddate',
          label: 'End Date',
          type: 'date',
          required: true,
          placeholder: 'Select end date'
        }
      ]
    },
    {
      title: 'SERVICE LOCATION (IF DIFFERENT)',
      fields: [
        {
          id: 'svclocaddress',
          name: 'svclocaddress',
          label: 'Address',
          type: 'text',
          placeholder: 'Service location address'
        },
        {
          id: 'svcloccity',
          name: 'svcloccity',
          label: 'City',
          type: 'text',
          placeholder: 'Service location city'
        },
        {
          id: 'svclocstate',
          name: 'svclocstate',
          label: 'State',
          type: 'text',
          placeholder: 'Service location state'
        },
        {
          id: 'svcloczip',
          name: 'svcloczip',
          label: 'Zip',
          type: 'text',
          placeholder: 'Service location zip'
        },
        {
          id: 'job_site_duties',
          name: 'job_site_duties',
          label: 'Job Site Duties',
          type: 'textarea',
          rows: 4,
          placeholder: 'Describe the job site duties'
        },
        {
          id: 'guards-needed',
          name: 'guards-needed',
          label: 'Number of Guards Needed',
          type: 'select',
          options: [
            { value: '1', label: '1' },
            { value: '2', label: '2' },
            { value: '3', label: '3' },
            { value: '4', label: '4' },
            { value: '5', label: '5' },
            { value: '5 - 10', label: '5 - 10' },
            { value: '10 - 15', label: '10 - 15' },
            { value: '15 or More', label: '15 or More' }
          ]
        }
      ]
    },
    {
      title: 'ADDITIONAL COMMENTS',
      fields: [
        {
          id: 'addlcomm',
          name: 'addlcomm',
          label: 'Comments',
          type: 'textarea',
          rows: 5,
          placeholder: 'Any additional comments or requirements...'
        }
      ]
    }
  ]
};

export const contractingOpportunityForm: FormData = {
  id: '2',
  slug: 'contracting-opportunity',
  title: 'CONTRACTING OPPORTUNITY',
  trustImage: '/images/trust.gif',
  submitEndpoint: '/api/process-contract',
  submitMethod: 'POST',
  disclaimer: '',
  
  sections: [
    {
      title: 'GENERAL INFORMATION',
      fields: [
        {
          id: 'contactpreson',
          name: 'contactpreson',
          label: 'Contact Person',
          type: 'text',
          required: true,
          placeholder: 'Contact person name'
        },
        {
          id: 'dba',
          name: 'dba',
          label: 'DBA',
          type: 'text',
          required: true,
          placeholder: 'Doing Business As'
        },
        {
          id: 'company',
          name: 'company',
          label: 'Company',
          type: 'text',
          required: true,
          placeholder: 'Company name'
        },
        {
          id: 'moaddress',
          name: 'moaddress',
          label: 'Main Office Address',
          type: 'text',
          required: true,
          placeholder: 'Main office address'
        },
        {
          id: 'city',
          name: 'city',
          label: 'City',
          type: 'text',
          required: true,
          placeholder: 'City'
        },
        {
          id: 'state',
          name: 'state',
          label: 'State',
          type: 'text',
          required: true,
          placeholder: 'State'
        },
        {
          id: 'zip',
          name: 'zip',
          label: 'Zip',
          type: 'text',
          required: true,
          placeholder: 'Zip code'
        },
        {
          id: 'ophone',
          name: 'ophone',
          label: 'Office Phone',
          type: 'tel',
          required: true,
          placeholder: 'Office phone number'
        },
        {
          id: 'fax',
          name: 'fax',
          label: 'Fax',
          type: 'tel',
          placeholder: 'Fax number'
        },
        {
          id: 'fromemail',
          name: 'fromemail',
          label: 'Email',
          type: 'email',
          required: true,
          placeholder: 'Email address',
          validation: {
            pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
            message: 'Please enter a valid email address'
          }
        },
        {
          id: 'website',
          name: 'website',
          label: 'Website',
          type: 'text',
          required: true,
          placeholder: 'Company website'
        },
        {
          id: 'stservice',
          name: 'stservice',
          label: 'States where service is required',
          type: 'text',
          required: true,
          placeholder: 'States'
        },
        {
          id: 'coservice',
          name: 'coservice',
          label: 'Counties where service is required',
          type: 'text',
          required: true,
          placeholder: 'Counties'
        },
        {
          id: 'bcbackground',
          name: 'bcbackground',
          label: 'Brief company background',
          type: 'textarea',
          required: true,
          rows: 3,
          placeholder: 'Brief company background'
        },
        {
          id: 'bdpresident',
          name: 'bdpresident',
          label: 'Brief description of president',
          type: 'textarea',
          required: true,
          rows: 3,
          placeholder: 'Brief description of president'
        }
      ]
    },
    {
      title: 'Services that you provide (check all that apply)',
      fields: [
        {
          id: 'services1',
          name: 'services',
          label: 'Armed',
          type: 'checkbox',
          value: 'Armed'
        },
        {
          id: 'services2',
          name: 'services',
          label: 'Unarmed',
          type: 'checkbox',
          value: 'Unarmed'
        },
        {
          id: 'services3',
          name: 'services',
          label: 'Vehicle Patrol',
          type: 'checkbox',
          value: 'Vehicle Patrol'
        },
        {
          id: 'orgtypetext',
          name: 'orgtypetext',
          label: 'Other Services',
          type: 'text',
          placeholder: 'Other services you provide'
        },
        {
          id: 'orgstruct',
          name: 'orgstruct',
          label: 'Organization structure (Corp., LLC, Sub S. Sole Proprietor, etc)',
          type: 'text',
          placeholder: 'Organization structure'
        },
        {
          id: 'fein',
          name: 'fein',
          label: 'F.E.I.N',
          type: 'text',
          placeholder: 'Federal Employer Identification Number'
        }
      ]
    },
    {
      title: 'LICENSE AND INSURANCE INFORMATION',
      fields: [
        {
          id: 'ssle',
          name: 'ssle',
          label: 'State Security License # and expiration date',
          type: 'text',
          placeholder: 'License number and expiration'
        },
        {
          id: 'inscarrier',
          name: 'inscarrier',
          label: 'Insurance Carrier',
          type: 'text',
          placeholder: 'Insurance carrier name'
        },
        {
          id: 'insagent',
          name: 'insagent',
          label: 'Insurance agent name',
          type: 'text',
          placeholder: 'Insurance agent name'
        },
        {
          id: 'insphone',
          name: 'insphone',
          label: 'Insurance agent phone',
          type: 'tel',
          placeholder: 'Insurance agent phone'
        },
        {
          id: 'comliab',
          name: 'comliab',
          label: 'Your commercial liability insurance $ limit',
          type: 'text',
          required: true,
          placeholder: 'Insurance limit amount'
        }
      ]
    },
    {
      title: 'REFERRALS',
      fields: [
        {
          id: 'contact',
          name: 'contact',
          label: 'Contact and name of your largest vendor',
          type: 'text',
          placeholder: 'Contact name'
        },
        {
          id: 'vendor',
          name: 'vendor',
          label: 'Vendor Name',
          type: 'text',
          placeholder: 'Vendor name'
        }
      ]
    },
    {
      title: 'CREDIT HISTORY',
      fields: [
        {
          id: 'creditscale',
          name: 'creditscale',
          label: 'Assess your credit',
          type: 'radio',
          options: [
            { value: 'Poor', label: 'Poor' },
            { value: 'Fair', label: 'Fair' },
            { value: 'Good', label: 'Good' },
            { value: 'Excellent', label: 'Excellent' }
          ]
        }
      ]
    },
    {
      title: 'BUSINESS PRACTICES',
      fields: [
        {
          id: 'voilation',
          name: 'voilation',
          label: 'Have there been any violations on your business license? If yes, explain',
          type: 'textarea',
          required: true,
          rows: 3,
          placeholder: 'Explain any violations'
        },
        {
          id: 'judgment',
          name: 'judgment',
          label: 'Have there been any judgments against your company? If yes, explain',
          type: 'textarea',
          required: true,
          rows: 3,
          placeholder: 'Explain any judgments'
        },
        {
          id: 'recruiting',
          name: 'recruiting',
          label: 'Describe your recruiting, screening, hiring, and training protocols for guards and supervisors',
          type: 'textarea',
          required: true,
          rows: 4,
          placeholder: 'Describe your protocols'
        },
        {
          id: 'payarmed',
          name: 'payarmed',
          label: 'Hourly rate for Armed Guards',
          type: 'text',
          required: true,
          placeholder: 'Rate for armed guards'
        },
        {
          id: 'payunarmed',
          name: 'payunarmed',
          label: 'Hourly rate for Unarmed Guards',
          type: 'text',
          required: true,
          placeholder: 'Rate for unarmed guards'
        },
        {
          id: 'expectarmed',
          name: 'expectarmed',
          label: 'Expected rate from VSF - Armed',
          type: 'text',
          required: true,
          placeholder: 'Expected rate for armed'
        },
        {
          id: 'expectunarmed',
          name: 'expectunarmed',
          label: 'Expected rate from VSF - Unarmed',
          type: 'text',
          required: true,
          placeholder: 'Expected rate for unarmed'
        },
        {
          id: 'manname',
          name: 'manname',
          label: 'Managers names/phone numbers',
          type: 'text',
          required: true,
          placeholder: 'Manager names and phone numbers'
        }
      ]
    },
    {
      title: 'ADDITIONAL COMMENTS',
      fields: [
        {
          id: 'addlcomm',
          name: 'addlcomm',
          label: 'Additional Comments',
          type: 'textarea',
          rows: 5,
          placeholder: 'Any additional comments...'
        }
      ]
    }
  ]
};

export const creditReferences = {
  title: 'Credit References',
  fields: [
    { name: 'refname', label: 'Name', type: 'text' },
    { name: 'refaddress', label: 'Address', type: 'text' },
    { name: 'refphone', label: 'Phone', type: 'tel' },
    { name: 'reffax', label: 'Fax', type: 'tel' }
  ]
};

export const formsList = [serviceRequestForm, contractingOpportunityForm];

export const getFormBySlug = (slug: string): FormData | undefined => {
  return formsList.find(form => form.slug === slug);
};