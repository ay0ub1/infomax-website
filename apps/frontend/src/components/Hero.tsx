import { Container } from './Container'

export function Hero() {
  return (
    <div className="bg-blue-600 text-white">
      <Container className="py-20 sm:py-28 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Votre Partenaire en Solutions Informatiques
        </h1>
        <p className="mt-6 text-lg leading-8 text-blue-100">
          Matériel, logiciels et services sur mesure pour les entreprises, les écoles et les administrations.
        </p>
        <div className="mt-10">
          <a
            href="/professionnels"
            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-50"
          >
            Découvrir nos solutions B2B
          </a>
        </div>
      </Container>
    </div>
  )
}
