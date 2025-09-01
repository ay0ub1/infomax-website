import { Container } from './Container'

const partners = ['Dell', 'HP', 'Canon', 'APC']

export function TrustBar() {
  return (
    <div className="bg-gray-50">
      <Container className="py-8">
        <h2 className="text-center text-lg font-semibold text-gray-800">
          Nos Partenaires Officiels
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-4">
          {partners.map((partner) => (
            <div key={partner} className="col-span-1 flex justify-center">
              <span className="text-4xl font-bold text-gray-400">
                {partner}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
