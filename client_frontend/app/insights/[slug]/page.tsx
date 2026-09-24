import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getInsightsPageData } from "@/lib/settings-server";
import InsightDetailClient from "@/app/insights/[slug]/InsightDetailClient";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const data = await getInsightsPageData();
  const post = data.posts.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    return { title: "Article Not Found | Virginia Surveillance Force" };
  }

  const seoTitle = post.seo?.title || `${post.title} | VSF Security Insights`;
  const seoDescription = post.seo?.description || post.excerpt;
  const seoKeywords = post.seo?.keywords || data.seo.keywords;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    alternates: {
      canonical: `https://vsfus.com/insights/${resolvedParams.slug}`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `https://vsfus.com/insights/${resolvedParams.slug}`,
      type: "article",
      publishedTime: post.publishedDate,
      authors: [post.author.name],
      images: [
        {
          url: post.featuredImage.startsWith("http") ? post.featuredImage : `https://vsfus.com${post.featuredImage}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function InsightPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const data = await getInsightsPageData();
  const post = data.posts.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = data.posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return <InsightDetailClient post={post} relatedPosts={relatedPosts} />;
}
