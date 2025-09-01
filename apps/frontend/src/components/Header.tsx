import Link from 'next/link'
import { Container } from './Container'

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              INFOMAX
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/professionnels" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Professionnels
              </Link>
              <Link href="/a-propos" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                À Propos
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Contact
              </Link>
            </div>
          </nav>

          {/* Cart Icon Placeholder */}
          <div className="ml-4">
            <button className="bg-gray-200 p-2 rounded-full text-gray-600 hover:text-gray-800">
              {/* We will add a real icon here later */}
              Panier (0)
            </button>
          </div>
        </div>
      </Container>
    </header>
  )
}
