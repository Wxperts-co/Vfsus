import { ContactFormInput } from "@/lib/validations/contact";

type TemplateInput = Omit<ContactFormInput, "captchaAnswer" | "captchaToken">;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function wrapper(title: string, bodyHtml: string): string {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#0b1120;font-family:'Helvetica Neue',Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0b1120;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#131e35;border:1px solid rgba(201,168,76,0.25);border-radius:8px;overflow:hidden;">
            <tr>
              <td style="background:linear-gradient(135deg,#0b1120,#1a2845);padding:24px 28px;border-bottom:2px solid #eab308;">
                <span style="font-size:20px;letter-spacing:2px;color:#eab308;font-weight:700;text-transform:uppercase;">Virginia Surveillance Force</span>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;color:#f4f6f8;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:18px 28px;background-color:#0b1120;border-top:1px solid rgba(201,168,76,0.15);">
                <span style="font-size:12px;color:#8898aa;">This is an automated message. Please do not reply directly to this email.</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:8px 0;font-size:13px;letter-spacing:1px;text-transform:uppercase;color:#8898aa;width:140px;vertical-align:top;">${label}</td>
      <td style="padding:8px 0;font-size:14px;color:#f4f6f8;vertical-align:top;">${value}</td>
    </tr>`;
}

export function adminNotificationEmail(data: TemplateInput) {
  const body = `
    <p style="margin:0 0 16px;font-size:18px;color:#eab308;font-weight:700;letter-spacing:1px;">New Contact Form Submission</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${row("Name", escapeHtml(data.name))}
      ${row("Email", `<a href="mailto:${escapeHtml(data.email)}" style="color:#e8c97a;">${escapeHtml(data.email)}</a>`)}
      ${row("Phone", escapeHtml(data.phone))}
      ${row("Address", escapeHtml(data.address))}
      ${row("City / Town", escapeHtml(data.citytown))}
      ${row("State", escapeHtml(data.province))}
      ${row("Zip Code", escapeHtml(data.postalcode))}
    </table>
    <div style="margin-top:20px;padding:16px;background-color:#0b1120;border-left:3px solid #eab308;border-radius:4px;">
      <p style="margin:0 0 6px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#8898aa;">Comments</p>
      <p style="margin:0;font-size:14px;line-height:1.6;color:#f4f6f8;white-space:pre-wrap;">${escapeHtml(data.comments)}</p>
    </div>
  `;
  return {
    subject: `New Contact Inquiry from ${data.name}`,
    html: wrapper("New Contact Form Submission", body),
  };
}

export function userConfirmationEmail(data: TemplateInput) {
  const body = `
    <p style="margin:0 0 16px;font-size:18px;color:#eab308;font-weight:700;letter-spacing:1px;">Thanks for reaching out, ${escapeHtml(
      data.name
    )}!</p>
    <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:rgba(244,246,248,0.85);">
      We&rsquo;ve received your message and a member of our team will get back to you shortly.
      Below is a copy of what you submitted for your records.
    </p>
    <div style="margin-top:8px;padding:16px;background-color:#0b1120;border-left:3px solid #eab308;border-radius:4px;">
      <p style="margin:0 0 6px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#8898aa;">Your Message</p>
      <p style="margin:0;font-size:14px;line-height:1.6;color:#f4f6f8;white-space:pre-wrap;">${escapeHtml(data.comments)}</p>
    </div>
    <p style="margin:20px 0 0;font-size:13px;color:#8898aa;">If you didn&rsquo;t submit this request, please disregard this email.</p>
  `;
  return {
    subject: "We've received your message",
    html: wrapper("Thanks for contacting us", body),
  };
}

export function adminGenericFormEmail(title: string, data: any, emailField: string = "fromemail") {
  const rowsHtml = Object.entries(data)
    .filter(([key, val]) => val && key !== 'captchaToken' && key !== 'captchaAnswer' && (typeof val !== 'object' || Array.isArray(val)))
    .map(([key, val]) => {
      const formattedKey = key.replace(/([A-Z])/g, ' $1').toUpperCase();
      const formattedVal = Array.isArray(val) ? val.join(", ") : String(val);
      return row(formattedKey, escapeHtml(formattedVal));
    })
    .join("");

  const body = `
    <p style="margin:0 0 16px;font-size:18px;color:#eab308;font-weight:700;letter-spacing:1px;">New ${title} Submission</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${rowsHtml}
    </table>
  `;

  let replyTo = data[emailField] || data.email;

  return {
    subject: `New ${title} Submission`,
    html: wrapper(`New ${title}`, body),
    replyTo,
  };
}

export function userGenericFormEmail(title: string, data: any, nameField: string = "requestor") {
  const name = escapeHtml(data[nameField] || data.name || "Customer");
  
  const body = `
    <p style="margin:0 0 16px;font-size:18px;color:#eab308;font-weight:700;letter-spacing:1px;">Thanks for reaching out, ${name}!</p>
    <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:rgba(244,246,248,0.85);">
      We&rsquo;ve received your <strong>${title}</strong> and a member of our team will get back to you shortly.
    </p>
    <p style="margin:20px 0 0;font-size:13px;color:#8898aa;">If you didn&rsquo;t submit this request, please disregard this email.</p>
  `;
  return {
    subject: `We've received your ${title}`,
    html: wrapper("Thanks for contacting us", body),
  };
}

export function adminEmploymentApplicationEmail(data: any, files: { fieldName: string; originalName: string; url: string; size?: number }[]) {
  const applicantName = `${data.firstName || ""} ${data.middleName ? data.middleName + " " : ""}${data.lastName || ""}`.trim() || "Applicant";
  const positions = Array.isArray(data.positions) && data.positions.length > 0 
    ? data.positions.join(", ") 
    : (data.otherPosition || data.positionApplied || "Security Officer");
  const otherPos = data.otherPosition ? ` (Other: ${escapeHtml(data.otherPosition)})` : "";

  const sectionHeader = (title: string) => `
    <tr>
      <td colspan="2" style="padding:16px 0 8px;border-bottom:2px solid #eab308;font-size:14px;font-weight:bold;color:#eab308;letter-spacing:1.5px;text-transform:uppercase;">
        ${title}
      </td>
    </tr>
  `;

  // Education rows
  let educationHtml = "";
  if (data.highSchool?.schoolName) {
    educationHtml += `
      ${row("High School", escapeHtml(data.highSchool.schoolName))}
      ${row("HS Graduation", escapeHtml(data.highSchool.graduationDate || "—"))}
      ${row("HS Proof Available", escapeHtml(data.highSchool.canProvideProof || "—"))}
      ${data.highSchool.website ? row("HS Website", escapeHtml(data.highSchool.website)) : ""}
    `;
  }
  if (Array.isArray(data.collegeEducation) && data.collegeEducation.length > 0) {
    data.collegeEducation.forEach((c: any, i: number) => {
      educationHtml += `
        ${row(`College/School #${i + 1}`, `${escapeHtml(c.school || "—")} — ${escapeHtml(c.degree || "")} (${escapeHtml(c.major || "")}) [${escapeHtml(c.yearsCompleted || "")} completed]`)}
      `;
    });
  }

  // Licenses rows
  let licensesHtml = "";
  if (Array.isArray(data.licensesAndCertificates) && data.licensesAndCertificates.length > 0) {
    data.licensesAndCertificates.forEach((l: any, i: number) => {
      licensesHtml += `
        ${row(`License #${i + 1}`, `${escapeHtml(l.description || "—")} | Issued by: ${escapeHtml(l.issuedBy || "—")} | ID: ${escapeHtml(l.idNum || "—")} | Exp: ${escapeHtml(l.expirationDate || "—")}`)}
      `;
    });
  } else {
    licensesHtml = row("Licenses/Certs", "None listed");
  }

  // Questionnaire rows
  const questionnaireMap: Record<string, string> = {
    q1_firearm: "1. Own/Possess Firearm",
    q3_military: "2. US Military Service",
    q4_police_federal: "3. Police / Federal / National Guard",
    q5_drug_testing: "4. Drug Testing Consent (Law / Policy / Position)",
    q6_field_experience: "5. Security Field Experience",
    q9_conflict_interest: "6. Security Firm Affiliation Conflict",
    q10_currently_employed_security: "7. Currently Employed with Security Firm",
    q11_contact_employer: "8. May Contact Present Employer",
    q12_driving_criminal_record: "9. Provide Driving/Criminal Record",
  };

  let questionnaireHtml = "";
  if (data.questionnaire && typeof data.questionnaire === "object") {
    Object.entries(questionnaireMap).forEach(([k, label]) => {
      const val = data.questionnaire[k] || "—";
      const color = val === "Yes" ? "#10dc60" : val === "No" ? "#e8c97a" : "#8898aa";
      questionnaireHtml += `
        <tr>
          <td style="padding:6px 0;font-size:13px;color:#8898aa;width:240px;vertical-align:top;">${label}</td>
          <td style="padding:6px 0;font-size:13px;font-weight:bold;color:${color};vertical-align:top;">${escapeHtml(val)}</td>
        </tr>
      `;
    });
  }

  // Work History rows
  let workHistoryHtml = "";
  if (Array.isArray(data.workHistory) && data.workHistory.length > 0) {
    data.workHistory.forEach((w: any, i: number) => {
      workHistoryHtml += `
        <tr>
          <td colspan="2" style="padding:10px 0 4px;font-size:13px;font-weight:bold;color:#e8c97a;">Employer #${i + 1}: ${escapeHtml(w.company || "—")} (${escapeHtml(w.jobTitle || "Security Officer")})</td>
        </tr>
        ${row("Dates Employed", `${escapeHtml(w.startDate || "—")} to ${escapeHtml(w.endDate || "—")}`)}
        ${row("Address / Phone", `${escapeHtml(w.address || "—")} | Phone: ${escapeHtml(w.phone || "—")}`)}
        ${row("Supervisor", `${escapeHtml(w.supervisor || "—")} (Phone: ${escapeHtml(w.supervisorPhone || "—")}, Email: ${escapeHtml(w.supervisorEmail || "—")})`)}
        ${row("Reason for Leaving", escapeHtml(w.reasonForLeaving || "—"))}
        ${w.jobDuties ? row("Job Duties", escapeHtml(w.jobDuties)) : ""}
      `;
    });
  } else {
    workHistoryHtml = row("Work History", "None provided");
  }

  // References rows
  let referencesHtml = "";
  if (Array.isArray(data.references) && data.references.length > 0) {
    data.references.forEach((r: any, i: number) => {
      if (r.name || r.phone) {
        referencesHtml += `
          ${row(`Reference #${i + 1}`, `${escapeHtml(r.name || "—")} | Phone: ${escapeHtml(r.phone || "—")} | Email: ${escapeHtml(r.email || "—")} | Known: ${escapeHtml(r.yearsKnown || "—")} | ${escapeHtml(r.address || "")}`)}
        `;
      }
    });
  }

  // Availability rows
  const avail = data.availability || {};
  const availabilityHtml = `
    ${row("Currently Employed", escapeHtml(avail.currentlyEmployed || data.currentlyEmployed || "—"))}
    ${avail.currentEmploymentShifts ? row("Current Shifts/Days", escapeHtml(avail.currentEmploymentShifts)) : ""}
    ${row("Available for VSF", escapeHtml(avail.vsfAvailability || data.vsfAvailability || "—"))}
    ${row("Travel Distance", escapeHtml(avail.travelDistance || data.travelDistance || "—"))}
    ${row("Best Time to Contact", escapeHtml(avail.bestTimeToContact || data.bestTimeToContact || "—"))}
    ${row("Interview Days", escapeHtml(avail.interviewDays || data.interviewDays || "—"))}
  `;

  // Attached files list
  const filesListHtml = files.length > 0 
    ? `<ul style="margin:8px 0;padding-left:20px;color:#f4f6f8;line-height:1.8;">
        ${files.map(f => `<li style="margin-bottom:6px;">
            <strong style="color:#e8c97a;">${escapeHtml(f.fieldName)}:</strong> ${escapeHtml(f.originalName)} 
            <a href="https://vsfus.com${f.url}" target="_blank" style="color:#eab308;text-decoration:underline;margin-left:8px;">[Download / View]</a>
          </li>`).join("")}
       </ul>`
    : `<p style="margin:0;color:#8898aa;">No files uploaded.</p>`;

  const body = `
    <p style="margin:0 0 16px;font-size:20px;color:#eab308;font-weight:700;letter-spacing:1px;">
      New Employment Application Received
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      ${sectionHeader("1. Position & Schedule Preferences")}
      ${row("Position Applied", escapeHtml(positions) + otherPos)}
      ${row("Desired Rate", escapeHtml(data.desiredRate ? `$${data.desiredRate}/hr` : "—"))}
      ${row("Desired Status", escapeHtml(Array.isArray(data.statusDesired) ? data.statusDesired.join(", ") : (data.statusDesired || "—")))}
      ${row("Shifts", escapeHtml(Array.isArray(data.shifts) ? data.shifts.join(", ") : (data.shifts || "—")))}
      ${row("Jurisdictions", escapeHtml(Array.isArray(data.locations) ? data.locations.join(", ") : (data.locations || "—")) + (data.otherLocation ? ` (${escapeHtml(data.otherLocation)})` : ""))}
      ${row("Application Date", escapeHtml(data.appDate || new Date().toLocaleDateString()))}

      ${sectionHeader("2. Personal Information")}
      ${row("Applicant Name", escapeHtml(applicantName))}
      ${row("Email", `<a href="mailto:${escapeHtml(data.email || "")}" style="color:#e8c97a;">${escapeHtml(data.email || "")}</a>`)}
      ${row("Cell Phone", escapeHtml(data.cellPhone || data.phone || "—"))}
      ${row("Home Phone", escapeHtml(data.homePhone || "—"))}
      ${row("Address", escapeHtml(`${data.address || ""}, ${data.city || ""} ${data.state || ""} ${data.zip || ""}`.trim()))}
      ${row("Nicknames / Aliases", escapeHtml(data.nicknames || "—"))}
      ${row("Authorized to work in USA", escapeHtml(data.eligibleUSA || "—"))}
      ${row("18+ Years Old", escapeHtml(data.is18OrOlder || "—"))}
      ${row("Driver's License", escapeHtml(data.hasDriversLicense === "Yes" ? `Yes (Number: ${data.driversLicenseNum || "—"})` : (data.hasDriversLicense || "—")))}
      ${row("High School Diploma", escapeHtml(data.hasHighSchoolDiploma || "—"))}

      ${sectionHeader("3. High School & Higher Education")}
      ${educationHtml}

      ${sectionHeader("4. Licenses, Registrations & Certifications")}
      ${licensesHtml}

      ${sectionHeader("5. Employment Questionnaire")}
      ${questionnaireHtml}

      ${sectionHeader("6. Work Experience & History (Past 5 Years)")}
      ${workHistoryHtml}

      ${sectionHeader("7. Professional & Personal References")}
      ${referencesHtml}

      ${sectionHeader("8. Availability & Travel")}
      ${availabilityHtml}

      ${sectionHeader("9. Verification & Electronic Signature")}
      ${row("Legal Consent Agreed", data.agreedToTerms ? "YES (Verified & Certified)" : "NO")}
      ${row("Applicant Signature", escapeHtml(data.applicantSignature || "—"))}
      ${row("Date Signed", escapeHtml(data.signatureDate || "—"))}
    </table>

    <div style="margin-top:24px;padding:16px;background-color:#0b1120;border-left:3px solid #eab308;border-radius:4px;">
      <p style="margin:0 0 8px;font-size:13px;letter-spacing:1px;text-transform:uppercase;color:#eab308;font-weight:bold;">
        Attached Applicant Documents (${files.length})
      </p>
      ${filesListHtml}
    </div>

    <div style="margin-top:16px;padding:14px 16px;background-color:#0b1120;border-radius:4px;text-align:center;">
      <a href="https://vsfus.com/admin/employment-applications" style="display:inline-block;padding:10px 20px;background-color:#eab308;color:#0b1120;font-weight:bold;text-decoration:none;border-radius:4px;font-size:14px;letter-spacing:1px;text-transform:uppercase;">
        View in Admin Portal
      </a>
    </div>
  `;

  return {
    subject: `New Employment Application: ${applicantName} - ${positions}`,
    html: wrapper("New Employment Application", body),
    replyTo: data.email,
  };
}

export function userEmploymentApplicationEmail(data: any) {
  const applicantName = `${data.firstName || ""} ${data.lastName || ""}`.trim() || "Applicant";
  
  const body = `
    <p style="margin:0 0 16px;font-size:18px;color:#eab308;font-weight:700;letter-spacing:1px;">Thank You for Applying, ${escapeHtml(applicantName)}!</p>
    <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:rgba(244,246,248,0.85);">
      We have received your Employment Application with <strong>Virginia Surveillance Force, Inc.</strong>
    </p>
    <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:rgba(244,246,248,0.85);">
      Our recruiting and human resources team will review your qualifications, background details, and attached documents. If your application meets our current requirements, we will contact you directly regarding the next steps in our hiring process.
    </p>
    <div style="margin-top:16px;padding:16px;background-color:#0b1120;border-left:3px solid #eab308;border-radius:4px;">
      <p style="margin:0 0 6px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#8898aa;">Important Information</p>
      <p style="margin:0;font-size:13px;line-height:1.6;color:#f4f6f8;">
        Virginia Surveillance Force is an Equal Opportunity Employer. All applicants are subject to pre-employment background checks and state licensing verifications.
      </p>
    </div>
    <p style="margin:20px 0 0;font-size:13px;color:#8898aa;">If you did not submit this application, please contact our office at (800) 786-0395 or info@vsfus.com.</p>
  `;

  return {
    subject: `Employment Application Received - Virginia Surveillance Force`,
    html: wrapper("Application Received", body),
  };
}