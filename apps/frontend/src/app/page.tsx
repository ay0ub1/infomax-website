import { Container } from '@/components/Container'
import { Hero } from '@/components/Hero'
import { TrustBar } from '@/components/TrustBar' // Import TrustBar
import { CategoryGrid } from '@/components/CategoryGrid' // Import CategoryGrid
import Link from 'next/link'


// Define a type for our Product data structure
interface Product {
  id: string
  name: string
  price: number
  sku: string
}

// UPDATED QUERY: Now we filter for featured products
const FEATURED_PRODUCTS_QUERY = `
  query FeaturedProducts {
    Products(where: { featured: { equals: true } }, limit: 6) {
      docs {
        id
        name
        price
        sku
      }
    }
  }
`

// A new async function to fetch the products
async function getFeaturedProducts() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: FEATURED_PRODUCTS_QUERY,
    }),
    cache: 'no-store',
  })

  const data = await response.json()
  return data.data.Products.docs as Product[]
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <>
      <Hero />
      <TrustBar /> {/* Added TrustBar */}
      <CategoryGrid /> {/* Added CategoryGrid */}

      {/* Featured Products Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {featuredProducts.map((product) => (
    <Link key={product.id} href={`/products/${product.sku}`} className="group">
      <div className="bg-white border p-4 rounded-lg shadow-sm h-full group-hover:border-blue-500 group-hover:ring-1 group-hover:ring-blue-500">
        {/* We need an image placeholder here too */}
        <div className="bg-gray-200 aspect-video rounded-md mb-4"></div>
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="text-gray-700">{product.price} DH HT</p>
      </div>
    </Link>
  ))}
</div>
    </>
  )
}
