export interface BlogPost {
  slug: string
  title: string
  description: string
  category: string
  author: string
  publishedAt: string
  readTime: string
  content: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'how-to-compress-pdf-for-upsc-government-forms',
    title: 'How to Compress PDF to 100KB or 200KB for UPSC, SSC, and Government Portals',
    description: 'A step-by-step master guide on reducing PDF document size for Indian government job applications without making text or signatures unreadable.',
    category: 'Exam Guides',
    author: 'KaagazPDF Editorial Team',
    publishedAt: '2025-01-10',
    readTime: '6 min read',
    content: `
## Why Indian Government Portals Enforce Strict PDF Size Limits

Every year, millions of candidates apply for competitive examinations across India, including UPSC, SSC, IBPS, and State PSCs. Recruitment bodies enforce strict file size thresholds (typically between 100 KB and 300 KB) to ensure their servers run smoothly.

---

## The Correct Step-by-Step Method to Compress PDF

1. **Prepare a Clean Source File:** Crop unnecessary borders.
2. **Upload to KaagazPDF:** Go to KaagazPDF Compress PDF tool.
3. **Run Smart Compression:** Reduce file size while keeping text and roll numbers sharp.
4. **Download & Verify:** Ensure file size is below limits and clear at 200% zoom.
`
  },
  {
    slug: 'convert-scanned-pdf-to-word-without-losing-formatting',
    title: 'How to Convert Scanned PDF to Word Without Losing Formatting or Tables',
    description: 'Learn how to convert scanned PDFs into fully editable DOCX files while preserving tables and fonts.',
    category: 'Productivity',
    author: 'KaagazPDF Editorial Team',
    publishedAt: '2025-01-12',
    readTime: '7 min read',
    content: `
## The Challenge of Editing Scanned PDF Files

Scanners produce flat image copies rather than selectable text. Using optical character recognition and structural alignment, KaagazPDF reconstructs fonts, columns, and tables into editable DOCX format.
`
  },
  {
    slug: 'how-to-password-protect-sensitive-pdf-documents',
    title: 'Complete Guide to Password Protecting and Securing Sensitive PDF Documents',
    description: 'Understand 128-bit and 256-bit AES encryption standards for securing confidential documents.',
    category: 'Security',
    author: 'KaagazPDF Editorial Team',
    publishedAt: '2025-01-14',
    readTime: '5 min read',
    content: `
## Protecting Sensitive PDF Documents

Never email unencrypted salary slips or ID proofs. Use 256-bit AES password encryption to prevent unauthorized access and sharing.
`
  }
];