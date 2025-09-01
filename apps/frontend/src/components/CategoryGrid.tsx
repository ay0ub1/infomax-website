import Link from 'next/link'
import { Container } from './Container'

// Type for our Category data
interface Category {
  id: string
  name: string
}

// GraphQL query to fetch categories
const CATEGORIES_QUERY = `
  query Categories {
    Categories(limit: 100) {
      docs {
        id
        name
      }
    }
  }
`

// This is an async component that fetches its own data
export async function CategoryGrid() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: CATEGORIES_QUERY,
    }),
    cache: 'no-store',
  })

  const data = await response.json()
  const categories: Category[] = data.data.Categories.docs

  return (
    <div className="bg-white">
      <Container className="py-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Explorer par Catégorie</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.name.toLowerCase()}`} // We will build this page later
              className="group block rounded-lg border p-6 text-center shadow-sm hover:border-blue-600 hover:ring-1 hover:ring-blue-600"
            >
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  )
}
