import { Container } from '@/components/Container'
import { RichText } from '@/components/RichText' // Import our new component
import Image from 'next/image' // Import Next.js Image component

// Define types for our data structures
interface Media {
  url: string
  alt: string
}

interface Product {
  id: string
  name: string
  description: any
  price: number
  sku: string
  category: {
    name: string
  }
  brand: {
    name: string
  }
  images: Media[] // Add images property
}

// UPDATED QUERY: Now we fetch the images relationship
const PRODUCT_QUERY = `
  query Product($sku: String!) {
    Products(where: { sku: { equals: $sku } }, limit: 1) {
      docs {
        id
        name
        description
        price
        sku
        category {
          name
        }
        brand {
          name
        }
        images {
          url
          alt
        }
      }
    }
  }
`

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = params

  const response = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: PRODUCT_QUERY,
      variables: {
        sku: slug,
      },
    }),
    cache: 'no-store',
  })

  const data = await response.json()
  const product: Product = data.data.Products.docs[0]

  if (!product) {
    return (
      <Container>
        <p>Produit non trouvé.</p>
      </Container>
    )
  }

  const firstImage = product.images?.[0]

  return (
    <Container className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div>
          {firstImage && (
            <div className="aspect-square relative border rounded-lg">
              <Image
                src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${firstImage.url}`}
                alt={firstImage.alt}
                fill
                className="object-contain"
              />
            </div>
          )}
          {/* Thumbnail gallery can be added here later */}
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-2">
            <span className="text-sm font-semibold text-gray-500">{product.brand.name}</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-3xl font-bold text-blue-600 mb-4">{product.price} DH HT</p>
          
          <div className="mb-6">
            <p className="text-sm text-gray-600">SKU: {product.sku}</p>
            <p className="text-sm text-gray-600">Catégorie: {product.category.name}</p>
          </div>

          <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700">
            Ajouter au Panier
          </button>

          {/* Description Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold border-b pb-2 mb-4">Description</h2>
            <div className="prose prose-lg max-w-none">
              <RichText content={product.description} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
