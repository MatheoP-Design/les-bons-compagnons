import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Heart, Shield, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useAuth } from '../contexts/AuthContext';

export function HomePage() {
  const { isAuthenticated } = useAuth();
  const values = [
    {
      icon: Award,
      title: 'Savoir-faire',
      description: 'Des artisans compagnons maîtrisant les techniques traditionnelles',
    },
    {
      icon: Heart,
      title: 'Tradition',
      description: 'Préservation du patrimoine et des méthodes ancestrales',
    },
    {
      icon: Shield,
      title: 'Qualité',
      description: 'Excellence et minutie dans chaque réalisation',
    },
    {
      icon: Users,
      title: 'Confiance',
      description: 'Transparence et engagement dans nos relations',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative text-white py-20" style={{ background: 'linear-gradient(to top, #FE734A, #FC473F)' }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
            {/* Left side - Text content */}
            <div className="text-right md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">
                Trouvez les meilleurs compagnons pour vos rénovations
              </h1>
              <p className="text-xl mb-8 text-white/90">
                Connectez-vous avec des artisans qualifiés pour restaurer votre patrimoine avec savoir-faire et tradition
              </p>
              <div className="flex flex-col sm:flex-row gap-4 md:justify-start">
                <Link to="/annonces">
                  <Button size="lg" className="bg-white hover:bg-white/90 border-white/20 hover:border-white/30" style={{ color: '#FC473F' }}>
                    Découvrir les annonces
                  </Button>
                </Link>
                <Link to={isAuthenticated ? "/tableau-de-bord" : "/connexion"}>
                  <Button size="lg" variant="outline" className="bg-white hover:bg-white/90 border-white/20 hover:border-white/30" style={{ color: '#FC473F' }}>
                    Créer une annonce
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right side - Logo */}
            <div className="flex items-center justify-center md:justify-end">
              <div className="max-w-md w-full">
                <img
                  src="/logo blanc.png"
                  alt="Les Bons Compagnons Logo"
                  className="w-full h-auto object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* How it works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl text-center mb-12" style={{ background: 'linear-gradient(to top, #FE734A, #FC473F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Comment ça marche ?
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl" style={{ background: 'linear-gradient(to top, #FE734A, #FC473F)' }}>
                  1
                </div>
                <h3 className="text-xl mb-2">Publiez votre annonce</h3>
                <p className="text-muted-foreground">
                  Décrivez votre projet de rénovation en quelques clics
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl" style={{ background: 'linear-gradient(to top, #FE734A, #FC473F)' }}>
                  2
                </div>
                <h3 className="text-xl mb-2">Recevez des devis</h3>
                <p className="text-muted-foreground">
                  Les compagnons vous envoient leurs propositions
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl" style={{ background: 'linear-gradient(to top, #FE734A, #FC473F)' }}>
                  3
                </div>
                <h3 className="text-xl mb-2">Lancez votre projet</h3>
                <p className="text-muted-foreground">
                  Acceptez le devis et suivez l'avancement des travaux
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-white" style={{ background: 'linear-gradient(to top, #FE734A, #FC473F)' }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl mb-6">
            Prêt à démarrer votre projet ?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Rejoignez notre communauté de particuliers et d'artisans passionnés par la préservation du patrimoine
          </p>
          <Link to={isAuthenticated ? "/tableau-de-bord" : "/connexion"}>
            <Button size="lg" className="bg-white hover:bg-white/90" style={{ color: '#FC473F' }}>
              Commencer maintenant
            </Button>
          </Link>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl text-center mb-12" style={{ background: 'linear-gradient(to top, #FE734A, #FC473F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Nos valeurs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="border-2 transition-colors" style={{ borderColor: 'transparent' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = '#FE734A'} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}>
                <CardContent className="pt-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full" style={{ background: 'linear-gradient(to top, rgba(254, 115, 74, 0.1), rgba(252, 71, 63, 0.1))' }}>
                      <value.icon className="h-8 w-8" style={{ color: '#FE734A' }} />
                    </div>
                  </div>
                  <h3 className="text-xl mb-2" style={{ background: 'linear-gradient(to top, #FE734A, #FC473F)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
