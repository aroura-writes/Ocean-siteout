import { getDocumentBySlug, getDocuments } from 'outstatic/server'
import { notFound } from 'next/navigation'
import markdownit from 'markdownit'

const md = new markdownit({ html: true, linkify: true, typographer: true })

export async function generateStaticParams() {
  try {
    const posts = getDocuments('posts', ['slug'])
    return posts.map(p => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  let post: { title: string; publishedAt: string; content: string; description?: string } | null = null

  try {
    post = getDocumentBySlug('posts', params.slug, ['title', 'publishedAt', 'content', 'description'])
  } catch {
    notFound()
  }

  if (!post) notFound()

  const html = md.render(post.content ?? '')

  return (
    <div style={{ background: '#05111f', minHeight: '100vh', paddingTop: '100px', paddingBottom: '5rem' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 2rem' }}>

        <p style={{ fontFamily: 'DM Sans', fontSize: '10px', letterSpacing: '.15em', textTransform: 'uppercase', color: '#2c5470', marginBottom: '1rem' }}>
          {new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 600,
          lineHeight: 1.2, color: '#e8f4ff', marginBottom: '1.5rem',
          background: 'linear-gradient(90deg, #dceeff 0%, #7dd3fc 40%, #dceeff 80%)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'shimmerText 4s linear infinite',
        }}>
          {post.title}
        </h1>

        {post.description && (
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '16px', fontStyle: 'italic', color: '#a8c8e0', lineHeight: 1.7, marginBottom: '2.5rem', borderLeft: '2px solid #1e4d6b', paddingLeft: '1.25rem' }}>
            {post.description}
          </p>
        )}

        <hr style={{ border: 'none', borderTop: '0.5px solid #0f2d44', marginBottom: '2.5rem' }} />

        <div className="prose-ocean" dangerouslySetInnerHTML={{ __html: html }} />

        <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '0.5px solid #0f2d44' }}>
          <a href="/blog" style={{ fontFamily: 'DM Sans', fontSize: '12px', letterSpacing: '.1em', textTransform: 'uppercase', color: '#4ec9b0', textDecoration: 'none' }}>
            ← Back to Journal
          </a>
        </div>
      </div>
      <style>{`@keyframes shimmerText{0%{background-position:0% center}100%{background-position:200% center}}`}</style>
    </div>
  )
}
