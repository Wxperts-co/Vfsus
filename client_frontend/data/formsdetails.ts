// data/formsDetails.ts
import { FormData } from '@/types/form';

export const serviceRequestForm: FormData = {
  id: '1',
  slug: 'service-request',
  title: 'SERVICE REQUEST — FOR EXISTING CLIENTS',
  trustImage: '/images/trust.gif',
  submitEndpoint: '/api/process-service-request',
  submitMethod: 'POST',
  disclaimer: `By submitting this Service Request Form, you, the customer, acknowledge and agree that payment for services rendered is due in full to the Agency within five (5) days from the date of invoice. If payment is not received when due, you acknowledge responsibility for any applicable late fees, interest, and reasonable legal, court, and attorney fees to the extent permitted by law.

In the event of nonpayment, the Agency reserves all rights and remedies available under applicable law to enforce payment, including, but not limited to, pursuing legal proceedings to recover the outstanding amount, together with any applicable interest and recoverable legal expenses.`,
  
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
            { value: 'Unarmed', label: 'Unarmed' },
            { value: 'Not Applicable', label: 'Not Applicable' }
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
          id: 'svcdet08',
          name: 'services',
          label: 'VIP Executive Protection',
          type: 'checkbox',
          value: 'VIP Executive Protection'
        },
        {
          id: 'svcdet06',
          name: 'services',
          label: 'Medical & Legal Courier & Delivery Services',
          type: 'checkbox',
          value: 'Medical & Legal Courier & Delivery Services'
        },
        {
          id: 'svcdet12',
          name: 'services',
          label: 'Other — Please Specify',
          type: 'checkbox',
          value: 'Other — Please Specify',
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
          label: 'Service Duties and Requirements',
          type: 'textarea',
          rows: 4,
          placeholder: 'Describe service duties and requirements'
        },
        {
          id: 'guards-needed',
          name: 'guards-needed',
          label: 'Number of Personnel Needed',
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
  title: 'CONTRACTING OPPORTUNITIES',
  trustImage: '/images/trust.gif',
  submitEndpoint: '/api/process-contract',
  submitMethod: 'POST',
  description: 'Virginia Surveillance Force, Inc. works with qualified and licensed security professionals and service providers to support client requirements throughout our service areas. If your company is interested in partnering with VSF, please complete the form below with your company information, service capabilities, coverage areas, and requested rates for consideration.',
  disclaimer: `ACKNOWLEDGEMENT

• The information provided to Virginia Surveillance Force, Inc. is truthful and accurate to the best of my knowledge.
• I understand that submitting this form does not create a contract, subcontractor relationship, employment relationship, or obligation for Virginia Surveillance Force, Inc. to enter into an agreement.
• I understand that any subcontracting arrangement with Virginia Surveillance Force, Inc. is subject to a separate written agreement signed by the appropriate parties.
• I authorize Virginia Surveillance Force, Inc. to verify the information provided in this form and to conduct reasonable business, licensing, insurance, and background inquiries as permitted by applicable law.
• I understand that Virginia Surveillance Force, Inc. may request additional documentation or information before considering or approving a subcontracting relationship.
• I understand that submission of this form does not guarantee approval, assignment of work, or payment by Virginia Surveillance Force, Inc.
• I understand that Virginia Surveillance Force, Inc. will maintain the confidentiality of the information provided, subject to applicable law and legitimate business requirements.`,
  
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
          label: 'States where you are licensed to provide services',
          type: 'text',
          required: true,
          placeholder: 'States where you are licensed to provide services'
        },
        {
          id: 'coservice',
          name: 'coservice',
          label: 'Counties or areas you serve',
          type: 'text',
          required: true,
          placeholder: 'Counties or areas you serve'
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
          id: 'expectarmed',
          name: 'expectarmed',
          label: 'Hourly rate you are requesting from VSF for armed security',
          type: 'text',
          required: true,
          placeholder: 'Hourly rate for armed security'
        },
        {
          id: 'expectunarmed',
          name: 'expectunarmed',
          label: 'Hourly rate you are requesting from VSF for unarmed security',
          type: 'text',
          required: true,
          placeholder: 'Hourly rate for unarmed security'
        },
        {
          id: 'expectother',
          name: 'expectother',
          label: 'Rate you are requesting from VSF for other services',
          type: 'text',
          placeholder: 'Rate requested for other services'
        },
        {
          id: 'willnegotiate',
          name: 'willnegotiate',
          label: 'Are you willing to negotiate the requested rate from VSF?',
          type: 'radio',
          required: true,
          options: [
            { value: 'Yes', label: 'Yes' },
            { value: 'No', label: 'No' }
          ]
        },
        {
          id: 'manname',
          name: 'manname',
          label: 'Manager or Supervisor Name, Phone Number, and Email Address',
          type: 'text',
          required: true,
          placeholder: 'Manager or supervisor name, phone number, and email address'
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

export const employmentApplicationForm: FormData = {
  id: '3',
  slug: 'employment-application',
  title: 'EMPLOYMENT APPLICATION',
  trustImage: '/images/trust.gif',
  submitEndpoint: '/api/process-employment-application',
  submitMethod: 'POST',
  description: 'Virginia Surveillance Force is An Equal Employment Opportunity Employer. Please complete all sections to be considered, even if a resume is submitted.',
  disclaimer: `By signing and submitting this application, you certify that all the information provided on this employment application and any resume or exhibit attached is true, correct, and complete.`,
  sections: [
    {
      title: 'APPLICATION DETAILS',
      fields: [
        {
          id: 'pos_armed',
          name: 'position',
          label: 'Armed',
          type: 'checkbox',
          value: 'Armed'
        },
        {
          id: 'pos_unarmed',
          name: 'position',
          label: 'Unarmed',
          type: 'checkbox',
          value: 'Unarmed'
        },
        {
          id: 'pos_front_desk_concierge',
          name: 'position',
          label: 'Front Desk & Concierge',
          type: 'checkbox',
          value: 'Front Desk & Concierge'
        },
        {
          id: 'pos_other',
          name: 'position',
          label: 'Other Position',
          type: 'checkbox',
          value: 'Other Position'
        }
      ]
    }
  ]
};

export const formsList = [serviceRequestForm, contractingOpportunityForm, employmentApplicationForm];

export const getFormBySlug = (slug: string): FormData | undefined => {
  if (slug === 'employment' || slug === 'employment-application') {
    return employmentApplicationForm;
  }
  return formsList.find(form => form.slug === slug);
};