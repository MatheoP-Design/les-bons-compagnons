import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Building2, Handshake, Home, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';

export function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">
            À propos de nous
          </h1>
          <p className="text-xl text-gray-600">
            Une collaboration entre deux acteurs majeurs pour faciliter vos projets de rénovation
          </p>
        </div>

        {/* Partenariat */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Handshake className="h-8 w-8 text-[#FF8C42]" />
              <CardTitle className="text-2xl">Notre Partenariat</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              <strong>Les Bons Compagnons</strong> est le fruit d'un partenariat stratégique entre{' '}
              <strong>Leboncoin</strong> et <strong>Les Compagnons du Devoir</strong>. Cette collaboration unique
              réunit l'expertise technologique de Leboncoin dans la mise en relation et le savoir-faire
              artisanal d'exception des Compagnons du Devoir.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Grâce à cette alliance, nous connectons les particuliers souhaitant entreprendre des travaux
              de rénovation avec des artisans qualifiés, formés selon les méthodes traditionnelles des
              Compagnons du Devoir. Chaque projet est ainsi réalisé avec le plus grand soin, en respectant
              les valeurs de qualité, de transmission du savoir et de préservation du patrimoine.
            </p>

            {/* Liens vers les partenaires */}
            <div className="grid md:grid-cols-2 gap-4 mt-8">
              <Card className="border-2 border-[#FF8C42] hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Building2 className="h-6 w-6 text-[#FF8C42]" />
                    <h3 className="text-lg font-semibold">Leboncoin</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Plateforme leader de mise en relation et d'annonces en France
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-[#FE734A] text-[#FE734A] hover:bg-[#FE734A] hover:text-white"
                  >
                    <a
                      href="https://www.leboncoin.fr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      Visiter Leboncoin
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-[#2C5F8D] hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Handshake className="h-6 w-6 text-black" />
                    <h3 className="text-lg font-semibold">Les Compagnons du Devoir</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Association reconnue pour la formation et l'excellence artisanale
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-[#2C5F8D] text-black hover:bg-[#2C5F8D] hover:text-white"
                  >
                    <a
                      href="https://www.compagnons-du-devoir.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      Visiter Les Compagnons
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Important : Biens privés uniquement */}
        <Card className="mb-8 shadow-lg border-2 border-[#FF8C42]">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-[#FF8C42]" />
              <CardTitle className="text-2xl">Information importante</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <Home className="h-6 w-6 text-[#FF8C42] mt-1 flex-shrink-0" />
              <div>
                <p className="text-gray-700 leading-relaxed font-medium">
                  Chaque annonce publiée sur notre plateforme concerne <strong>uniquement des biens privés</strong>
                  et non des biens publics.
                </p>
                <p className="text-gray-600 text-sm mt-3">
                  Les travaux proposés par nos artisans Compagnons du Devoir s'adressent exclusivement aux
                  particuliers propriétaires de biens privés (maisons, appartements, etc.). Les projets
                  concernant des bâtiments publics ou des espaces collectifs ne sont pas pris en charge
                  via cette plateforme.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notre mission */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Notre Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed mb-4">
              En combinant la simplicité d'utilisation de Leboncoin avec l'excellence artisanale des
              Compagnons du Devoir, nous souhaitons démocratiser l'accès à des travaux de rénovation
              de qualité supérieure.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Notre objectif est de permettre à chaque particulier de bénéficier du savoir-faire
              traditionnel des Compagnons, tout en garantissant transparence, qualité et suivi
              personnalisé pour chaque projet.
            </p>
          </CardContent>
        </Card>

        {/* Bouton retour */}
        <div className="mt-8 text-center">
          <Button asChild variant="outline" className="border-[#2C5F8D] text-black hover:bg-[#2C5F8D] hover:text-white">
            <Link to="/">Retour à l'accueil</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

