import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Les Repas Lili
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Une initiative solidaire pour lutter contre le gaspillage alimentaire
          et offrir des repas aux personnes dans le besoin
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Restaurateurs
          </h2>
          <p className="text-gray-600 mb-6">
            Rejoignez notre réseau de restaurateurs solidaires et participez
            à cette belle initiative en offrant des repas de qualité.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Devenir restaurateur partenaire
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Associations
          </h2>
          <p className="text-gray-600 mb-6">
            Vous êtes une association et souhaitez permettre à vos bénéficiaires
            d'accéder à des repas au restaurant ?
          </p>
          <Link
            to="/contact"
            className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            Devenir association partenaire
          </Link>
        </div>
      </div>

      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">
          Comment ça marche ?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              1
            </div>
            <h3 className="text-xl font-semibold mb-4">
              Les restaurants s'engagent
            </h3>
            <p className="text-gray-600">
              Les restaurateurs partenaires proposent des repas solidaires
              et s'engagent dans la lutte contre le gaspillage alimentaire.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              2
            </div>
            <h3 className="text-xl font-semibold mb-4">
              Les associations réservent
            </h3>
            <p className="text-gray-600">
              Les associations partenaires gèrent les réservations pour
              leurs bénéficiaires en toute simplicité.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
              3
            </div>
            <h3 className="text-xl font-semibold mb-4">
              Les bénéficiaires profitent
            </h3>
            <p className="text-gray-600">
              Les bénéficiaires peuvent profiter d'un repas au restaurant
              dans la dignité et le respect.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Vous souhaitez nous rejoindre ?
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Que vous soyez restaurateur ou association, nous serons ravis
          de vous compter parmi nos partenaires dans cette belle aventure.
        </p>
        <Link
          to="/contact"
          className="inline-block bg-blue-500 text-white px-8 py-4 rounded-lg hover:bg-blue-600 transition-colors text-lg font-medium"
        >
          Contactez-nous
        </Link>
      </div>
    </div>
  );
} 