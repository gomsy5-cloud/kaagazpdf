import { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { blogPosts } from '@/lib/blog-data'
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'KaagazPDF Blog - PDF Tutorials & Guides',
  description: 'Explore tutorials on PDF compression, conversions, and document optimization.',
}

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased">
      <Header />
      <main className="flex-grow py-12 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex p-3 bg-orange-100 text-orange-600 rounded-2xl mb-4"><BookOpen className="w-8 h-8" /></div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">KaagazPDF Knowledge Base</h1>
          <p className="mt-3 text-slate-600">Step-by-step technical guides and PDF management strategies.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.slug} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
              <div className="p-6">
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wider bg-orange-50 px-2.5 py-1 rounded-full">{post.category}</span>
                <h2 className="text-xl font-bold text-slate-900 mt-3 mb-2 hover:text-orange-600 transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-slate-600 text-sm line-clamp-3">{post.description}</p>
              </div>
              <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.publishedAt}</span>
                <Link href={`/blog/${post.slug}`} className="font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1">Read <ArrowRight className="w-3.5 h-3.5" /></Link>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}