"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PageBanner from "@/components/common-components/innerbanner";
import { InsightPost } from "@/lib/page-insights";
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Share2, 
  Check, 
  ShieldCheck, 
  Tag, 
  ArrowRight,
  Bookmark,
  UserCheck
} from "lucide-react";

export default function InsightDetailClient({
  post,
  relatedPosts,
}: {
  post: InsightPost;
  relatedPosts: InsightPost[];
}) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <>
      <style>{`
        .insight-detail-page {
          background: #0b1120;
          color: #f4f6f8;
          font-family: 'Barlow', sans-serif;
          min-height: 100vh;
          position: relative;
        }
        .insight-detail-page::before {
          content: '';
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background:
            repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(201,168,76,0.025) 39px, rgba(201,168,76,0.025) 40px),
            repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(201,168,76,0.025) 39px, rgba(201,168,76,0.025) 40px);
        }
        .article-content {
          color: rgba(244, 246, 248, 0.88);
          font-size: 1.1rem;
          line-height: 1.9;
          font-weight: 300;
        }
        .article-content p {
          margin-bottom: 1.6rem;
        }
        .article-content .lead {
          font-size: 1.25rem;
          line-height: 1.8;
          color: #f4f6f8;
          font-weight: 400;
          border-left: 3px solid #eab308;
          padding-left: 1.25rem;
          margin-bottom: 2rem;
        }
        .article-content h2 {
          font-family: 'Bebas Neue', sans-serif;
          color: #eab308;
          font-size: 2rem;
          letter-spacing: 1px;
          margin-top: 2.8rem;
          margin-bottom: 1.2rem;
        }
        .article-content h3 {
          color: #ffffff;
          font-size: 1.4rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 0.9rem;
        }
        .article-content ul, .article-content ol {
          margin: 1.5rem 0 2rem;
          padding-left: 1.5rem;
        }
        .article-content ul {
          list-style: none;
          padding-left: 0;
        }
        .article-content ul li {
          position: relative;
          padding-left: 1.8rem;
          margin-bottom: 1rem;
        }
        .article-content ul li::before {
          content: '▸';
          color: #eab308;
          position: absolute;
          left: 0;
          top: 0;
          font-size: 1.1rem;
        }
        .article-content strong {
          color: #e8c97a;
          font-weight: 600;
        }
        .article-content .callout-box {
          background: rgba(19, 30, 53, 0.7);
          border-left: 4px solid #eab308;
          border-radius: 0 12px 12px 0;
          padding: 1.5rem 1.8rem;
          margin: 2.5rem 0;
          box-shadow: 0 6px 20px rgba(0,0,0,0.25);
        }
        .article-content .callout-box h4 {
          color: #eab308;
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 0.6rem;
        }
        .article-content .callout-box p {
          margin-bottom: 0;
          font-size: 1.02rem;
          color: rgba(244,246,248,0.9);
        }
      `}</style>

      {/* JSON-LD Schema for BlogPosting */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "image": `https://vsfus.com${post.featuredImage}`,
            "datePublished": post.publishedDate,
            "author": {
              "@type": "Organization",
              "name": post.author.name,
            },
            "publisher": {
              "@type": "Organization",
              "name": "Virginia Surveillance Force",
              "logo": {
                "@type": "ImageObject",
                "url": "https://vsfus.com/images/trust.gif",
              },
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://vsfus.com/insights/${post.slug}`,
            },
          }),
        }}
      />

      <PageBanner title="Security Insights" breadcrumb="Blog" />

      <div className="insight-detail-page py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">

          {/* Top Breadcrumb & Back Link */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 text-sm">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-[#eab308] transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" /> Back to All Insights
            </Link>

            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Link href="/" className="hover:text-gray-200">Home</Link>
              <span>/</span>
              <Link href="/insights" className="hover:text-gray-200">Insights</Link>
              <span>/</span>
              <span className="text-[#eab308] truncate max-w-[200px] sm:max-w-[300px]">{post.title}</span>
            </div>
          </div>

          {/* Article Header */}
          <header className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-[#eab308] text-xs uppercase tracking-widest font-bold mb-4">
              <Bookmark className="w-3.5 h-3.5" />
              {post.category}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white heading-font leading-tight mb-6">
              {post.title}
            </h1>

            {/* Meta Details & Author Row */}
            <div className="flex flex-wrap items-center justify-between gap-6 py-4 border-y border-yellow-500/20">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-[#eab308] font-bold text-sm">
                  VSF
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{post.author.name}</div>
                  <div className="text-xs text-gray-400">{post.author.role}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#eab308]" />
                  {post.publishedDate}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#eab308]" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-12 border border-yellow-500/20 shadow-2xl bg-[#131e35]">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover"
              priority
            />
          </div>

          {/* Article Main Body */}
          <main className="article-content mb-14" dangerouslySetInnerHTML={{ __html: post.content }} />

          {/* Article Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-6 pb-8 border-t border-yellow-500/15 mb-10">
              <span className="text-xs uppercase tracking-wider text-gray-400 font-bold mr-2">Tags:</span>
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-[#131e35] text-gray-300 border border-yellow-500/20"
                >
                  <Tag className="w-3 h-3 text-[#eab308]" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Share & Copy Bar */}
          <div className="bg-[#131e35] border border-yellow-500/20 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4 mb-14">
            <div className="flex items-center gap-2 text-sm text-gray-300 font-medium">
              <Share2 className="w-4 h-4 text-[#eab308]" /> Share this security insight:
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-white border border-white/10 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Share2 className="w-3.5 h-3.5" />}
                {copied ? "Link Copied!" : "Copy Link"}
              </button>
            </div>
          </div>

          {/* Author Box */}
          <div className="bg-gradient-to-r from-[#131e35] to-[#1a2845] border border-yellow-500/25 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-16 shadow-xl">
            <div className="w-14 h-14 rounded-full bg-[#eab308] text-[#002147] flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-lg">
              <UserCheck className="w-7 h-7 text-[#002147]" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-[#eab308] font-bold mb-1">Published By</div>
              <h4 className="text-xl font-bold text-white">{post.author.name}</h4>
              <p className="text-sm text-gray-300 font-light mt-1 leading-relaxed">
                Virginia Surveillance Force has provided licensed security officer staffing, corporate facility protection, and customized protective operations across Washington DC, Maryland, and Virginia since 1987.
              </p>
            </div>
          </div>

          {/* Related Articles Section */}
          {relatedPosts && relatedPosts.length > 0 && (
            <div className="border-t border-yellow-500/20 pt-12 mb-16">
              <h3 className="text-2xl font-extrabold text-white heading-font mb-6">
                Related Security Insights
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedPosts.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/insights/${rel.slug}`}
                    className="bg-[#131e35] border border-yellow-500/15 hover:border-yellow-500/40 rounded-xl p-5 block group transition-all"
                  >
                    <span className="text-xs text-[#eab308] font-semibold block mb-2">{rel.category}</span>
                    <h4 className="text-lg font-bold text-white group-hover:text-[#eab308] transition-colors leading-snug line-clamp-2 mb-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-gray-400 line-clamp-2 font-light leading-relaxed mb-4">
                      {rel.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#eab308] group-hover:translate-x-1 transition-transform">
                      Read Article <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Call to Action Card */}
          <div className="bg-gradient-to-r from-[#002147] to-[#0b1120] border border-yellow-500/40 rounded-2xl p-8 sm:p-10 text-center relative overflow-hidden shadow-2xl">
            <ShieldCheck className="w-10 h-10 text-[#eab308] mx-auto mb-3" />
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white heading-font mb-3">
              Looking for a Trusted Security Partner?
            </h3>
            <p className="text-gray-300 text-sm sm:text-base font-light max-w-xl mx-auto mb-6 leading-relaxed">
              Connect with our licensed security leadership to evaluate your site requirements and receive a comprehensive security proposal.
            </p>
            <Link
              href="/request-quote"
              className="inline-flex items-center gap-2 bg-[#eab308] text-[#002147] px-7 py-3 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-yellow-400 transition-all shadow-lg hover:shadow-yellow-500/30"
            >
              Request a Quote <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
