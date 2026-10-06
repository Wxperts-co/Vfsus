'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, 
  Upload, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Paperclip, 
  ShieldCheck, 
  UserCheck, 
  Briefcase, 
  GraduationCap, 
  FileCheck, 
  Clock, 
  FileBadge 
} from 'lucide-react';

interface CollegeRow {
  school: string;
  major: string;
  credits: string;
  degree: string;
  yearsCompleted: string;
}

interface LicenseRow {
  description: string;
  issuedBy: string;
  idNum: string;
  expirationDate: string;
}

interface WorkHistoryRow {
  company: string;
  address: string;
  phone: string;
  website: string;
  supervisor: string;
  startDate: string;
  endDate: string;
  supervisorEmail: string;
  supervisorPhone: string;
  reasonForLeaving: string;
  jobTitle: string;
  jobDuties: string;
}

interface ReferenceRow {
  name: string;
  phone: string;
  address: string;
  yearsKnown: string;
  email: string;
}

export default function EmploymentApplicationForm() {
  // Application / Position State
  const [appDate, setAppDate] = useState(new Date().toISOString().split('T')[0]);
  const [desiredRate, setDesiredRate] = useState('');
  const [positions, setPositions] = useState<string[]>([]);
  const [otherPosition, setOtherPosition] = useState('');
  const [statusDesired, setStatusDesired] = useState<string[]>([]);
  const [shifts, setShifts] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [otherLocation, setOtherLocation] = useState('');

  // Personal Information
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [homePhone, setHomePhone] = useState('');
  const [cellPhone, setCellPhone] = useState('');
  const [email, setEmail] = useState('');
  const [nicknames, setNicknames] = useState('');
  const [eligibleUSA, setEligibleUSA] = useState<'Yes' | 'No' | ''>('');
  const [hasHighSchoolDiploma, setHasHighSchoolDiploma] = useState<'Yes' | 'No' | ''>('');
  const [is18OrOlder, setIs18OrOlder] = useState<'Yes' | 'No' | ''>('');
  const [hasDriversLicense, setHasDriversLicense] = useState<'Yes' | 'No' | ''>('');
  const [driversLicenseNum, setDriversLicenseNum] = useState('');

  // High School
  const [hsSchoolName, setHsSchoolName] = useState('');
  const [hsWebsite, setHsWebsite] = useState('');
  const [hsAddress, setHsAddress] = useState('');
  const [hsGraduationDate, setHsGraduationDate] = useState('');
  const [hsCanProvideProof, setHsCanProvideProof] = useState<'Yes' | 'No' | ''>('');

  // College & Training
  const [collegeList, setCollegeList] = useState<CollegeRow[]>([
    { school: '', major: '', credits: '', degree: '', yearsCompleted: '' }
  ]);

  // Licenses & Certifications
  const [licenseList, setLicenseList] = useState<LicenseRow[]>([
    { description: '', issuedBy: '', idNum: '', expirationDate: '' }
  ]);

  // Questionnaire
  const [answers, setAnswers] = useState<Record<string, 'Yes' | 'No' | ''>>({
    q1_firearm: '',
    q3_military: '',
    q4_police_federal: '',
    q5_drug_testing: '',
    q6_field_experience: '',
    q9_conflict_interest: '',
    q10_currently_employed_security: '',
    q11_contact_employer: '',
    q12_driving_criminal_record: ''
  });

  // Work History (up to 3 employers)
  const [workHistoryList, setWorkHistoryList] = useState<WorkHistoryRow[]>([
    {
      company: '',
      address: '',
      phone: '',
      website: '',
      supervisor: '',
      startDate: '',
      endDate: '',
      supervisorEmail: '',
      supervisorPhone: '',
      reasonForLeaving: '',
      jobTitle: '',
      jobDuties: ''
    }
  ]);

  // References (3 references)
  const [references, setReferences] = useState<ReferenceRow[]>([
    { name: '', phone: '', address: '', yearsKnown: '', email: '' },
    { name: '', phone: '', address: '', yearsKnown: '', email: '' },
    { name: '', phone: '', address: '', yearsKnown: '', email: '' }
  ]);

  // Availability & Scheduling
  const [currentlyEmployed, setCurrentlyEmployed] = useState<'Yes' | 'No' | ''>('');
  const [currentEmploymentShifts, setCurrentEmploymentShifts] = useState('');
  const [vsfAvailability, setVsfAvailability] = useState('');
  const [travelDistance, setTravelDistance] = useState('');
  const [bestTimeToContact, setBestTimeToContact] = useState('');
  const [interviewDays, setInterviewDays] = useState('');

  // Document Attachments
  const [files, setFiles] = useState<{
    resume: File | null;
    driversLicense: File | null;
    guardLicense: File | null;
    certifications: File | null;
    otherDocs: File[];
  }>({
    resume: null,
    driversLicense: null,
    guardLicense: null,
    certifications: null,
    otherDocs: []
  });

  // Verification & Signature
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [applicantSignature, setApplicantSignature] = useState('');
  const [signatureDate, setSignatureDate] = useState(new Date().toISOString().split('T')[0]);

  // Captcha & Submission State
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captcha, setCaptcha] = useState({ question: '', token: '', loading: true });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');

  const fetchCaptcha = async () => {
    setCaptcha((c) => ({ ...c, loading: true }));
    try {
      const res = await fetch('/api/captcha');
      if (res.ok) {
        const data = await res.json();
        setCaptcha({ question: data.question, token: data.token, loading: false });
      } else {
        setCaptcha({ question: '', token: '', loading: false });
      }
      setCaptchaAnswer('');
    } catch {
      setCaptcha({ question: '', token: '', loading: false });
    }
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  // Helper handlers for multi-checkbox groups
  const handleCheckboxToggle = (
    value: string, 
    currentList: string[], 
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (currentList.includes(value)) {
      setter(currentList.filter(item => item !== value));
    } else {
      setter([...currentList, value]);
    }
  };

  const handleFileUpload = (
    key: 'resume' | 'driversLicense' | 'guardLicense' | 'certifications',
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFiles(prev => ({ ...prev, [key]: selectedFile }));
    }
  };

  const handleMultipleFilesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => ({ ...prev, otherDocs: [...prev.otherDocs, ...newFiles] }));
    }
  };

  const removeFile = (key: 'resume' | 'driversLicense' | 'guardLicense' | 'certifications') => {
    setFiles(prev => ({ ...prev, [key]: null }));
  };

  const removeOtherFile = (index: number) => {
    setFiles(prev => ({
      ...prev,
      otherDocs: prev.otherDocs.filter((_, i) => i !== index)
    }));
  };

  // Dynamic Row Helpers
  const addCollegeRow = () => {
    setCollegeList([...collegeList, { school: '', major: '', credits: '', degree: '', yearsCompleted: '' }]);
  };

  const removeCollegeRow = (index: number) => {
    setCollegeList(collegeList.filter((_, i) => i !== index));
  };

  const updateCollegeRow = (index: number, field: keyof CollegeRow, value: string) => {
    const updated = [...collegeList];
    updated[index][field] = value;
    setCollegeList(updated);
  };

  const addLicenseRow = () => {
    setLicenseList([...licenseList, { description: '', issuedBy: '', idNum: '', expirationDate: '' }]);
  };

  const removeLicenseRow = (index: number) => {
    setLicenseList(licenseList.filter((_, i) => i !== index));
  };

  const updateLicenseRow = (index: number, field: keyof LicenseRow, value: string) => {
    const updated = [...licenseList];
    updated[index][field] = value;
    setLicenseList(updated);
  };

  const addWorkHistoryRow = () => {
    if (workHistoryList.length < 3) {
      setWorkHistoryList([
        ...workHistoryList,
        {
          company: '',
          address: '',
          phone: '',
          website: '',
          supervisor: '',
          startDate: '',
          endDate: '',
          supervisorEmail: '',
          supervisorPhone: '',
          reasonForLeaving: '',
          jobTitle: '',
          jobDuties: ''
        }
      ]);
    }
  };

  const removeWorkHistoryRow = (index: number) => {
    setWorkHistoryList(workHistoryList.filter((_, i) => i !== index));
  };

  const updateWorkHistoryRow = (index: number, field: keyof WorkHistoryRow, value: string) => {
    const updated = [...workHistoryList];
    updated[index][field] = value;
    setWorkHistoryList(updated);
  };

  const updateReferenceRow = (index: number, field: keyof ReferenceRow, value: string) => {
    const updated = [...references];
    updated[index][field] = value;
    setReferences(updated);
  };

  // Form Validation
  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!firstName.trim()) errors.firstName = 'First name is required.';
    if (!lastName.trim()) errors.lastName = 'Last name is required.';
    if (!email.trim()) errors.email = 'Email address is required.';
    else if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Please enter a valid email address.';
    if (!cellPhone.trim() && !homePhone.trim()) errors.phone = 'At least one contact phone number is required.';
    
    if (positions.length === 0 && !otherPosition.trim()) {
      errors.positions = 'Please select at least one position applied for.';
    }

    if (!agreedToTerms) {
      errors.agreedToTerms = 'You must review and agree to the acknowledgment statement.';
    }

    if (!applicantSignature.trim()) {
      errors.applicantSignature = 'Your electronic signature is required.';
    }

    if (!captchaAnswer.trim()) {
      errors.captchaAnswer = 'Please complete the security question.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateForm()) {
      const firstErrorKey = Object.keys(formErrors)[0];
      const el = document.getElementById(firstErrorKey);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);

    try {
      const payloadData = {
        appDate,
        desiredRate,
        positions,
        otherPosition,
        statusDesired,
        shifts,
        locations,
        otherLocation,
        firstName,
        middleName,
        lastName,
        address,
        city,
        state,
        zip,
        homePhone,
        cellPhone,
        email,
        nicknames,
        eligibleUSA,
        hasHighSchoolDiploma,
        is18OrOlder,
        hasDriversLicense,
        driversLicenseNum,
        highSchool: {
          schoolName: hsSchoolName,
          website: hsWebsite,
          address: hsAddress,
          graduationDate: hsGraduationDate,
          canProvideProof: hsCanProvideProof
        },
        collegeEducation: collegeList.filter(c => c.school || c.degree),
        licensesAndCertificates: licenseList.filter(l => l.description || l.idNum),
        questionnaire: answers,
        workHistory: workHistoryList.filter(w => w.company || w.jobTitle),
        references: references.filter(r => r.name || r.phone),
        availability: {
          currentlyEmployed,
          currentEmploymentShifts,
          vsfAvailability,
          travelDistance,
          bestTimeToContact,
          interviewDays
        },
        agreedToTerms,
        applicantSignature,
        signatureDate,
        captchaAnswer,
        captchaToken: captcha.token
      };

      const formData = new FormData();
      formData.append('data', JSON.stringify(payloadData));
      formData.append('captchaAnswer', captchaAnswer);
      formData.append('captchaToken', captcha.token);

      if (files.resume) formData.append('resume', files.resume);
      if (files.driversLicense) formData.append('driversLicense', files.driversLicense);
      if (files.guardLicense) formData.append('guardLicense', files.guardLicense);
      if (files.certifications) formData.append('certifications', files.certifications);
      
      files.otherDocs.forEach((docFile, idx) => {
        formData.append(`otherDocs_${idx}`, docFile);
      });

      const response = await fetch('/api/process-employment-application', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (!response.ok) {
        fetchCaptcha();
        if (result.issues?.captchaAnswer) {
          setFormErrors(prev => ({ ...prev, captchaAnswer: result.issues.captchaAnswer[0] }));
        }
        throw new Error(result.error || 'Failed to submit application.');
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Submission error:', err);
      setSubmitError(err.message || 'An error occurred during submission. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-[#131e35] border border-[rgba(201,168,76,0.3)] rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto shadow-2xl">
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-400" />
        </div>
        <h2 className="text-3xl md:text-4xl font-['Bebas_Neue',sans-serif] tracking-wider text-[#eab308] mb-3">
          Application Submitted Successfully
        </h2>
        <p className="text-[#f4f6f8] text-lg font-medium mb-3">
          Thank you, <span className="text-[#e8c97a]">{firstName} {lastName}</span>!
        </p>
        <p className="text-[#8898aa] text-sm md:text-base leading-relaxed mb-8 max-w-xl mx-auto">
          Your Employment Application and attached documents have been received by the Virginia Surveillance Force recruiting team. 
          A confirmation email has been sent to <span className="text-[#f4f6f8] font-semibold">{email}</span>. 
          We will review your credentials and reach out if you match our current openings.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/"
            className="px-8 py-3.5 bg-[#eab308] hover:bg-[#e8c97a] text-[#0b1120] font-['Bebas_Neue',sans-serif] text-lg tracking-wider rounded-lg transition-all shadow-lg"
          >
            Return to Homepage
          </a>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3.5 bg-[#1a2845] hover:bg-[#223358] border border-[rgba(201,168,76,0.3)] text-[#f4f6f8] font-['Bebas_Neue',sans-serif] text-lg tracking-wider rounded-lg transition-all"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Header Banner */}
      <div className="bg-[#131e35]/90 border border-[rgba(201,168,76,0.2)] rounded-xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[rgba(201,168,76,0.04)] rounded-full -mr-10 -mt-10 pointer-events-none" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[rgba(201,168,76,0.15)] pb-5 mb-5">
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-['Bebas_Neue',sans-serif] tracking-wider text-[#eab308] flex items-center justify-center md:justify-start gap-2.5">
              <ShieldCheck className="w-7 h-7 text-[#eab308]" />
              Virginia Surveillance Force, Inc.
            </h2>
            <p className="text-xs text-[#8898aa] tracking-widest uppercase mt-1">
              DCJS# 11-2371 &bull; SAB200504 &bull; MDSP# 106-3249 &bull; (800) 786-0395 &bull; info@vsfus.com
            </p>
          </div>
          <div className="shrink-0 bg-[#0b1120] px-4 py-2 rounded-lg border border-[rgba(201,168,76,0.2)] text-center">
            <span className="text-[11px] font-bold tracking-widest text-[#e8c97a] uppercase block">
              Official Application
            </span>
            <span className="text-xs text-[#8898aa]">7544 Diplomat Dr #101, Manassas, VA</span>
          </div>
        </div>

        <div className="bg-[#0b1120]/80 p-4 rounded-lg border-l-4 border-[#eab308] text-xs md:text-sm text-[#f4f6f8] leading-relaxed">
          <p className="font-bold text-[#e8c97a] uppercase tracking-wide mb-1">
            Equal Employment Opportunity Employer
          </p>
          <p className="text-[#8898aa]">
            Please complete all sections to be considered, <strong className="text-[#f4f6f8]">even if a resume is submitted</strong>. 
            All documents you upload will be securely attached directly to your applicant record.
          </p>
        </div>
      </div>

      {submitError && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center gap-3 text-red-400 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      {/* SECTION 1: POSITION & APPLICATION DETAILS */}
      <section className="bg-[#131e35]/60 border border-[rgba(201,168,76,0.15)] rounded-xl p-6 md:p-8 space-y-6">
        <div className="border-b border-[rgba(201,168,76,0.15)] pb-3 flex items-center gap-3">
          <Briefcase className="w-5 h-5 text-[#eab308]" />
          <h3 className="text-xl md:text-2xl font-['Bebas_Neue',sans-serif] text-[#eab308] tracking-wider">
            1. Position & Schedule Desired
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-[#8898aa] uppercase tracking-wider mb-2">
              <span className="text-[#eab308]">*</span> Date of Application
            </label>
            <input
              type="date"
              value={appDate}
              onChange={(e) => setAppDate(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#0b1120] border border-[rgba(201,168,76,0.2)] rounded-lg text-[#f4f6f8] focus:border-[#eab308] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#8898aa] uppercase tracking-wider mb-2">
              Desired Hourly Rate ($ / Hour)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-[#eab308] font-bold">$</span>
              <input
                type="text"
                placeholder="e.g. 20.00"
                value={desiredRate}
                onChange={(e) => setDesiredRate(e.target.value)}
                className="w-full pl-8 pr-4 py-2.5 bg-[#0b1120] border border-[rgba(201,168,76,0.2)] rounded-lg text-[#f4f6f8] focus:border-[#eab308] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Position Applied For */}
        <div>
          <label className="block text-xs font-semibold text-[#8898aa] uppercase tracking-wider mb-2.5">
            <span className="text-[#eab308]">*</span> Position Applied For (Check all that apply)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {['Armed', 'Unarmed', 'Front Desk & Concierge', 'Other Position'].map((pos) => (
              <label
                key={pos}
                className={`flex items-center gap-2.5 p-3 rounded-lg border cursor-pointer transition-all ${
                  positions.includes(pos)
                    ? 'bg-[#eab308]/15 border-[#eab308] text-white font-semibold'
                    : 'bg-[#0b1120] border-[rgba(201,168,76,0.2)] text-[#8898aa] hover:border-[#eab308]/50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={positions.includes(pos)}
                  onChange={() => handleCheckboxToggle(pos, positions, setPositions)}
                  className="w-4 h-4 text-[#eab308] rounded focus:ring-0"
                />
                <span className="text-sm">{pos}</span>
              </label>
            ))}
          </div>
          {positions.includes('Other Position') && (
            <div className="mt-3">
              <input
                type="text"
                placeholder="Specify other position applied for..."
                value={otherPosition}
                onChange={(e) => setOtherPosition(e.target.value)}
                className="w-full p-2.5 bg-[#0b1120] border border-[rgba(201,168,76,0.2)] rounded-lg text-sm text-[#f4f6f8] focus:border-[#eab308] outline-none"
              />
            </div>
          )}
          {formErrors.positions && (
            <p className="text-red-400 text-xs mt-1.5">{formErrors.positions}</p>
          )}
        </div>

        {/* Status Desired */}
        <div>
          <label className="block text-xs font-semibold text-[#8898aa] uppercase tracking-wider mb-2.5">
            Status Desired
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {['Full-Time', 'Part-Time', 'On-Call Floater'].map((st) => (
              <label
                key={st}
                className={`flex items-center gap-2.5 p-3 rounded-lg border cursor-pointer transition-all ${
                  statusDesired.includes(st)
                    ? 'bg-[#eab308]/15 border-[#eab308] text-white font-semibold'
                    : 'bg-[#0b1120] border-[rgba(201,168,76,0.2)] text-[#8898aa] hover:border-[#eab308]/50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={statusDesired.includes(st)}
                  onChange={() => handleCheckboxToggle(st, statusDesired, setStatusDesired)}
                  className="w-4 h-4 text-[#eab308] rounded focus:ring-0"
                />
                <span className="text-sm">{st}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Shifts */}
        <div>
          <label className="block text-xs font-semibold text-[#8898aa] uppercase tracking-wider mb-2.5">
            Shifts
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {['Day', 'Evening', 'Overnight', 'Any Shift'].map((sh) => (
              <label
                key={sh}
                className={`flex items-center gap-2.5 p-3 rounded-lg border cursor-pointer transition-all ${
                  shifts.includes(sh)
                    ? 'bg-[#eab308]/15 border-[#eab308] text-white font-semibold'
                    : 'bg-[#0b1120] border-[rgba(201,168,76,0.2)] text-[#8898aa] hover:border-[#eab308]/50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={shifts.includes(sh)}
                  onChange={() => handleCheckboxToggle(sh, shifts, setShifts)}
                  className="w-4 h-4 text-[#eab308] rounded focus:ring-0"
                />
                <span className="text-sm">{sh}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Locations */}
        <div>
          <label className="block text-xs font-semibold text-[#8898aa] uppercase tracking-wider mb-2.5">
            Location / Jurisdiction
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
            {['Virginia', 'Washington DC', 'Maryland'].map((loc) => (
              <label
                key={loc}
                className={`flex items-center gap-2.5 p-3 rounded-lg border cursor-pointer transition-all ${
                  locations.includes(loc)
                    ? 'bg-[#eab308]/15 border-[#eab308] text-white font-semibold'
                    : 'bg-[#0b1120] border-[rgba(201,168,76,0.2)] text-[#8898aa] hover:border-[#eab308]/50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={locations.includes(loc)}
                  onChange={() => handleCheckboxToggle(loc, locations, setLocations)}
                  className="w-4 h-4 text-[#eab308] rounded focus:ring-0"
                />
                <span className="text-sm">{loc}</span>
              </label>
            ))}
            <div>
              <input
                type="text"
                placeholder="Other specific City / County..."
                value={otherLocation}
                onChange={(e) => setOtherLocation(e.target.value)}
                className="w-full p-3 bg-[#0b1120] border border-[rgba(201,168,76,0.2)] rounded-lg text-sm text-[#f4f6f8] focus:border-[#eab308] outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: PERSONAL INFORMATION */}
      <section className="bg-[#131e35]/60 border border-[rgba(201,168,76,0.15)] rounded-xl p-6 md:p-8 space-y-6">
        <div className="border-b border-[rgba(201,168,76,0.15)] pb-3 flex items-center gap-3">
          <UserCheck className="w-5 h-5 text-[#eab308]" />
          <h3 className="text-xl md:text-2xl font-['Bebas_Neue',sans-serif] text-[#eab308] tracking-wider">
            2. Personal Information
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold text-[#8898aa] uppercase tracking-wider mb-2">
              <span className="text-[#eab308]">*</span> First Name
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`w-full px-4 py-2.5 bg-[#0b1120] border rounded-lg text-[#f4f6f8] focus:border-[#eab308] outline-none ${
                formErrors.firstName ? 'border-red-500' : 'border-[rgba(201,168,76,0.2)]'
              }`}
            />
            {formErrors.firstName && <p className="text-red-400 text-xs mt-1">{formErrors.firstName}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#8898aa] uppercase tracking-wider mb-2">
              Middle Name
            </label>
            <input
              type="text"
              placeholder="Middle Name"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#0b1120] border border-[rgba(201,168,76,0.2)] rounded-lg text-[#f4f6f8] focus:border-[#eab308] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#8898aa] uppercase tracking-wider mb-2">
              <span className="text-[#eab308]">*</span> Last Name
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`w-full px-4 py-2.5 bg-[#0b1120] border rounded-lg text-[#f4f6f8] focus:border-[#eab308] outline-none ${
                formErrors.lastName ? 'border-red-500' : 'border-[rgba(201,168,76,0.2)]'
              }`}
            />
            {formErrors.lastName && <p className="text-red-400 text-xs mt-1">{formErrors.lastName}</p>}
          </div>
        </div>

        {/* Address */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-[#8898aa] uppercase tracking-wider mb-2">
              Street Address
            </label>
            <input
              type="text"
              placeholder="123 Main St"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#0b1120] border border-[rgba(201,168,76,0.2)] rounded-lg text-[#f4f6f8] focus:border-[#eab308] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#8898aa] uppercase tracking-wider mb-2">
              City
            </label>
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#0b1120] border border-[rgba(201,168,76,0.2)] rounded-lg text-[#f4f6f8] focus:border-[#eab308] outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-[#8898aa] uppercase tracking-wider mb-2">
                State
              </label>
              <input
                type="text"
                placeholder="VA"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#0b1120] border border-[rgba(201,168,76,0.2)] rounded-lg text-[#f4f6f8] focus:border-[#eab308] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#8898aa] uppercase tracking-wider mb-2">
                Zip
              </label>
              <input
                type="text"
                placeholder="Zip"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#0b1120] border border-[rgba(201,168,76,0.2)] rounded-lg text-[#f4f6f8] focus:border-[#eab308] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Contact Numbers & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold text-[#8898aa] uppercase tracking-wider mb-2">
              Home Phone
            </label>
            <input
              type="tel"
              placeholder="(000) 000-0000"
              value={homePhone}
              onChange={(e) => setHomePhone(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#0b1120] border border-[rgba(201,168,76,0.2)] rounded-lg text-[#f4f6f8] focus:border-[#eab308] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#8898aa] uppercase tracking-wider mb-2">
              <span className="text-[#eab308]">*</span> Cell Phone
            </label>
            <input
              type="tel"
              id="cellPhone"
              placeholder="(000) 000-0000"
              value={cellPhone}
              onChange={(e) => setCellPhone(e.target.value)}
              className={`w-full px-4 py-2.5 bg-[#0b1120] border rounded-lg text-[#f4f6f8] focus:border-[#eab308] outline-none ${
                formErrors.phone ? 'border-red-500' : 'border-[rgba(201,168,76,0.2)]'
              }`}
            />
            {formErrors.phone && <p className="text-red-400 text-xs mt-1">{formErrors.phone}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#8898aa] uppercase tracking-wider mb-2">
              <span className="text-[#eab308]">*</span> Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="applicant@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2.5 bg-[#0b1120] border rounded-lg text-[#f4f6f8] focus:border-[#eab308] outline-none ${
                formErrors.email ? 'border-red-500' : 'border-[rgba(201,168,76,0.2)]'
              }`}
            />
            {formErrors.email && <p className="text-red-400 text-xs mt-1">{formErrors.email}</p>}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#8898aa] uppercase tracking-wider mb-2">
            Nick Names / Other Names known by
          </label>
          <input
            type="text"
            placeholder="Any other legal or alias names..."
            value={nicknames}
            onChange={(e) => setNicknames(e.target.value)}
            className="w-full px-4 py-2.5 bg-[#0b1120] border border-[rgba(201,168,76,0.2)] rounded-lg text-[#f4f6f8] focus:border-[#eab308] outline-none"
          />
        </div>

        {/* Eligibility & ID Checks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="p-4 bg-[#0b1120] rounded-lg border border-[rgba(201,168,76,0.15)] space-y-3 flex flex-col justify-between">
            <div>
              <label className="block text-xs font-semibold text-[#f4f6f8] mb-2">
                Are you legally authorized to work in the United States?
              </label>
              <div className="flex gap-6 pt-1">
                {['Yes', 'No'].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer text-sm text-[#cbd5e1]">
                    <input
                      type="radio"
                      name="eligibleUSA"
                      value={opt}
                      checked={eligibleUSA === opt}
                      onChange={() => setEligibleUSA(opt as any)}
                      className="w-4 h-4 text-[#eab308]"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#0b1120] rounded-lg border border-[rgba(201,168,76,0.15)] space-y-3">
            <label className="block text-xs font-semibold text-[#f4f6f8]">
              Do you possess a valid driver’s license?
            </label>
            <div className="flex gap-6">
              {['Yes', 'No'].map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer text-sm text-[#cbd5e1]">
                  <input
                    type="radio"
                    name="hasDriversLicense"
                    value={opt}
                    checked={hasDriversLicense === opt}
                    onChange={() => setHasDriversLicense(opt as any)}
                    className="w-4 h-4 text-[#eab308]"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
            <div>
              <label className="block text-xs text-[#8898aa] mb-1">Driver’s License Number & State</label>
              <input
                type="text"
                placeholder="License #, State"
                value={driversLicenseNum}
                onChange={(e) => setDriversLicenseNum(e.target.value)}
                className="w-full px-3 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded text-sm text-[#f4f6f8] outline-none"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3.5 bg-[#0b1120] rounded-lg border border-[rgba(201,168,76,0.15)] flex items-center justify-between">
            <span className="text-xs text-[#cbd5e1] font-medium">Do you have a High School Diploma or GED?</span>
            <div className="flex gap-4">
              {['Yes', 'No'].map((opt) => (
                <label key={opt} className="flex items-center gap-1.5 cursor-pointer text-xs text-[#cbd5e1]">
                  <input
                    type="radio"
                    name="hasHighSchoolDiploma"
                    value={opt}
                    checked={hasHighSchoolDiploma === opt}
                    onChange={() => setHasHighSchoolDiploma(opt as any)}
                    className="w-3.5 h-3.5 text-[#eab308]"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="p-3.5 bg-[#0b1120] rounded-lg border border-[rgba(201,168,76,0.15)] flex items-center justify-between">
            <span className="text-xs text-[#cbd5e1] font-medium">Are you 18 years of age or older?</span>
            <div className="flex gap-4">
              {['Yes', 'No'].map((opt) => (
                <label key={opt} className="flex items-center gap-1.5 cursor-pointer text-xs text-[#cbd5e1]">
                  <input
                    type="radio"
                    name="is18OrOlder"
                    value={opt}
                    checked={is18OrOlder === opt}
                    onChange={() => setIs18OrOlder(opt as any)}
                    className="w-3.5 h-3.5 text-[#eab308]"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: EDUCATION & TRAINING */}
      <section className="bg-[#131e35]/60 border border-[rgba(201,168,76,0.15)] rounded-xl p-6 md:p-8 space-y-6">
        <div className="border-b border-[rgba(201,168,76,0.15)] pb-3 flex items-center gap-3">
          <GraduationCap className="w-5 h-5 text-[#eab308]" />
          <h3 className="text-xl md:text-2xl font-['Bebas_Neue',sans-serif] text-[#eab308] tracking-wider">
            3. High School & Higher Education
          </h3>
        </div>

        {/* High School Section */}
        <div className="p-5 bg-[#0b1120] rounded-lg border border-[rgba(201,168,76,0.15)] space-y-4">
          <h4 className="text-sm font-bold tracking-wider text-[#e8c97a] uppercase">High School Education</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#8898aa] mb-1">School Name</label>
              <input
                type="text"
                placeholder="High School Name"
                value={hsSchoolName}
                onChange={(e) => setHsSchoolName(e.target.value)}
                className="w-full px-3 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded text-sm text-[#f4f6f8] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-[#8898aa] mb-1">Website (Optional)</label>
              <input
                type="text"
                placeholder="www.school.edu"
                value={hsWebsite}
                onChange={(e) => setHsWebsite(e.target.value)}
                className="w-full px-3 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded text-sm text-[#f4f6f8] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-[#8898aa] mb-1">Address (City / State / Zip)</label>
              <input
                type="text"
                placeholder="City, State, Zip"
                value={hsAddress}
                onChange={(e) => setHsAddress(e.target.value)}
                className="w-full px-3 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded text-sm text-[#f4f6f8] outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-[#8898aa] mb-1">Graduation Date</label>
                <input
                  type="text"
                  placeholder="MM/YYYY"
                  value={hsGraduationDate}
                  onChange={(e) => setHsGraduationDate(e.target.value)}
                  className="w-full px-3 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded text-sm text-[#f4f6f8] outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-[#8898aa] mb-1">Can provide copy?</label>
                <div className="flex gap-3 pt-2">
                  {['Yes', 'No'].map((opt) => (
                    <label key={opt} className="flex items-center gap-1 cursor-pointer text-xs text-[#cbd5e1]">
                      <input
                        type="radio"
                        name="hsCanProvideProof"
                        value={opt}
                        checked={hsCanProvideProof === opt}
                        onChange={() => setHsCanProvideProof(opt as any)}
                        className="w-3.5 h-3.5 text-[#eab308]"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* College & Training Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-sm font-bold tracking-wider text-[#e8c97a] uppercase">
                College Education / Trainings / Qualifications
              </h4>
              <p className="text-xs text-[#8898aa]">
                List any education or training related to the position, including military training.
              </p>
            </div>
            <button
              type="button"
              onClick={addCollegeRow}
              className="px-3 py-1.5 bg-[#eab308]/20 hover:bg-[#eab308]/30 border border-[#eab308] text-[#eab308] text-xs font-semibold rounded transition-all"
            >
              + Add School
            </button>
          </div>

          {collegeList.map((row, idx) => (
            <div key={idx} className="p-4 bg-[#0b1120] rounded-lg border border-[rgba(201,168,76,0.15)] relative space-y-3">
              {collegeList.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeCollegeRow(idx)}
                  className="absolute top-3 right-3 text-red-400 hover:text-red-300 p-1"
                  title="Remove row"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
                <div className="md:col-span-2">
                  <label className="block text-[11px] text-[#8898aa] mb-1">College or Training School</label>
                  <input
                    type="text"
                    placeholder="Institution Name"
                    value={row.school}
                    onChange={(e) => updateCollegeRow(idx, 'school', e.target.value)}
                    className="w-full px-3 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded text-xs text-[#f4f6f8] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#8898aa] mb-1">Major / Subject</label>
                  <input
                    type="text"
                    placeholder="Criminal Justice, etc."
                    value={row.major}
                    onChange={(e) => updateCollegeRow(idx, 'major', e.target.value)}
                    className="w-full px-3 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded text-xs text-[#f4f6f8] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#8898aa] mb-1">Degree / Cert</label>
                  <input
                    type="text"
                    placeholder="BS, Associate, Cert"
                    value={row.degree}
                    onChange={(e) => updateCollegeRow(idx, 'degree', e.target.value)}
                    className="w-full px-3 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded text-xs text-[#f4f6f8] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#8898aa] mb-1">Years Completed</label>
                  <input
                    type="text"
                    placeholder="e.g. 4 Years"
                    value={row.yearsCompleted}
                    onChange={(e) => updateCollegeRow(idx, 'yearsCompleted', e.target.value)}
                    className="w-full px-3 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded text-xs text-[#f4f6f8] outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: LICENSES & REGISTRATIONS */}
      <section className="bg-[#131e35]/60 border border-[rgba(201,168,76,0.15)] rounded-xl p-6 md:p-8 space-y-6">
        <div className="border-b border-[rgba(201,168,76,0.15)] pb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileBadge className="w-5 h-5 text-[#eab308]" />
            <h3 className="text-xl md:text-2xl font-['Bebas_Neue',sans-serif] text-[#eab308] tracking-wider">
              4. Licenses & Registrations
            </h3>
          </div>
          <button
            type="button"
            onClick={addLicenseRow}
            className="px-3 py-1.5 bg-[#eab308]/20 hover:bg-[#eab308]/30 border border-[#eab308] text-[#eab308] text-xs font-semibold rounded transition-all"
          >
            + Add License
          </button>
        </div>

        <p className="text-xs text-[#8898aa]">
          Please list DCJS registrations, security licenses, concealed carry endorsements, CPR/First Aid, or any military certifications.
        </p>

        {licenseList.map((row, idx) => (
          <div key={idx} className="p-4 bg-[#0b1120] rounded-lg border border-[rgba(201,168,76,0.15)] relative space-y-3">
            {licenseList.length > 1 && (
              <button
                type="button"
                onClick={() => removeLicenseRow(idx)}
                className="absolute top-3 right-3 text-red-400 hover:text-red-300 p-1"
                title="Remove row"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] text-[#8898aa] mb-1">Description (e.g. DCJS #, Armed)</label>
                <input
                  type="text"
                  placeholder="Security License / Endorsement"
                  value={row.description}
                  onChange={(e) => updateLicenseRow(idx, 'description', e.target.value)}
                  className="w-full px-3 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded text-xs text-[#f4f6f8] outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#8898aa] mb-1">Issued By</label>
                <input
                  type="text"
                  placeholder="State DCJS / Authority"
                  value={row.issuedBy}
                  onChange={(e) => updateLicenseRow(idx, 'issuedBy', e.target.value)}
                  className="w-full px-3 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded text-xs text-[#f4f6f8] outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#8898aa] mb-1">ID / Registration #</label>
                <input
                  type="text"
                  placeholder="99-XXXXXX"
                  value={row.idNum}
                  onChange={(e) => updateLicenseRow(idx, 'idNum', e.target.value)}
                  className="w-full px-3 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded text-xs text-[#f4f6f8] outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#8898aa] mb-1">Expiration Date</label>
                <input
                  type="text"
                  placeholder="MM/YYYY or Date"
                  value={row.expirationDate}
                  onChange={(e) => updateLicenseRow(idx, 'expirationDate', e.target.value)}
                  className="w-full px-3 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded text-xs text-[#f4f6f8] outline-none"
                />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* SECTION 5: EMPLOYMENT QUESTIONNAIRE */}
      <section className="bg-[#131e35]/60 border border-[rgba(201,168,76,0.15)] rounded-xl p-6 md:p-8 space-y-6">
        <div className="border-b border-[rgba(201,168,76,0.15)] pb-3 flex items-center gap-3">
          <FileCheck className="w-5 h-5 text-[#eab308]" />
          <h3 className="text-xl md:text-2xl font-['Bebas_Neue',sans-serif] text-[#eab308] tracking-wider">
            5. Employment Questionnaire
          </h3>
        </div>

        <div className="divide-y divide-[rgba(201,168,76,0.1)]">
          {[
            { id: 'q1_firearm', q: 'Do you own or possess a firearm?' },
            { id: 'q3_military', q: 'Did you serve in the United States Military? (Army, Navy, Air Force or Marines)' },
            { id: 'q4_police_federal', q: 'Did you serve in the Police Department, Federal Agency or National Guard?' },
            { id: 'q5_drug_testing', q: 'Are you willing to submit to drug testing when required by applicable law, company policy, or the requirements of the position?' },
            { id: 'q6_field_experience', q: 'Do you have any experience in the field you are applying for?' },
            { id: 'q9_conflict_interest', q: 'Are you currently affiliated with any Security, staffing or an Investigation Firm (Conflict of Interest)?' },
            { id: 'q10_currently_employed_security', q: 'Are you currently employed with a security or Investigative firm?' },
            { id: 'q11_contact_employer', q: 'May we contact your present employer?' },
            { id: 'q12_driving_criminal_record', q: 'Can you provide a copy of your driving and a criminal background record?' },
          ].map((item, index) => (
            <div key={item.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#0b1120]/40 px-2 rounded transition-colors">
              <span className="text-xs sm:text-sm text-[#f4f6f8] flex items-start gap-2">
                <span className="text-[#eab308] font-bold shrink-0">{index + 1}.</span>
                {item.q}
              </span>
              <div className="flex gap-5 shrink-0 pl-5 sm:pl-0">
                {['Yes', 'No'].map((val) => (
                  <label key={val} className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-[#cbd5e1]">
                    <input
                      type="radio"
                      name={item.id}
                      value={val}
                      checked={answers[item.id] === val}
                      onChange={() => setAnswers({ ...answers, [item.id]: val as any })}
                      className="w-4 h-4 text-[#eab308] focus:ring-0"
                    />
                    <span>{val}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: WORK EXPERIENCE & HISTORY */}
      <section className="bg-[#131e35]/60 border border-[rgba(201,168,76,0.15)] rounded-xl p-6 md:p-8 space-y-6">
        <div className="border-b border-[rgba(201,168,76,0.15)] pb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-[#eab308]" />
            <h3 className="text-xl md:text-2xl font-['Bebas_Neue',sans-serif] text-[#eab308] tracking-wider">
              6. Work Experience & History (Past 5 Years)
            </h3>
          </div>
          {workHistoryList.length < 3 && (
            <button
              type="button"
              onClick={addWorkHistoryRow}
              className="px-3 py-1.5 bg-[#eab308]/20 hover:bg-[#eab308]/30 border border-[#eab308] text-[#eab308] text-xs font-semibold rounded transition-all"
            >
              + Add Employer
            </button>
          )}
        </div>

        <p className="text-xs text-[#8898aa]">
          Please start with your present or most recent employer and work back 5 years.
        </p>

        {workHistoryList.map((emp, idx) => (
          <div key={idx} className="p-5 bg-[#0b1120] rounded-lg border border-[rgba(201,168,76,0.15)] relative space-y-4">
            <div className="flex justify-between items-center border-b border-[rgba(201,168,76,0.1)] pb-2">
              <span className="text-xs font-bold text-[#e8c97a] uppercase tracking-wider">
                Employer {idx + 1} {idx === 0 ? '(Present / Most Recent)' : ''}
              </span>
              {workHistoryList.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeWorkHistoryRow(idx)}
                  className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove Employer
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] text-[#8898aa] mb-1">Company Name</label>
                <input
                  type="text"
                  placeholder="Company Name"
                  value={emp.company}
                  onChange={(e) => updateWorkHistoryRow(idx, 'company', e.target.value)}
                  className="w-full px-3 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded text-xs text-[#f4f6f8] outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#8898aa] mb-1">Address, City, State</label>
                <input
                  type="text"
                  placeholder="Address, City, State"
                  value={emp.address}
                  onChange={(e) => updateWorkHistoryRow(idx, 'address', e.target.value)}
                  className="w-full px-3 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded text-xs text-[#f4f6f8] outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#8898aa] mb-1">Business Phone</label>
                <input
                  type="tel"
                  placeholder="Phone"
                  value={emp.phone}
                  onChange={(e) => updateWorkHistoryRow(idx, 'phone', e.target.value)}
                  className="w-full px-3 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded text-xs text-[#f4f6f8] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] text-[#8898aa] mb-1">Job Title / Position</label>
                <input
                  type="text"
                  placeholder="Job Title"
                  value={emp.jobTitle}
                  onChange={(e) => updateWorkHistoryRow(idx, 'jobTitle', e.target.value)}
                  className="w-full px-3 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded text-xs text-[#f4f6f8] outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#8898aa] mb-1">Start Date (MM/YYYY)</label>
                <input
                  type="text"
                  placeholder="MM/YYYY"
                  value={emp.startDate}
                  onChange={(e) => updateWorkHistoryRow(idx, 'startDate', e.target.value)}
                  className="w-full px-3 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded text-xs text-[#f4f6f8] outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#8898aa] mb-1">End Date (or Present)</label>
                <input
                  type="text"
                  placeholder="MM/YYYY or Present"
                  value={emp.endDate}
                  onChange={(e) => updateWorkHistoryRow(idx, 'endDate', e.target.value)}
                  className="w-full px-3 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded text-xs text-[#f4f6f8] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] text-[#8898aa] mb-1">Supervisor Name</label>
                <input
                  type="text"
                  placeholder="Supervisor Name"
                  value={emp.supervisor}
                  onChange={(e) => updateWorkHistoryRow(idx, 'supervisor', e.target.value)}
                  className="w-full px-3 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded text-xs text-[#f4f6f8] outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#8898aa] mb-1">Supervisor Phone</label>
                <input
                  type="tel"
                  placeholder="Supervisor Phone"
                  value={emp.supervisorPhone}
                  onChange={(e) => updateWorkHistoryRow(idx, 'supervisorPhone', e.target.value)}
                  className="w-full px-3 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded text-xs text-[#f4f6f8] outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#8898aa] mb-1">Supervisor Email</label>
                <input
                  type="email"
                  placeholder="supervisor@example.com"
                  value={emp.supervisorEmail}
                  onChange={(e) => updateWorkHistoryRow(idx, 'supervisorEmail', e.target.value)}
                  className="w-full px-3 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded text-xs text-[#f4f6f8] outline-none"
                />
              </div>

              <div className="sm:col-span-2 md:col-span-3">
                <label className="block text-[11px] text-[#8898aa] mb-1">Reason for Leaving</label>
                <input
                  type="text"
                  placeholder="Reason for leaving"
                  value={emp.reasonForLeaving}
                  onChange={(e) => updateWorkHistoryRow(idx, 'reasonForLeaving', e.target.value)}
                  className="w-full px-3 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded text-xs text-[#f4f6f8] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-[#8898aa] mb-1">Job Duties & Responsibilities</label>
              <textarea
                rows={2}
                placeholder="Describe your security duties, site patrol, or customer service responsibilities..."
                value={emp.jobDuties}
                onChange={(e) => updateWorkHistoryRow(idx, 'jobDuties', e.target.value)}
                className="w-full px-3 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded text-xs text-[#f4f6f8] outline-none"
              />
            </div>
          </div>
        ))}
      </section>

      {/* SECTION 7: REFERENCES */}
      <section className="bg-[#131e35]/60 border border-[rgba(201,168,76,0.15)] rounded-xl p-6 md:p-8 space-y-6">
        <div className="border-b border-[rgba(201,168,76,0.15)] pb-3 flex items-center gap-3">
          <UserCheck className="w-5 h-5 text-[#eab308]" />
          <h3 className="text-xl md:text-2xl font-['Bebas_Neue',sans-serif] text-[#eab308] tracking-wider">
            7. Professional & Personal References
          </h3>
        </div>

        <p className="text-xs text-[#8898aa]">
          Please list the names of three persons other than former employers and relatives having knowledge of your character and ability.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {references.map((refItem, idx) => (
            <div key={idx} className="p-4 bg-[#0b1120] rounded-lg border border-[rgba(201,168,76,0.15)] space-y-3">
              <span className="text-xs font-bold text-[#e8c97a] uppercase tracking-wider block border-b border-[rgba(201,168,76,0.1)] pb-1.5">
                Reference {idx + 1}
              </span>
              <div>
                <label className="block text-[11px] text-[#8898aa] mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Complete Name"
                  value={refItem.name}
                  onChange={(e) => updateReferenceRow(idx, 'name', e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded text-xs text-[#f4f6f8] outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#8898aa] mb-1">Phone Number</label>
                <input
                  type="tel"
                  placeholder="Phone"
                  value={refItem.phone}
                  onChange={(e) => updateReferenceRow(idx, 'phone', e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded text-xs text-[#f4f6f8] outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#8898aa] mb-1">Address (City/State/Zip)</label>
                <input
                  type="text"
                  placeholder="City, State, Zip"
                  value={refItem.address}
                  onChange={(e) => updateReferenceRow(idx, 'address', e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded text-xs text-[#f4f6f8] outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-[#8898aa] mb-1">Years Known</label>
                  <input
                    type="text"
                    placeholder="e.g. 5 yrs"
                    value={refItem.yearsKnown}
                    onChange={(e) => updateReferenceRow(idx, 'yearsKnown', e.target.value)}
                    className="w-full px-3 py-1.5 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded text-xs text-[#f4f6f8] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#8898aa] mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    value={refItem.email}
                    onChange={(e) => updateReferenceRow(idx, 'email', e.target.value)}
                    className="w-full px-3 py-1.5 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded text-xs text-[#f4f6f8] outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 8: AVAILABILITY & INTERVIEW */}
      <section className="bg-[#131e35]/60 border border-[rgba(201,168,76,0.15)] rounded-xl p-6 md:p-8 space-y-6">
        <div className="border-b border-[rgba(201,168,76,0.15)] pb-3 flex items-center gap-3">
          <Clock className="w-5 h-5 text-[#eab308]" />
          <h3 className="text-xl md:text-2xl font-['Bebas_Neue',sans-serif] text-[#eab308] tracking-wider">
            8. Availability & Interview Details
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-[#0b1120] rounded-lg border border-[rgba(201,168,76,0.15)] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#f4f6f8] font-semibold">Are you employed now?</span>
              <div className="flex gap-4">
                {['Yes', 'No'].map((opt) => (
                  <label key={opt} className="flex items-center gap-1.5 cursor-pointer text-xs text-[#cbd5e1]">
                    <input
                      type="radio"
                      name="currentlyEmployed"
                      value={opt}
                      checked={currentlyEmployed === opt}
                      onChange={() => setCurrentlyEmployed(opt as any)}
                      className="w-3.5 h-3.5 text-[#eab308]"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-[11px] text-[#8898aa] mb-1">
                If yes, which shifts, days & time do you work with your current employer?
              </label>
              <textarea
                rows={2}
                placeholder="Current work schedule..."
                value={currentEmploymentShifts}
                onChange={(e) => setCurrentEmploymentShifts(e.target.value)}
                className="w-full px-3 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded text-xs text-[#f4f6f8] outline-none"
              />
            </div>
          </div>

          <div className="p-4 bg-[#0b1120] rounded-lg border border-[rgba(201,168,76,0.15)] space-y-3">
            <div>
              <label className="block text-xs text-[#f4f6f8] font-semibold mb-1">
                Which days and time are you available to work with Virginia Surveillance Force?
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Any day Monday - Sunday, 24/7 availability..."
                value={vsfAvailability}
                onChange={(e) => setVsfAvailability(e.target.value)}
                className="w-full px-3 py-2 bg-[#131e35] border border-[rgba(201,168,76,0.2)] rounded text-xs text-[#f4f6f8] outline-none"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs text-[#8898aa] mb-1 font-medium">
              How far are you willing to travel to perform duties?
            </label>
            <input
              type="text"
              placeholder="e.g. 25 miles / 45 minutes"
              value={travelDistance}
              onChange={(e) => setTravelDistance(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#0b1120] border border-[rgba(201,168,76,0.2)] rounded-lg text-xs text-[#f4f6f8] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-[#8898aa] mb-1 font-medium">
              Best time to contact you?
            </label>
            <input
              type="text"
              placeholder="e.g. Mornings after 10 AM"
              value={bestTimeToContact}
              onChange={(e) => setBestTimeToContact(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#0b1120] border border-[rgba(201,168,76,0.2)] rounded-lg text-xs text-[#f4f6f8] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-[#8898aa] mb-1 font-medium">
              Days available for an Interview?
            </label>
            <input
              type="text"
              placeholder="e.g. Tuesdays & Thursdays"
              value={interviewDays}
              onChange={(e) => setInterviewDays(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#0b1120] border border-[rgba(201,168,76,0.2)] rounded-lg text-xs text-[#f4f6f8] outline-none"
            />
          </div>
        </div>
      </section>

      {/* SECTION 9: DOCUMENT ATTACHMENTS (NEW FILE UPLOAD SECTION) */}
      <section className="bg-[#131e35]/90 border-2 border-[rgba(201,168,76,0.3)] rounded-xl p-6 md:p-8 space-y-6 shadow-xl">
        <div className="border-b border-[rgba(201,168,76,0.2)] pb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Upload className="w-6 h-6 text-[#eab308]" />
            <div>
              <h3 className="text-xl md:text-2xl font-['Bebas_Neue',sans-serif] text-[#eab308] tracking-wider">
                9. Attach Supporting Documents
              </h3>
              <p className="text-xs text-[#8898aa]">
                Attach your Driver’s License, Security Guard ID / License, certifications, and resume.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
          {/* Resume Upload */}
          <div className="p-4 bg-[#0b1120] border border-[rgba(201,168,76,0.2)] rounded-xl flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-[#e8c97a] uppercase tracking-wider">Resume / CV</span>
                <Paperclip className="w-4 h-4 text-[#8898aa]" />
              </div>
              <p className="text-[11px] text-[#8898aa]">PDF, DOC, DOCX up to 15MB</p>
            </div>

            {files.resume ? (
              <div className="flex items-center justify-between p-2.5 bg-[#1a2845] rounded-lg border border-[#eab308]/40">
                <div className="truncate pr-2">
                  <p className="text-xs text-white font-medium truncate">{files.resume.name}</p>
                  <p className="text-[10px] text-[#8898aa]">{(files.resume.size / 1024).toFixed(0)} KB</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile('resume')}
                  className="text-red-400 hover:text-red-300 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center p-4 border border-dashed border-[rgba(201,168,76,0.3)] hover:border-[#eab308] bg-[#131e35]/50 hover:bg-[#131e35] rounded-lg cursor-pointer transition-all">
                <Upload className="w-5 h-5 text-[#eab308] mb-1" />
                <span className="text-xs text-[#f4f6f8] font-medium">Click to Upload Resume</span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileUpload('resume', e)}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Driver's License */}
          <div className="p-4 bg-[#0b1120] border border-[rgba(201,168,76,0.2)] rounded-xl flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-[#e8c97a] uppercase tracking-wider">Driver’s License</span>
                <Paperclip className="w-4 h-4 text-[#8898aa]" />
              </div>
              <p className="text-[11px] text-[#8898aa]">Front & back image or PDF</p>
            </div>

            {files.driversLicense ? (
              <div className="flex items-center justify-between p-2.5 bg-[#1a2845] rounded-lg border border-[#eab308]/40">
                <div className="truncate pr-2">
                  <p className="text-xs text-white font-medium truncate">{files.driversLicense.name}</p>
                  <p className="text-[10px] text-[#8898aa]">{(files.driversLicense.size / 1024).toFixed(0)} KB</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile('driversLicense')}
                  className="text-red-400 hover:text-red-300 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center p-4 border border-dashed border-[rgba(201,168,76,0.3)] hover:border-[#eab308] bg-[#131e35]/50 hover:bg-[#131e35] rounded-lg cursor-pointer transition-all">
                <Upload className="w-5 h-5 text-[#eab308] mb-1" />
                <span className="text-xs text-[#f4f6f8] font-medium">Upload Driver’s License</span>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileUpload('driversLicense', e)}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Security Guard ID / License */}
          <div className="p-4 bg-[#0b1120] border border-[rgba(201,168,76,0.2)] rounded-xl flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-[#e8c97a] uppercase tracking-wider">Security Guard ID / License</span>
                <Paperclip className="w-4 h-4 text-[#8898aa]" />
              </div>
              <p className="text-[11px] text-[#8898aa]">DCJS / State Security Guard Card</p>
            </div>

            {files.guardLicense ? (
              <div className="flex items-center justify-between p-2.5 bg-[#1a2845] rounded-lg border border-[#eab308]/40">
                <div className="truncate pr-2">
                  <p className="text-xs text-white font-medium truncate">{files.guardLicense.name}</p>
                  <p className="text-[10px] text-[#8898aa]">{(files.guardLicense.size / 1024).toFixed(0)} KB</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile('guardLicense')}
                  className="text-red-400 hover:text-red-300 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center p-4 border border-dashed border-[rgba(201,168,76,0.3)] hover:border-[#eab308] bg-[#131e35]/50 hover:bg-[#131e35] rounded-lg cursor-pointer transition-all">
                <Upload className="w-5 h-5 text-[#eab308] mb-1" />
                <span className="text-xs text-[#f4f6f8] font-medium">Upload Guard ID / License</span>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileUpload('guardLicense', e)}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Certifications & Training */}
          <div className="p-4 bg-[#0b1120] border border-[rgba(201,168,76,0.2)] rounded-xl flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-[#e8c97a] uppercase tracking-wider">Certifications & Training</span>
                <Paperclip className="w-4 h-4 text-[#8898aa]" />
              </div>
              <p className="text-[11px] text-[#8898aa]">Firearms, CPR, First Aid certs</p>
            </div>

            {files.certifications ? (
              <div className="flex items-center justify-between p-2.5 bg-[#1a2845] rounded-lg border border-[#eab308]/40">
                <div className="truncate pr-2">
                  <p className="text-xs text-white font-medium truncate">{files.certifications.name}</p>
                  <p className="text-[10px] text-[#8898aa]">{(files.certifications.size / 1024).toFixed(0)} KB</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile('certifications')}
                  className="text-red-400 hover:text-red-300 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center p-4 border border-dashed border-[rgba(201,168,76,0.3)] hover:border-[#eab308] bg-[#131e35]/50 hover:bg-[#131e35] rounded-lg cursor-pointer transition-all">
                <Upload className="w-5 h-5 text-[#eab308] mb-1" />
                <span className="text-xs text-[#f4f6f8] font-medium">Upload Certifications</span>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileUpload('certifications', e)}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Additional Supporting Documents */}
          <div className="p-4 bg-[#0b1120] border border-[rgba(201,168,76,0.2)] rounded-xl flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-[#e8c97a] uppercase tracking-wider">Additional Documents</span>
                <Paperclip className="w-4 h-4 text-[#8898aa]" />
              </div>
              <p className="text-[11px] text-[#8898aa]">Letters of rec, DD-214, etc.</p>
            </div>

            <label className="flex flex-col items-center justify-center p-4 border border-dashed border-[rgba(201,168,76,0.3)] hover:border-[#eab308] bg-[#131e35]/50 hover:bg-[#131e35] rounded-lg cursor-pointer transition-all">
              <Upload className="w-5 h-5 text-[#eab308] mb-1" />
              <span className="text-xs text-[#f4f6f8] font-medium">+ Add Files (Multiple)</span>
              <input
                type="file"
                multiple
                accept="image/*,.pdf,.doc,.docx"
                onChange={handleMultipleFilesUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Additional Files List */}
        {files.otherDocs.length > 0 && (
          <div className="pt-2 space-y-2">
            <span className="text-xs font-semibold text-[#8898aa] uppercase tracking-wider">
              Other Uploaded Files ({files.otherDocs.length})
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {files.otherDocs.map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 bg-[#0b1120] rounded-lg border border-[rgba(201,168,76,0.2)]">
                  <div className="truncate pr-2">
                    <p className="text-xs text-white truncate">{doc.name}</p>
                    <p className="text-[10px] text-[#8898aa]">{(doc.size / 1024).toFixed(0)} KB</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeOtherFile(idx)}
                    className="text-red-400 hover:text-red-300 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* SECTION 10: VERIFICATION & SIGNATURE */}
      <section className="bg-[#131e35]/60 border border-[rgba(201,168,76,0.15)] rounded-xl p-6 md:p-8 space-y-6">
        <div className="border-b border-[rgba(201,168,76,0.15)] pb-3 flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-[#eab308]" />
          <h3 className="text-xl md:text-2xl font-['Bebas_Neue',sans-serif] text-[#eab308] tracking-wider">
            10. Verification – Certification – Consent – Acknowledgement
          </h3>
        </div>

        {/* Legal Text */}
        <div className="bg-[#0b1120] p-5 rounded-lg border border-[rgba(201,168,76,0.15)] max-h-64 overflow-y-auto space-y-3 text-xs text-[#8898aa] leading-relaxed">
          <p>
            By signing below, I hereby certify that all the information on this employment application and any resume or exhibit attached or emailed is true, correct, and complete. I have not withheld any information requested on this application. I understand that false, misleading, incomplete, or omitted information on this application or my resume, or otherwise in the application process will result in disqualification for employment or, if I am hired, dismissal from employment no matter when discovered. I authorize Virginia Surveillance Force, its affiliated firm and its agents to confirm information supplied on this application and my resume and to investigate my suitability for employment. I agree to provide additional information if requested. I release all parties, companies, and persons from any claims, liabilities and damages that may result from requesting or furnishing information about me to Virginia Surveillance Force / American Surveillance Force, its agents and or its affiliated firms, as well as from using such information in considering my employment application.
          </p>
          <p>
            I understand and I agree to follow Virginia Surveillance Force policies, rules and regulations. I understand, If I don’t comply with Virginia Surveillance Force policies, rules, and regulations, or don’t cooperate with managers and or supervisors, it may cause termination immediately without any notice. In consideration of my employment, I agree and understand that I am responsible for following Virginia Surveillance Force / American Surveillance Force, post orders, policies, rules and regulations and I will perform duties to the best of my abilities. I understand, if I violate Virginia Surveillance Force, post orders, policies, rules and regulations, I will be held responsible for any liabilities against me and all courts and attorney’s fees.
          </p>
          <p>
            In consideration of my employment, I agree to conform to the Virginia Surveillance Force rules and regulations, and I agree that my employment and compensation can be terminated, with or without cause and with or without notice at any time at either my or the company option. I also understand and agree that the terms and conditions of my employment may be changed, with or without cause and with or without notice, at any time by the Virginia Surveillance Force. "I understand that no company representative, other than its president and then only when in writing and signed by the president or directors has any authority to enter into any agreement for employment for any specific period of time, or to make any agreement contrary to the foregoing."
          </p>
          <p>
            This application for employment shall be considered active for a period not to exceed 120 days. Any applicant wishing to be considered for employment beyond this time should inquire as to whether applications are being accepted at that time. I understand I may be asked for a drug test at any time. I understand that if offered employment I must complete an I-9, W4, State tax forms, company property issuance agreement, confidential & non-disclosure agreement, conflict of interest, use of force, and all other required documents and training forms, including background check and provide satisfactory proof of my identity and legal authority to work in the United States.
          </p>
        </div>

        {/* Checkbox Acknowledgment */}
        <label className="flex items-start gap-3 cursor-pointer p-4 bg-[#0b1120] rounded-lg border border-[rgba(201,168,76,0.2)]">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="w-5 h-5 text-[#eab308] rounded focus:ring-0 mt-0.5 shrink-0"
          />
          <span className="text-xs sm:text-sm text-[#f4f6f8]">
            <span className="text-[#eab308] font-bold">*</span> I have read, understood, and agree to the Verification, Certification, Consent & Acknowledgement statement above.
          </span>
        </label>
        {formErrors.agreedToTerms && (
          <p className="text-red-400 text-xs mt-1">{formErrors.agreedToTerms}</p>
        )}

        {/* Signature & Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          <div>
            <label className="block text-xs font-semibold text-[#8898aa] uppercase tracking-wider mb-2">
              <span className="text-[#eab308]">*</span> Electronic Signature of Applicant (Type Full Legal Name)
            </label>
            <input
              type="text"
              id="applicantSignature"
              placeholder="e.g. Johnathan Doe"
              value={applicantSignature}
              onChange={(e) => setApplicantSignature(e.target.value)}
              className={`w-full px-4 py-2.5 bg-[#0b1120] border rounded-lg text-[#f4f6f8] font-medium tracking-wide focus:border-[#eab308] outline-none ${
                formErrors.applicantSignature ? 'border-red-500' : 'border-[rgba(201,168,76,0.2)]'
              }`}
            />
            {formErrors.applicantSignature && (
              <p className="text-red-400 text-xs mt-1">{formErrors.applicantSignature}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#8898aa] uppercase tracking-wider mb-2">
              Date Signed
            </label>
            <input
              type="date"
              value={signatureDate}
              onChange={(e) => setSignatureDate(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#0b1120] border border-[rgba(201,168,76,0.2)] rounded-lg text-[#f4f6f8] focus:border-[#eab308] outline-none"
            />
          </div>
        </div>
      </section>

      {/* SECURITY CAPTCHA & SUBMISSION */}
      <div className="bg-[#131e35] rounded-xl p-6 md:p-8 border border-[rgba(201,168,76,0.2)] space-y-6 shadow-xl">
        <label className="block text-xs font-semibold text-[#8898aa] uppercase tracking-wider">
          <span className="text-[#eab308]">*</span> Security Verification
        </label>
        <div className="flex gap-3 items-center max-w-md">
          <div className="shrink-0 py-3 px-5 bg-[#1a2845] border border-[rgba(201,168,76,0.3)] rounded-lg text-[#eab308] font-bold text-sm tracking-wider min-w-[120px] text-center">
            {captcha.loading ? '...' : captcha.question || '—'}
          </div>
          <input
            type="number"
            id="captchaAnswer"
            placeholder="Answer"
            value={captchaAnswer}
            onChange={(e) => {
              setCaptchaAnswer(e.target.value);
              if (formErrors.captchaAnswer) setFormErrors(prev => ({ ...prev, captchaAnswer: '' }));
            }}
            className={`w-full px-4 py-3 bg-[#0b1120] border rounded-lg text-[#f4f6f8] focus:border-[#eab308] outline-none ${
              formErrors.captchaAnswer ? 'border-red-500' : 'border-[rgba(201,168,76,0.2)]'
            }`}
          />
          <button
            type="button"
            onClick={fetchCaptcha}
            className="shrink-0 p-3 bg-[rgba(201,168,76,0.1)] hover:bg-[rgba(201,168,76,0.2)] border border-[rgba(201,168,76,0.3)] rounded-lg text-[#eab308] transition-colors"
            title="Reload Security Question"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
        {formErrors.captchaAnswer && (
          <p className="text-red-400 text-xs">{formErrors.captchaAnswer}</p>
        )}

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting || captcha.loading}
            className="w-full py-4 px-8 bg-gradient-to-r from-[#eab308] to-[#e8c97a] hover:from-[#facc15] hover:to-[#eab308] text-[#0b1120] font-['Bebas_Neue',sans-serif] text-2xl tracking-wider rounded-xl transition-all shadow-xl shadow-yellow-500/10 hover:shadow-yellow-500/25 disabled:opacity-50 flex items-center justify-center gap-3 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="w-6 h-6 animate-spin" /> Submitting Application...
              </>
            ) : (
              <>
                Submit Employment Application
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
