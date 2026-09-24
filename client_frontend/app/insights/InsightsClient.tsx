"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PageBanner from "@/components/common-components/innerbanner";
import { InsightsPageData, InsightPost } from "@/lib/page-insights";
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  Search, 
  ShieldCheck, 
  BookOpen, 
  Tag, 
  ChevronRight,
  TrendingUp
} from "lucide-react";

export default function InsightsClient({ data }: { data: InsightsPageData }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(data.posts.map((p) => p.category)))];

  const filteredPosts = data.posts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = data.posts[0];
  const gridPosts = filteredPosts.length > 0 ? filteredPosts : [];

  return (
    <>
      <style>{`
        .insights-page {
          background: #0b1120;
          color: #f4f6f8;
          font-family: 'Barlow', sans-serif;
          min-height: 100vh;
          position: relative;
        }
        .insights-page::before {
          content: '';
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background:
            repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(201,168,76,0.025) 39px, rgba(201,168,76,0.025) 40px),
            repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(201,168,76,0.025) 39px, rgba(201,168,76,0.025) 40px);
        }
        .insight-card {
          background: #131e35;
          border: 1px solid rgba(201,168,76,0.15);
          border-radius: 16px;
          overflow: hidden;
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .insight-card:hover {
          transform: translateY(-4px);
          border-color: rgba(234,179,8,0.5);
          box-shadow: 0 12px 30px rgba(0,0,0,0.4);
        }
        .featured-card {
          background: linear-gradient(135deg, #131e35 0%, #1a2845 100%);
          border: 1px solid rgba(234,179,8,0.3);
          border-radius: 20px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.5);
        }
      `}</style>

      {/* Structured Schema for Blog */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Virginia Surveillance Force Security Insights",
            "description": data.seo.description,
            "url": "https://vsfus.com/insights",
            "blogPost": data.posts.map((post) => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.excerpt,
              "datePublished": post.publishedDate,
              "image": `https://vsfus.com${post.featuredImage}`,
              "url": `https://vsfus.com/insights/${post.slug}`,
              "author": {
                "@type": "Organization",
                "name": post.author.name,
              },
            })),
          }),
        }}
      />

      <PageBanner title="Security Insights" breadcrumb="Blog" />

      <div className="insights-page py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Description & Search Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-yellow-500/20">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-[#eab308] text-xs uppercase tracking-widest font-bold mb-3">
                <TrendingUp className="w-3.5 h-3.5" />
                Industry Analysis & Best Practices
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white heading-font">
                Security Insights & Analysis
              </h1>
              <p className="mt-2 text-gray-300 max-w-2xl text-base sm:text-lg font-light leading-relaxed">
                Expert perspectives, facility protection strategies, DCJS compliance guidance, and physical security intelligence from Virginia Surveillance Force.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search articles or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#131e35] border border-yellow-500/20 text-white rounded-full py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-[#eab308] transition-colors placeholder-gray-400"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-2 overflow-x-auto py-6 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-[#eab308] text-[#0b1120] font-bold shadow-lg shadow-yellow-500/20"
                    : "bg-[#131e35] text-gray-300 hover:text-white border border-yellow-500/15 hover:border-yellow-500/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Hero Featured Article (when not searching/filtering specific categories) */}
          {searchQuery === "" && selectedCategory === "All" && featuredPost && (
            <div className="mb-14">
              <div className="featured-card overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 border border-yellow-500/30">
                <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[420px]">
                  <Image
                    src={featuredPost.featuredImage}
                    alt={featuredPost.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-black/30 to-transparent lg:hidden" />
                  <span className="absolute top-4 left-4 bg-[#eab308] text-[#002147] font-extrabold text-xs px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                    Featured Article
                  </span>
                </div>

                <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                      <span className="text-[#eab308] font-bold">{featuredPost.category}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {featuredPost.publishedDate}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {featuredPost.readTime}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white heading-font mb-4 leading-snug hover:text-[#eab308] transition-colors">
                      <Link href={`/insights/${featuredPost.slug}`}>
                        {featuredPost.title}
                      </Link>
                    </h2>

                    <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed mb-6">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-yellow-500/15">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-[#eab308] font-bold text-xs">
                        VSF
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{featuredPost.author.name}</div>
                        <div className="text-[11px] text-gray-400">{featuredPost.author.role}</div>
                      </div>
                    </div>

                    <Link
                      href={`/insights/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 bg-[#eab308] text-[#002147] px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-yellow-400 transition-colors shadow-md"
                    >
                      Read Post <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridPosts.map((post) => (
              <article key={post.id} className="insight-card flex flex-col justify-between group">
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#0b1120]">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#131e35] via-transparent to-transparent opacity-80" />
                    <span className="absolute bottom-3 left-4 bg-black/70 backdrop-blur-sm text-[#eab308] border border-yellow-500/30 text-xs px-2.5 py-1 rounded-md font-semibold">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.publishedDate}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#eab308] transition-colors leading-snug line-clamp-2 heading-font">
                      <Link href={`/insights/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-gray-300 text-sm font-light leading-relaxed line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {post.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-black/40 text-gray-400 border border-white/5"
                          >
                            <Tag className="w-2.5 h-2.5 text-[#eab308]" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-yellow-500/10 flex items-center justify-between">
                  <div className="text-xs text-gray-400 font-medium">
                    By <span className="text-gray-200">{post.author.name}</span>
                  </div>
                  <Link
                    href={`/insights/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#eab308] hover:text-yellow-400 transition-colors uppercase tracking-wider"
                  >
                    Read More <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Empty State */}
          {gridPosts.length === 0 && (
            <div className="text-center py-20 bg-[#131e35] rounded-2xl border border-yellow-500/20 p-8">
              <BookOpen className="w-12 h-12 text-[#eab308] mx-auto mb-4 opacity-70" />
              <h3 className="text-2xl font-bold text-white mb-2">No Articles Found</h3>
              <p className="text-gray-400 max-w-md mx-auto mb-6 text-sm">
                No insights match your search &quot;{searchQuery}&quot; in the selected category.
              </p>
              <button
                onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                className="bg-[#eab308] text-[#0b1120] font-bold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider hover:bg-yellow-400 transition-colors"
              >
                Clear Search &amp; Filters
              </button>
            </div>
          )}

          {/* Bottom Call to Action */}
          <div className="mt-20 bg-gradient-to-r from-[#002147] to-[#0b1120] border border-yellow-500/30 rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-3xl mx-auto">
              <ShieldCheck className="w-12 h-12 text-[#eab308] mx-auto mb-4" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white heading-font mb-4">
                Need Professional Security Guidance For Your Property?
              </h2>
              <p className="text-gray-300 text-base sm:text-lg font-light mb-8 leading-relaxed">
                Connect with Virginia Surveillance Force for a customized site risk evaluation, certified officer placement, or comprehensive facility security consulting.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/request-quote"
                  className="bg-[#eab308] text-[#002147] font-bold px-8 py-3.5 rounded-full text-sm uppercase tracking-wider hover:bg-yellow-400 transition-all shadow-lg hover:shadow-yellow-500/30"
                >
                  Request a Quote
                </Link>
                <Link
                  href="/contact-us"
                  className="bg-white/10 text-white border border-white/20 font-bold px-8 py-3.5 rounded-full text-sm uppercase tracking-wider hover:bg-white/20 transition-colors"
                >
                  Contact Security Team
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
