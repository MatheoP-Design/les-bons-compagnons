import React from 'react';
import { Heart, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#2C5F8D] text-white mt-auto">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4">À propos</h3>
            <p className="text-sm text-white/80">
              Les bons compagnons - Connectant les particuliers avec les meilleurs artisans pour vos projets de rénovation.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Contact</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>contact@lesbonscompagnons.fr</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>01 23 45 67 89</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Nos valeurs</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>• Savoir-faire traditionnel</li>
              <li>• Qualité artisanale</li>
              <li>• Confiance et transparence</li>
              <li>• Patrimoine préservé</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/80">
          <p>© 2026 Les bons compagnons. Tous droits réservés.</p>
          <p className="mt-2 flex items-center justify-center gap-1">
            Fait avec <Heart className="h-4 w-4 text-[#FF8C42]" /> par des passionnés du patrimoine
          </p>
        </div>
      </div>
    </footer>
  );
}
