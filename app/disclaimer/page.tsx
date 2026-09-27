import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Disclaimer | KaagazPDF',
  description: 'Disclaimer regarding conversion accuracy and limitations on KaagazPDF.',
}

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased">
      <Header />
      <main className="flex-grow py-12 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-orange-100 text-orange-600 rounded-xl"><AlertCircle className="w-6 h-6" /></div>
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">Disclaimer</h1>
              <p className="text-sm text-slate-500">Updated: January 2025</p>
            </div>
          </div>
          <div className="prose prose-slate max-w-none space-y-4 text-slate-700">
            <p>The information and utilities provided on <strong>KaagazPDF (kaagazpdf.in)</strong> are for general productivity purposes only.</p>
            <h2 className="text-xl font-bold text-slate-900">Document Conversion Fidelity</h2>
            <p>While our platform employs cutting-edge PDF libraries, complex documents with customized fonts or degraded scans may experience minor formatting variances.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}