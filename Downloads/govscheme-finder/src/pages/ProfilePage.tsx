import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  IndianRupee, 
  ShieldCheck, 
  Save, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { INDIAN_STATES, OCCUPATIONS, EDUCATION_LEVELS } from '../data/seedSchemes';

interface ProfilePageProps {
  onNavigate: (view: string, param?: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const { user, profile, updateProfileData } = useAuth();

  const [displayName, setDisplayName] = useState('');
  const [age, setAge] = useState<number | string>('');
  const [gender, setGender] = useState<string>('Male');
  const [stateVal, setStateVal] = useState<string>('All States');
  const [district, setDistrict] = useState('');
  const [occupation, setOccupation] = useState('');
  const [education, setEducation] = useState('');
  const [annualIncome, setAnnualIncome] = useState<number | string>('');
  const [socialCategory, setSocialCategory] = useState<string>('General');

  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName || '');
      setAge(profile.age ?? '');
      setGender(profile.gender || 'Male');
      setStateVal(profile.state || 'Tamil Nadu');
      setDistrict(profile.district || '');
      setOccupation(profile.occupation || 'Student');
      setEducation(profile.education || 'Undergraduate / Bachelor Degree');
      setAnnualIncome(profile.annualIncome ?? '');
      setSocialCategory(profile.socialCategory || 'General');
    }
  }, [profile]);

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50/50 py-16 px-4 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center max-w-md w-full shadow-xs">
          <User className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-slate-900">Sign in to manage profile</h2>
          <p className="text-xs text-slate-500 mt-1 mb-6 leading-relaxed">
            Please log in or register to access and update your citizen eligibility profile.
          </p>
          <button
            onClick={() => onNavigate('login')}
            className="w-full py-2.5 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    try {
      await updateProfileData({
        displayName: displayName.trim() || 'Citizen',
        age: age !== '' ? Number(age) : undefined,
        gender: gender as any,
        state: stateVal,
        district: district.trim(),
        occupation,
        education,
        annualIncome: annualIncome !== '' ? Number(annualIncome) : undefined,
        socialCategory: socialCategory as any
      });
      setFeedback({ type: 'success', message: 'Citizen profile successfully updated in Firestore!' });
      setTimeout(() => setFeedback(null), 4000);
    } catch (err: any) {
      setFeedback({ type: 'error', message: err?.message || 'Failed to update profile. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-xs font-semibold text-indigo-700 uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span>Citizen Profile Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Citizen Profile
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Information stored in your profile is used to automatically evaluate eligibility and recommend tailored government welfare schemes.
          </p>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div className={`mb-6 p-4 rounded-xl border text-xs sm:text-sm flex items-center space-x-2.5 ${
            feedback.type === 'success' 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}>
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            )}
            <span className="font-medium">{feedback.message}</span>
          </div>
        )}

        {/* Profile Form Card */}
        <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          
          {/* Account Overview Bar */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-indigo-700 text-white font-bold text-lg flex items-center justify-center shadow-xs">
                {profile?.displayName?.charAt(0) || user.email?.charAt(0).toUpperCase() || 'C'}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">{profile?.displayName || 'Citizen'}</h3>
                <p className="text-xs text-slate-500">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                profile?.role === 'admin' ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'
              }`}>
                Role: {profile?.role === 'admin' ? 'Administrator' : 'Citizen'}
              </span>
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* Display Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="profile-input-name"
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              />
            </div>

            {/* Email (Readonly) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Email Address (Account Identifier)
              </label>
              <input
                type="email"
                disabled
                value={user.email || ''}
                className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-500 cursor-not-allowed"
              />
            </div>

            {/* Age */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Age (Years)
              </label>
              <input
                id="profile-input-age"
                type="number"
                min="0"
                max="120"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="e.g. 24"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Gender
              </label>
              <select
                id="profile-select-gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Transgender">Transgender</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            {/* State */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                State / Union Territory
              </label>
              <select
                id="profile-select-state"
                value={stateVal}
                onChange={(e) => setStateVal(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              >
                {INDIAN_STATES.filter(s => s !== 'All States').map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            {/* District */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                District / City (Optional)
              </label>
              <input
                id="profile-input-district"
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="e.g. Chennai, Coimbatore, Patna"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              />
            </div>

            {/* Occupation */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Primary Occupation / Vocation
              </label>
              <select
                id="profile-select-occupation"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              >
                {OCCUPATIONS.filter(o => o !== 'Any').map(occ => (
                  <option key={occ} value={occ}>{occ}</option>
                ))}
              </select>
            </div>

            {/* Education */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Educational Qualification
              </label>
              <select
                id="profile-select-education"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              >
                {EDUCATION_LEVELS.filter(ed => ed !== 'Any').map(ed => (
                  <option key={ed} value={ed}>{ed}</option>
                ))}
              </select>
            </div>

            {/* Annual Income */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Annual Family Income (₹)
              </label>
              <input
                id="profile-input-income"
                type="number"
                step="10000"
                value={annualIncome}
                onChange={(e) => setAnnualIncome(e.target.value)}
                placeholder="e.g. 200000"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Used to determine EWS / low-income / BPL eligibility thresholds.
              </span>
            </div>

            {/* Social Category */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Social / Reservation Category
              </label>
              <select
                id="profile-select-social-category"
                value={socialCategory}
                onChange={(e) => setSocialCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              >
                <option value="General">General</option>
                <option value="OBC">OBC (Other Backward Classes)</option>
                <option value="SC">SC (Scheduled Caste)</option>
                <option value="ST">ST (Scheduled Tribe)</option>
                <option value="EWS">EWS (Economically Weaker Section)</option>
                <option value="Minority">Minority Community</option>
              </select>
            </div>

          </div>

          {/* Privacy Note */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
            🔒 <strong>Data Protection:</strong> Your personal profile data is securely stored in your private Firestore record and used exclusively to calculate local eligibility assessments. We do not sell or transfer citizen data to third parties.
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => onNavigate('eligibility')}
              className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 flex items-center space-x-1"
            >
              <span>Test My Eligibility with Current Values</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              id="profile-submit-btn"
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto px-6 py-2.5 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving Profile...' : 'Save Profile Changes'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
