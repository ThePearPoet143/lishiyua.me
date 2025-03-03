import { notFound } from 'next/navigation'

interface BlogPostParams {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogPost({ params }: BlogPostParams) {
  // Wait for the entire params object to resolve
  const resolvedParams = await params
  const { slug } = resolvedParams

  // Add this for debugging
  console.log('Rendering blog post with slug:', slug)

  // Example validation - replace with your actual blog post fetching logic
  if (!slug) {
    notFound()
  }

  return (
    <article className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Blog Post: {slug}</h1>
      <div>
        {/* Add your blog post content here */}
        <p>This is the content for {slug}</p>
      </div>
    </article>
  )
}

// Optionally, add generateStaticParams if you want to statically generate pages
export async function generateStaticParams() {
  // Replace with your actual blog post slugs
  const slugs = ['first-post', 'second-post']
  
  return slugs.map((slug) => ({
    slug,
  }))
}
