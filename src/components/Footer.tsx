import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Building2, Award, Shield, Hammer, ChevronRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#2C5F8D] text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Section À propos */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-5 w-5 text-[#FF8C42]" />
              <h3 className="text-lg font-semibold hover:text-[#FF8C42] transition-colors duration-300 cursor-default">
                À propos
              </h3>
            </div>
            <p className="text-sm text-white/80 mb-3 leading-relaxed">
              Connectant les particuliers avec les meilleurs artisans Compagnons du Devoir
              pour vos projets de rénovation.
            </p>
            <Link
              to="/a-propos"
              className="text-sm text-[#FF8C42] hover:text-white transition-all duration-300 inline-flex items-center gap-2 font-medium group"
            >
              <span>En savoir plus</span>
              <ChevronRight
                className="h-3 w-3 transition-transform duration-300"
                style={{ transform: 'translateX(0)' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
              />
            </Link>
          </div>

          {/* Section Contact */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Phone className="h-5 w-5 text-[#FF8C42]" />
              <h3 className="text-lg font-semibold hover:text-[#FF8C42] transition-colors duration-300 cursor-default">
                Contact
              </h3>
            </div>
            <div className="space-y-3 text-sm">
              <a
                href="mailto:contact@lesbonscompagnons.fr"
                className="flex items-center gap-3 text-white/80 hover:text-white transition-all duration-300 group"
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
              >
                <div
                  className="p-2 rounded-md transition-all duration-300"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FF8C42';
                    e.currentTarget.style.transform = 'scale(1.15)';
                    const icon = e.currentTarget.querySelector('svg');
                    if (icon) icon.style.color = '#2C5F8D';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.transform = 'scale(1)';
                    const icon = e.currentTarget.querySelector('svg');
                    if (icon) icon.style.color = '';
                  }}
                >
                  <Mail className="h-4 w-4" />
                </div>
                <span className="font-medium">contact@lesbonscompagnons.fr</span>
              </a>
              <a
                href="tel:0123456789"
                className="flex items-center gap-3 text-white/80 hover:text-white transition-all duration-300 group"
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
              >
                <div
                  className="p-2 rounded-md transition-all duration-300"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FF8C42';
                    e.currentTarget.style.transform = 'scale(1.15)';
                    const icon = e.currentTarget.querySelector('svg');
                    if (icon) icon.style.color = '#2C5F8D';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.transform = 'scale(1)';
                    const icon = e.currentTarget.querySelector('svg');
                    if (icon) icon.style.color = '';
                  }}
                >
                  <Phone className="h-4 w-4" />
                </div>
                <span className="font-medium">01 23 45 67 89</span>
              </a>
            </div>
          </div>

          {/* Section Valeurs */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Award className="h-5 w-5 text-[#FF8C42]" />
              <h3 className="text-lg font-semibold hover:text-[#FF8C42] transition-colors duration-300 cursor-default">
                Nos valeurs
              </h3>
            </div>
            <ul className="space-y-2 text-sm text-white/80">
              <li
                className="flex items-center gap-2 hover:text-white transition-all duration-300 cursor-pointer"
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
              >
                <div
                  className="p-1 rounded transition-all duration-300"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FF8C42';
                    const icon = e.currentTarget.querySelector('svg');
                    if (icon) icon.style.color = '#2C5F8D';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    const icon = e.currentTarget.querySelector('svg');
                    if (icon) icon.style.color = '#FF8C42';
                  }}
                >
                  <Hammer className="h-3 w-3 text-[#FF8C42]" />
                </div>
                <span>Savoir-faire traditionnel</span>
              </li>
              <li
                className="flex items-center gap-2 hover:text-white transition-all duration-300 cursor-pointer"
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
              >
                <div
                  className="p-1 rounded transition-all duration-300"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FF8C42';
                    const icon = e.currentTarget.querySelector('svg');
                    if (icon) icon.style.color = '#2C5F8D';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    const icon = e.currentTarget.querySelector('svg');
                    if (icon) icon.style.color = '#FF8C42';
                  }}
                >
                  <Award className="h-3 w-3 text-[#FF8C42]" />
                </div>
                <span>Qualité artisanale</span>
              </li>
              <li
                className="flex items-center gap-2 hover:text-white transition-all duration-300 cursor-pointer"
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
              >
                <div
                  className="p-1 rounded transition-all duration-300"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FF8C42';
                    const icon = e.currentTarget.querySelector('svg');
                    if (icon) icon.style.color = '#2C5F8D';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    const icon = e.currentTarget.querySelector('svg');
                    if (icon) icon.style.color = '#FF8C42';
                  }}
                >
                  <Shield className="h-3 w-3 text-[#FF8C42]" />
                </div>
                <span>Confiance et transparence</span>
              </li>
              <li
                className="flex items-center gap-2 hover:text-white transition-all duration-300 cursor-pointer"
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
              >
                <div
                  className="p-1 rounded transition-all duration-300"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FF8C42';
                    const icon = e.currentTarget.querySelector('svg');
                    if (icon) icon.style.color = '#2C5F8D';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    const icon = e.currentTarget.querySelector('svg');
                    if (icon) icon.style.color = '#FF8C42';
                  }}
                >
                  <Building2 className="h-3 w-3 text-[#FF8C42]" />
                </div>
                <span>Patrimoine préservé</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-white/20 pt-8 mb-6"></div>

        {/* Bas du footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/70">
          <p className="hover:text-white transition-colors duration-300 cursor-default">
            © 2026 Les bons compagnons. Tous droits réservés.
          </p>
          <p className="flex items-center gap-2">
            Fait par
            <span className="text-[#FF8C42] font-medium hover:text-white transition-colors duration-300 cursor-pointer">
              Mike Candeago
            </span>
            <span className="text-white/50">×</span>
            <span className="text-[#FF8C42] font-medium hover:text-white transition-colors duration-300 cursor-pointer">
              Matheo Poulain
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
