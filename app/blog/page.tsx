import Link from 'next/link'

export default function BlogIndex() {
  // Example blog posts - replace with your actual data
  const posts = [
    { slug: 'first-post', title: 'First Post' },
    { slug: 'second-post', title: 'Second Post' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug} className="mb-2">
            <Link href={`/${post.slug}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
