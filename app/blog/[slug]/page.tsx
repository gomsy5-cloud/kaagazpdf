import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { blogPosts } from '@/lib/blog-data'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'

interface Props { params: { slug: string } }

export async function generateStaticParams() { return blogPosts.map((p) => ({ slug: p.slug })) }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug)
  if (!post) return {}
  return { title: `${post.title} | KaagazPDF`, description: post.description }
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug)
  if (!post) notFound()

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased">
      <Header />
      <main className="flex-grow py-12 px-4 sm:px-6 max-w-4xl mx-auto">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 mb-8"><ArrowLeft className="w-4 h-4" /> Back to all guides</Link>
        <article className="bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-slate-200">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider bg-orange-50 px-3 py-1 rounded-full">{post.category}</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-xs text-slate-500 my-4 border-b pb-4">
            <span>By {post.author}</span> • <span>{post.publishedAt}</span> • <span>{post.readTime}</span>
          </div>
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{
              __html: post.content
                .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">$1</h2>')
                .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-slate-900 mt-6 mb-3">$1</h3>')
                .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
            }}
          />
        </article>
      </main>
      <Footer />
    </div>
  )
}