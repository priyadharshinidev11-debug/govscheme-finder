import React from 'react';
import { ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';

interface PrivacyPageProps {
  onNavigate: (view: string) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-3 border border-indigo-200">
            <Lock className="w-3.5 h-3.5" />
            <span>Privacy & Security</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Privacy Policy & Citizen Protection
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-3 max-w-2xl mx-auto leading-relaxed">
            How GovScheme Finder safeguards your demographic data and personal eligibility information.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          
          <section>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">1. Data Storage & Ownership</h2>
            <p>
              Your account profile data (such as name, age, state of residence, occupation, education level, and self-reported income) is stored exclusively within your secure, authenticated Firebase Firestore record. We do not sell, rent, monetize, or commercialize citizen information.
            </p>
          </section>

          <section>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">2. Purpose of Data Collection</h2>
            <p>
              The primary and only purpose of collecting citizen demographic information is to evaluate your criteria against government scheme rules to compute your eligibility status (Likely Eligible, Not Eligible, or Insufficient Information).
            </p>
          </section>

          <section>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">3. Role-Based Access Controls</h2>
            <p>
              Our Firestore security rules strictly prohibit any user from reading or modifying another user's personal profile or saved schemes. Administrative users are restricted to modifying scheme guidelines and verified department resources.
            </p>
          </section>

          <section>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">4. Zero Intermediary Policy</h2>
            <p>
              GovScheme Finder will never ask for your bank passwords, Aadhaar OTPs, UPI PINs, or processing fees. Official applications must be completed only on designated .gov.in or official state department portals provided in our verified links.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
};
