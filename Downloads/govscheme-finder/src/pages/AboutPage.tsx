import React from 'react';
import { Building2, ShieldCheck, CheckCircle2, Award, HeartHandshake, ExternalLink } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (view: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-3 border border-indigo-200">
            <Building2 className="w-3.5 h-3.5" />
            <span>Citizen Mission</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            About GovScheme Finder
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-3 max-w-2xl mx-auto leading-relaxed">
            Bridging the gap between Indian citizens and transformative government welfare programs through transparent discovery and algorithmic eligibility evaluation.
          </p>
        </div>

        {/* Content Cards */}
        <div className="space-y-8">
          
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl font-bold text-slate-900 mb-3">Our Core Purpose</h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              Every year, the Central Government and State Governments of India allocate hundreds of thousands of crores to welfare initiatives designed to support farmers, students, women entrepreneurs, artisans, low-income households, and senior citizens. However, a significant barrier remains awareness and understanding of complex eligibility criteria.
            </p>
            <p className="text-sm text-slate-700 leading-relaxed mt-3">
              GovScheme Finder was created to provide a clean, accessible, single-window service where citizens can understand if they meet the foundational conditions for schemes before spending hours in physical queues or navigating complex government websites.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Our Methodology</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="font-bold text-indigo-700 block">1. Official Document Parsing</span>
                <p className="text-slate-600 leading-relaxed">
                  Criteria are extracted directly from official notifications, gazettes, guidelines, and department portals (e.g. data.gov.in, india.gov.in, National Scholarship Portal).
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="font-bold text-indigo-700 block">2. Structured Rules Engine</span>
                <p className="text-slate-600 leading-relaxed">
                  Criteria are stored as atomic, verifiable attributes (exact age ranges, income caps, specific educational stages) allowing deterministic comparison.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="font-bold text-indigo-700 block">3. Boundary Accuracy</span>
                <p className="text-slate-600 leading-relaxed">
                  Strict mathematical boundary inclusion ensures candidates at the exact threshold (e.g. age 25 or income ₹2,50,000) are evaluated accurately.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="font-bold text-indigo-700 block">4. Direct Official Redirects</span>
                <p className="text-slate-600 leading-relaxed">
                  We never charge citizens or act as a middleman for scheme sanctions; citizens are provided direct links to official Ministry portals to submit their applications.
                </p>
              </div>
            </div>
          </div>

          {/* Statutory Notice */}
          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-950 leading-relaxed">
            <h3 className="font-bold text-amber-900 text-base mb-1">Important Citizen Notice</h3>
            <p>
              GovScheme Finder is an independent public digital service platform. We are not a government agency. Eligibility outcomes on this website are algorithmic estimates provided for educational and advisory guidance. The final legal authority to sanction schemes, evaluate reservations, verify documentation, and disburse subsidies rests exclusively with the relevant Ministry or District Administrative Authority.
            </p>
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => onNavigate('schemes')}
              className="px-6 py-3 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-colors"
            >
              Explore the Schemes Directory
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
