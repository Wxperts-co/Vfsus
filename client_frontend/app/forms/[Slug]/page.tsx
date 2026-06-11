// app/forms/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getFormBySlug } from '@/data/formsdetails';
import PageBanner from '@/components/common-components/innerbanner';
import DynamicForm from '@/components/forms/DynamicForm';

interface FormPageProps {
    params: Promise<{
        Slug?: string;
        slug?: string;
    }>;
}

export async function generateMetadata({ params }: FormPageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const slug = resolvedParams.slug || resolvedParams.Slug || '';
    const form = getFormBySlug(slug);

    if (!form) {
        return {
            title: 'Form Not Found',
        };
    }

    return {
        title: `${form.title || ''} | Virginia Surveillance Force`,
        description: form.description,
    };
}

export default async function FormPage({ params }: FormPageProps) {
    const resolvedParams = await params;
    const slug = resolvedParams.slug || resolvedParams.Slug || '';
    const form = getFormBySlug(slug);

    if (!form) {
        notFound();
    }

    return (
        <>
            <PageBanner title={form.title || ''} />

            <div className="bg-[#0b1120] min-h-screen py-16">
                <div className="container mx-auto px-4 max-w-5xl">
                    {/* Header Section */}
                    <div className="mb-10">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
                            <div>
                                
                                <p className="text-[#8898aa]">{form.description}</p>
                                <p className="text-[#c9a84c] text-sm mt-2">
                                    <span className="text-[#c9a84c]">*</span> Indicates required field
                                </p>
                            </div>
                            {form.trustImage && (
                                <div className="flex-shrink-0">
                                    <img src={form.trustImage} alt="Trust" className="w-24 h-auto" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Dynamic Form */}
                    <div className="bg-[rgba(19,30,53,0.5)] rounded-lg p-6 md:p-8 border border-[rgba(201,168,76,0.1)]">
                        <DynamicForm formData={form} />
                    </div>

                    {/* Additional Info for Contract Form */}
                    {form.slug === 'contracting-opportunity' && (
                        <div className="mt-8 p-6 bg-[#131e35] rounded-lg border border-[rgba(201,168,76,0.1)]">
                            <ul className="space-y-2 text-[#8898aa]">
                                <li className="flex items-start gap-2">
                                    <span className="text-[#c9a84c]">•</span>
                                    The Information provided to Virginia Surveillance Force is presented as truthful and accurate.
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#c9a84c]">•</span>
                                    It is Understood that Virginia Surveillance Force will service after receiving a signed contract.
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#c9a84c]">•</span>
                                    It is Understood that Virginia Surveillance Force will maintain this information confidential.
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}