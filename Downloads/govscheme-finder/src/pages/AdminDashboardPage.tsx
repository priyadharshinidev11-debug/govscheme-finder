import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Layers, 
  Sparkles, 
  RefreshCw,
  Eye,
  Sliders,
  Building,
  Database,
  FileJson,
  Copy,
  Check,
  HardDrive,
  Users,
  Bookmark,
  Server,
  Code2,
  Table
} from 'lucide-react';
import { Scheme, SchemeCategory, SchemeEligibility } from '../types';
import { useAuth } from '../context/AuthContext';
import { 
  createScheme, 
  updateScheme, 
  deleteScheme, 
  createCategory,
  resetToSeedData,
  getFirestoreCollectionData,
  getFirestoreOverviewStats
} from '../services/schemeService';
import { firebaseConfigData } from '../firebase/config';
import { INDIAN_STATES, OCCUPATIONS, EDUCATION_LEVELS } from '../data/seedSchemes';

interface AdminDashboardPageProps {
  schemes: Scheme[];
  categories: SchemeCategory[];
  onRefreshData: () => Promise<void>;
  onNavigate: (view: string, param?: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  schemes,
  categories,
  onRefreshData,
  onNavigate
}) => {
  const { user, profile } = useAuth();

  const [activeTab, setActiveTab] = useState<'schemes' | 'categories' | 'database'>('schemes');
  const [searchTerm, setSearchTerm] = useState('');
  const [modalMode, setModalMode] = useState<'create' | 'edit' | null>(null);
  const [editingScheme, setEditingScheme] = useState<Scheme | null>(null);

  // Database Explorer State
  const [dbSelectedCollection, setDbSelectedCollection] = useState<'schemes' | 'categories' | 'users' | 'savedSchemes'>('schemes');
  const [dbDocuments, setDbDocuments] = useState<{ id: string; data: Record<string, any> }[]>([]);
  const [dbLoadingDocs, setDbLoadingDocs] = useState(false);
  const [dbStats, setDbStats] = useState<{
    schemesCount: number;
    categoriesCount: number;
    usersCount: number;
    savedSchemesCount: number;
    isOnline: boolean;
  } | null>(null);
  const [selectedJsonDoc, setSelectedJsonDoc] = useState<{ id: string; collection: string; data: Record<string, any> } | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showSyncConfirmModal, setShowSyncConfirmModal] = useState(false);
  const [dbSearchTerm, setDbSearchTerm] = useState('');
  
  // Category Modal
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [catName, setCatName] = useState('');
  const [catDesc, setCatDesc] = useState('');
  const [catIcon, setCatIcon] = useState('Layers');

  // Loading & feedback states
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Scheme Form State
  const [formName, setFormName] = useState('');
  const [formShortDesc, setFormShortDesc] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formObjective, setFormObjective] = useState('');
  const [formCategoryId, setFormCategoryId] = useState(categories[0]?.id || '');
  const [formDept, setFormDept] = useState('');
  const [formMinistry, setFormMinistry] = useState('');
  const [formKeyBenefit, setFormKeyBenefit] = useState('');
  const [formBenefitsText, setFormBenefitsText] = useState('');
  const [formDocsText, setFormDocsText] = useState('');
  const [formProcessText, setFormProcessText] = useState('');
  const [formAppMethod, setFormAppMethod] = useState<'Official Ministry Portal' | 'State Portal' | 'Offline / Common Service Centre (CSC)' | 'Online' | 'Offline'>('Official Ministry Portal');
  const [formOfficialUrl, setFormOfficialUrl] = useState('');
  const [formSourceUrl, setFormSourceUrl] = useState('');
  const [formApplicationUrl, setFormApplicationUrl] = useState('');
  const [formSourceName, setFormSourceName] = useState('');
  const [formStatus, setFormStatus] = useState<'active' | 'inactive'>('active');
  const [formFeatured, setFormFeatured] = useState(false);
  const [formVerification, setFormVerification] = useState<'Draft' | 'Needs Review' | 'Verified' | 'Inactive'>('Verified');

  // Structured Eligibility Form State
  const [elMinAge, setElMinAge] = useState<string>('');
  const [elMaxAge, setElMaxAge] = useState<string>('');
  const [elMinIncome, setElMinIncome] = useState<string>('');
  const [elMaxIncome, setElMaxIncome] = useState<string>('');
  const [elStates, setElStates] = useState<string>('All States');
  const [elOccupations, setElOccupations] = useState<string>('Any');
  const [elEducation, setElEducation] = useState<string>('Any');
  const [elGenders, setElGenders] = useState<string>('All');
  const [elBeneficiaries, setElBeneficiaries] = useState<string>('All Citizens');
  const [elOtherRequirementsText, setElOtherRequirementsText] = useState<string>('');

  // Check Admin Authorization
  if (!user || profile?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-slate-50/50 py-16 px-4 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center max-w-md w-full shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Administrator Access Required</h2>
          <p className="text-xs text-slate-500 mt-1 mb-6 leading-relaxed">
            The scheme management and verification dashboard is restricted to authorized administrators.
          </p>
          <div className="space-y-2">
            <button
              onClick={() => onNavigate('login')}
              className="w-full py-2.5 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
            >
              Sign In with Authorized Account
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="w-full py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-200"
            >
              Back to Citizen Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Populate form for create/edit
  const openCreateModal = () => {
    setEditingScheme(null);
    setFormName('');
    setFormShortDesc('');
    setFormDesc('');
    setFormObjective('');
    setFormCategoryId(categories[0]?.id || '');
    setFormDept('');
    setFormMinistry('');
    setFormKeyBenefit('');
    setFormBenefitsText('');
    setFormDocsText('');
    setFormProcessText('');
    setFormAppMethod('Official Ministry Portal');
    setFormOfficialUrl('');
    setFormSourceUrl('');
    setFormApplicationUrl('');
    setFormSourceName('');
    setFormStatus('active');
    setFormFeatured(false);
    setFormVerification('Verified');

    setElMinAge('');
    setElMaxAge('');
    setElMinIncome('');
    setElMaxIncome('');
    setElStates('All States');
    setElOccupations('Any');
    setElEducation('Any');
    setElGenders('All');
    setElBeneficiaries('All Citizens');
    setElOtherRequirementsText('');

    setModalMode('create');
  };

  const openEditModal = (scheme: Scheme) => {
    setEditingScheme(scheme);
    setFormName(scheme.name);
    setFormShortDesc(scheme.shortDescription);
    setFormDesc(scheme.description);
    setFormObjective(scheme.objective);
    setFormCategoryId(scheme.categoryId);
    setFormDept(scheme.department);
    setFormMinistry(scheme.ministry || '');
    setFormKeyBenefit(scheme.keyBenefit);
    setFormBenefitsText(scheme.benefits.join('\n'));
    setFormDocsText(scheme.requiredDocuments.join('\n'));
    setFormProcessText(scheme.applicationProcess.join('\n'));
    setFormAppMethod(scheme.applicationMethod as any);
    setFormOfficialUrl(scheme.officialUrl);
    setFormSourceUrl(scheme.sourceUrl || scheme.officialUrl);
    setFormApplicationUrl(scheme.applicationUrl || scheme.officialUrl);
    setFormSourceName(scheme.sourceName);
    setFormStatus(scheme.status);
    setFormFeatured(scheme.featured);
    setFormVerification(scheme.verificationStatus);

    const el = scheme.eligibility;
    setElMinAge(el.minimumAge !== null && el.minimumAge !== undefined ? String(el.minimumAge) : '');
    setElMaxAge(el.maximumAge !== null && el.maximumAge !== undefined ? String(el.maximumAge) : '');
    setElMinIncome(el.incomeMinimum !== null && el.incomeMinimum !== undefined ? String(el.incomeMinimum) : '');
    setElMaxIncome(el.incomeMaximum !== null && el.incomeMaximum !== undefined ? String(el.incomeMaximum) : '');
    setElStates(el.allowedStates.join(', '));
    setElOccupations(el.allowedOccupations.join(', '));
    setElEducation(el.allowedEducationLevels.join(', '));
    setElGenders(el.allowedGenders.join(', '));
    setElBeneficiaries(el.beneficiaryTypes?.join(', ') || 'All Citizens');
    setElOtherRequirementsText(el.otherRequirements ? el.otherRequirements.join('\n') : '');

    setModalMode('edit');
  };

  const handleSaveScheme = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    // Validation checks
    if (!formName.trim() || !formDept.trim() || !formKeyBenefit.trim()) {
      setFeedback({ type: 'error', message: 'Name, Department, and Key Benefit are required.' });
      setLoading(false);
      return;
    }

    const officialUrl = formOfficialUrl.trim() || formSourceUrl.trim();
    if (!officialUrl.startsWith('http://') && !officialUrl.startsWith('https://')) {
      setFeedback({ type: 'error', message: 'Official URL must start with http:// or https://' });
      setLoading(false);
      return;
    }

    if (elMinAge !== '' && elMaxAge !== '') {
      if (Number(elMinAge) > Number(elMaxAge)) {
        setFeedback({ type: 'error', message: 'Minimum age cannot be greater than maximum age.' });
        setLoading(false);
        return;
      }
    }

    if (elMinIncome !== '' && elMaxIncome !== '') {
      if (Number(elMinIncome) > Number(elMaxIncome)) {
        setFeedback({ type: 'error', message: 'Minimum income cannot be greater than maximum income.' });
        setLoading(false);
        return;
      }
    }

    const selectedCat = categories.find(c => c.id === formCategoryId);

    const eligibilityObj: SchemeEligibility = {
      minimumAge: elMinAge !== '' ? Number(elMinAge) : null,
      maximumAge: elMaxAge !== '' ? Number(elMaxAge) : null,
      incomeMinimum: elMinIncome !== '' ? Number(elMinIncome) : null,
      incomeMaximum: elMaxIncome !== '' ? Number(elMaxIncome) : null,
      allowedStates: elStates.split(',').map(s => s.trim()).filter(Boolean),
      allowedOccupations: elOccupations.split(',').map(s => s.trim()).filter(Boolean),
      allowedEducationLevels: elEducation.split(',').map(s => s.trim()).filter(Boolean),
      allowedGenders: elGenders.split(',').map(s => s.trim()).filter(Boolean),
      beneficiaryTypes: elBeneficiaries.split(',').map(s => s.trim()).filter(Boolean),
      otherRequirements: elOtherRequirementsText.split('\n').map(s => s.trim()).filter(Boolean)
    };

    const schemeData: Omit<Scheme, 'id'> = {
      name: formName.trim(),
      shortDescription: formShortDesc.trim() || formName.trim(),
      description: formDesc.trim() || formShortDesc.trim() || formName.trim(),
      objective: formObjective.trim() || formShortDesc.trim(),
      categoryId: formCategoryId,
      categoryName: selectedCat?.name || 'General Welfare',
      department: formDept.trim(),
      ministry: formMinistry.trim() || undefined,
      keyBenefit: formKeyBenefit.trim(),
      benefits: formBenefitsText.split('\n').map(s => s.trim()).filter(Boolean),
      eligibility: eligibilityObj,
      requiredDocuments: formDocsText.split('\n').map(s => s.trim()).filter(Boolean),
      applicationProcess: formProcessText.split('\n').map(s => s.trim()).filter(Boolean),
      applicationMethod: formAppMethod,
      officialUrl: officialUrl,
      sourceName: formSourceName.trim() || 'Official Department Portal',
      sourceUrl: formSourceUrl.trim() || officialUrl,
      applicationUrl: formApplicationUrl.trim() || officialUrl,
      verificationStatus: formVerification,
      status: formStatus,
      featured: formFeatured,
      lastVerifiedAt: new Date().toISOString().split('T')[0],
      verifiedBy: profile?.displayName || 'Administrator'
    };

    try {
      if (modalMode === 'create') {
        await createScheme(schemeData);
        setFeedback({ type: 'success', message: 'New government scheme successfully created!' });
      } else if (modalMode === 'edit' && editingScheme) {
        await updateScheme(editingScheme.id, schemeData);
        setFeedback({ type: 'success', message: 'Scheme record successfully updated!' });
      }
      await onRefreshData();
      setModalMode(null);
    } catch (err: any) {
      console.error('Error saving scheme:', err);
      setFeedback({ type: 'error', message: err.message || 'Failed to save scheme.' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteScheme = async (schemeId: string) => {
    setLoading(true);
    try {
      await deleteScheme(schemeId);
      setFeedback({ type: 'success', message: 'Scheme record permanently deleted from database.' });
      setDeleteConfirmId(null);
      await onRefreshData();
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Failed to delete scheme.' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivateScheme = async (schemeId: string) => {
    setLoading(true);
    try {
      await updateScheme(schemeId, { status: 'inactive' });
      setFeedback({ type: 'success', message: 'Scheme marked as inactive (hidden from active public matching).' });
      setDeleteConfirmId(null);
      await onRefreshData();
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Failed to deactivate scheme.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) return;
    setLoading(true);
    try {
      await createCategory({
        name: catName.trim(),
        description: catDesc.trim(),
        iconName: catIcon
      });
      setCatName('');
      setCatDesc('');
      setShowCategoryModal(false);
      setFeedback({ type: 'success', message: 'Category successfully added!' });
      await onRefreshData();
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Failed to create category.' });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const loadCollectionDocs = async (collName: 'schemes' | 'categories' | 'users' | 'savedSchemes') => {
    setDbLoadingDocs(true);
    setDbSelectedCollection(collName);
    try {
      const docs = await getFirestoreCollectionData(collName);
      setDbDocuments(docs);
    } catch (err: any) {
      console.warn('Could not fetch directly from collection:', err);
      if (collName === 'schemes') {
        setDbDocuments(schemes.map(s => ({ id: s.id, data: s })));
      } else if (collName === 'categories') {
        setDbDocuments(categories.map(c => ({ id: c.id, data: c })));
      } else {
        setDbDocuments([]);
      }
    } finally {
      setDbLoadingDocs(false);
    }
  };

  const refreshDbStats = async () => {
    try {
      const stats = await getFirestoreOverviewStats();
      setDbStats(stats);
    } catch (err) {
      console.warn('Could not refresh Firestore stats:', err);
    }
  };

  const handleSyncToFirestore = async () => {
    setLoading(true);
    setShowSyncConfirmModal(false);
    try {
      await resetToSeedData();
      await onRefreshData();
      await refreshDbStats();
      await loadCollectionDocs(dbSelectedCollection);
      setFeedback({ 
        type: 'success', 
        message: 'Successfully synchronized catalog to live Firestore database! Schemes and categories are now physically populated in Firestore.' 
      });
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Database synchronization failed.' });
    } finally {
      setLoading(false);
    }
  };

  const filteredSchemes = schemes.filter(s => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return s.name.toLowerCase().includes(q) || 
           s.department.toLowerCase().includes(q) || 
           s.categoryName.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] py-6 sm:py-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Panel */}
        <div className="p-6 bg-white border border-slate-200 rounded-xl mb-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-700 uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>Administrator Dashboard</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              GovScheme Finder Scheme Management
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Add, audit, modify structured eligibility rules, and verify central & state welfare programs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              id="admin-btn-sync-database"
              onClick={() => setShowSyncConfirmModal(true)}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-md shadow-2xs transition-colors flex items-center gap-1.5"
              title="Batch sync verified scheme & category data into live Firestore"
            >
              <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sync to Firestore</span>
            </button>

            <button
              id="admin-btn-add-category"
              onClick={() => setShowCategoryModal(true)}
              className="px-3 py-1.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-800 text-xs font-semibold rounded-md shadow-2xs transition-colors flex items-center gap-1"
            >
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              <span>Add Category</span>
            </button>

            <button
              id="admin-btn-add-scheme"
              onClick={openCreateModal}
              className="px-3.5 py-1.5 bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Scheme</span>
            </button>
          </div>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div className={`mb-5 p-3 rounded-lg border text-xs flex items-center gap-2.5 ${
            feedback.type === 'success' 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}>
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span className="font-medium">{feedback.message}</span>
          </div>
        )}

        {/* Overview Stats (High Density 4-card metric row) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Schemes</span>
            <p className="text-xl font-bold text-slate-900 mt-0.5">{schemes.length}</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Active Schemes</span>
            <p className="text-xl font-bold text-emerald-900 mt-0.5">
              {schemes.filter(s => s.status === 'active').length}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Flagship Schemes</span>
            <p className="text-xl font-bold text-amber-900 mt-0.5">
              {schemes.filter(s => s.featured).length}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">Categories</span>
            <p className="text-xl font-bold text-indigo-900 mt-0.5">{categories.length}</p>
          </div>
        </div>

        {/* Tab Selector & Search */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs mb-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            
            <div className="flex flex-wrap items-center gap-2">
              <button
                id="admin-tab-schemes"
                onClick={() => setActiveTab('schemes')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors flex items-center gap-1.5 ${
                  activeTab === 'schemes' 
                    ? 'bg-indigo-700 text-white shadow-2xs' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Building className="w-3.5 h-3.5" />
                <span>Government Schemes ({schemes.length})</span>
              </button>
              <button
                id="admin-tab-categories"
                onClick={() => setActiveTab('categories')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors flex items-center gap-1.5 ${
                  activeTab === 'categories' 
                    ? 'bg-indigo-700 text-white shadow-2xs' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Categories ({categories.length})</span>
              </button>
              <button
                id="admin-tab-database"
                onClick={() => {
                  setActiveTab('database');
                  loadCollectionDocs(dbSelectedCollection);
                  refreshDbStats();
                }}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors flex items-center gap-1.5 ${
                  activeTab === 'database' 
                    ? 'bg-indigo-700 text-white shadow-2xs' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Database className="w-3.5 h-3.5 text-emerald-500" />
                <span>Live Database Explorer</span>
              </button>
            </div>

            {activeTab === 'schemes' && (
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search admin records..."
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            )}

          </div>
        </div>

        {/* SCHEMES TABLE (High Density Style) */}
        {activeTab === 'schemes' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="px-4 py-2.5">Scheme Details</th>
                    <th className="px-3 py-2.5">Category</th>
                    <th className="px-3 py-2.5">Key Benefit</th>
                    <th className="px-3 py-2.5">Eligibility Conditions</th>
                    <th className="px-3 py-2.5 text-center">Status</th>
                    <th className="px-4 py-2.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredSchemes.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                      
                      {/* Name & Ministry */}
                      <td className="px-4 py-3 max-w-xs">
                        <div className="font-bold text-slate-900 text-xs sm:text-sm">{s.name}</div>
                        <div className="text-[11px] text-slate-500 truncate mt-0.5">{s.department}</div>
                        <div className="flex items-center gap-2 mt-1">
                          {s.featured && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 uppercase">
                              ★ Flagship
                            </span>
                          )}
                          <a
                            href={s.officialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-indigo-600 hover:underline inline-flex items-center gap-1"
                          >
                            <span>Official Portal</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-3 py-3 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-indigo-50 text-indigo-700 border border-indigo-200">
                          {s.categoryName}
                        </span>
                      </td>

                      {/* Key Benefit */}
                      <td className="px-3 py-3 max-w-xs text-slate-700">
                        <p className="line-clamp-2 text-xs leading-relaxed">{s.keyBenefit}</p>
                      </td>

                      {/* Eligibility Rules */}
                      <td className="px-3 py-3 text-slate-600 max-w-xs">
                        <div className="space-y-0.5 text-[11px]">
                          <div>
                            Age: <strong>
                              {s.eligibility.minimumAge !== null || s.eligibility.maximumAge !== null
                                ? `${s.eligibility.minimumAge ?? 0} - ${s.eligibility.maximumAge ?? 'No limit'}`
                                : 'Any'}
                            </strong>
                          </div>
                          <div>
                            Max Income: <strong>
                              {s.eligibility.incomeMaximum ? `₹${s.eligibility.incomeMaximum.toLocaleString('en-IN')}` : 'No limit'}
                            </strong>
                          </div>
                          <div className="truncate">
                            States: <strong>{s.eligibility.allowedStates?.join(', ')}</strong>
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-3 py-3 whitespace-nowrap text-center">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          s.status === 'active' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {s.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => onNavigate('scheme-details', s.id)}
                            title="View Public Details"
                            className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-md hover:bg-slate-100"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            id={`admin-edit-scheme-${s.id}`}
                            onClick={() => openEditModal(s)}
                            title="Edit Scheme Record"
                            className="p-1.5 text-slate-600 hover:text-indigo-700 rounded-md hover:bg-indigo-50"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          <button
                            id={`admin-delete-scheme-${s.id}`}
                            onClick={() => setDeleteConfirmId(s.id)}
                            title="Delete Scheme Record"
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md hover:bg-rose-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CATEGORIES TABLE */}
        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((c) => (
              <div key={c.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-base">{c.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    Icon: {c.iconName}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{c.description}</p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span>ID: {c.id}</span>
                  <span className="text-indigo-600 font-semibold">
                    {schemes.filter(s => s.categoryId === c.id).length} Schemes
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* DATABASE EXPLORER TAB */}
        {activeTab === 'database' && (
          <div className="space-y-6">
            {/* Live Firestore Connection Banner */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold text-slate-900">Cloud Firestore Production Database</h2>
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Live & Connected
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Direct connection to your provisioned NoSQL Firestore database instance with rule-level security.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => {
                      loadCollectionDocs(dbSelectedCollection);
                      refreshDbStats();
                    }}
                    disabled={dbLoadingDocs}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${dbLoadingDocs ? 'animate-spin' : ''}`} />
                    <span>Refresh Live Data</span>
                  </button>

                  <button
                    onClick={() => setShowSyncConfirmModal(true)}
                    className="px-3.5 py-1.5 bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <HardDrive className="w-3.5 h-3.5 text-indigo-200" />
                    <span>Sync / Seed All Data</span>
                  </button>
                </div>
              </div>

              {/* Database Parameter Attributes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="p-3 bg-slate-50/80 rounded-lg border border-slate-200/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Database ID</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs font-mono font-medium text-slate-800 truncate" title={firebaseConfigData.firestoreDatabaseId}>
                      {firebaseConfigData.firestoreDatabaseId || '(default)'}
                    </span>
                    <button
                      onClick={() => copyToClipboard(firebaseConfigData.firestoreDatabaseId || '', 'dbId')}
                      className="text-slate-400 hover:text-indigo-600 p-1 rounded"
                      title="Copy Database ID"
                    >
                      {copiedField === 'dbId' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-slate-50/80 rounded-lg border border-slate-200/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">GCP Project</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs font-mono font-medium text-slate-800 truncate" title={firebaseConfigData.projectId}>
                      {firebaseConfigData.projectId}
                    </span>
                    <button
                      onClick={() => copyToClipboard(firebaseConfigData.projectId || '', 'projectId')}
                      className="text-slate-400 hover:text-indigo-600 p-1 rounded"
                      title="Copy Project ID"
                    >
                      {copiedField === 'projectId' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-slate-50/80 rounded-lg border border-slate-200/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Firebase Console Link</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs font-medium text-indigo-700 truncate">
                      console.firebase.google.com
                    </span>
                    <button
                      onClick={() => {
                        const consoleUrl = `https://console.firebase.google.com/project/${firebaseConfigData.projectId}/firestore/databases/${firebaseConfigData.firestoreDatabaseId}/data`;
                        copyToClipboard(consoleUrl, 'consoleUrl');
                      }}
                      className="text-slate-400 hover:text-indigo-600 p-1 rounded flex items-center gap-1 text-[11px]"
                      title="Copy Firebase Console URL"
                    >
                      {copiedField === 'consoleUrl' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Collection Selector Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => loadCollectionDocs('schemes')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  dbSelectedCollection === 'schemes'
                    ? 'bg-indigo-50/50 border-indigo-400 ring-2 ring-indigo-200 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-indigo-600" />
                    schemes
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 font-bold">
                    {dbStats?.schemesCount ?? schemes.length} docs
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">Government schemes catalog with eligibility criteria</p>
              </button>

              <button
                onClick={() => loadCollectionDocs('categories')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  dbSelectedCollection === 'categories'
                    ? 'bg-indigo-50/50 border-indigo-400 ring-2 ring-indigo-200 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-600" />
                    categories
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 font-bold">
                    {dbStats?.categoriesCount ?? categories.length} docs
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">Sector classification & icon associations</p>
              </button>

              <button
                onClick={() => loadCollectionDocs('users')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  dbSelectedCollection === 'users'
                    ? 'bg-indigo-50/50 border-indigo-400 ring-2 ring-indigo-200 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-indigo-600" />
                    users
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 font-bold">
                    {dbStats?.usersCount ?? 0} docs
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">Citizen accounts, demographic profiles & RBAC roles</p>
              </button>

              <button
                onClick={() => loadCollectionDocs('savedSchemes')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  dbSelectedCollection === 'savedSchemes'
                    ? 'bg-indigo-50/50 border-indigo-400 ring-2 ring-indigo-200 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Bookmark className="w-3.5 h-3.5 text-indigo-600" />
                    savedSchemes
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 font-bold">
                    {dbStats?.savedSchemesCount ?? 0} docs
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">Saved bookmarks & citizen application trackers</p>
              </button>
            </div>

            {/* Document Browser Table for Selected Collection */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
                <div className="flex items-center gap-2">
                  <Table className="w-4 h-4 text-indigo-600" />
                  <span className="text-xs font-bold text-slate-800">
                    Collection: <span className="font-mono text-indigo-700">/{dbSelectedCollection}</span>
                  </span>
                  <span className="text-[11px] text-slate-500">
                    ({dbDocuments.length} documents loaded)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      value={dbSearchTerm}
                      onChange={(e) => setDbSearchTerm(e.target.value)}
                      placeholder={`Filter /${dbSelectedCollection} records...`}
                      className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <button
                    onClick={() => {
                      const allJson = JSON.stringify(dbDocuments.map(d => ({ id: d.id, ...d.data })), null, 2);
                      copyToClipboard(allJson, 'allCollectionJson');
                    }}
                    className="px-2.5 py-1.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-semibold rounded-md shadow-2xs transition-colors flex items-center gap-1 shrink-0"
                    title="Copy full collection array as JSON"
                  >
                    {copiedField === 'allCollectionJson' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <FileJson className="w-3.5 h-3.5 text-indigo-600" />
                    )}
                    <span className="hidden sm:inline">Export JSON</span>
                  </button>
                </div>
              </div>

              {dbLoadingDocs ? (
                <div className="p-12 text-center text-slate-500 flex flex-col items-center justify-center">
                  <RefreshCw className="w-6 h-6 animate-spin text-indigo-600 mb-2" />
                  <span className="text-xs font-medium">Fetching documents from Firestore...</span>
                </div>
              ) : dbDocuments.length === 0 ? (
                <div className="p-12 text-center text-slate-500 flex flex-col items-center justify-center">
                  <Database className="w-8 h-8 text-slate-300 mb-2" />
                  <span className="text-xs font-semibold text-slate-700">No documents in /{dbSelectedCollection} yet</span>
                  <p className="text-[11px] text-slate-400 max-w-sm mt-1 mb-4">
                    The collection is currently empty in Firestore. Click "Sync / Seed All Data" to write official data into Firestore.
                  </p>
                  <button
                    onClick={() => setShowSyncConfirmModal(true)}
                    className="px-3.5 py-1.5 bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-semibold rounded-lg shadow-xs"
                  >
                    Populate Firestore Now
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-600">
                    <thead className="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-4">Document ID</th>
                        <th className="py-2.5 px-4">Primary Attribute</th>
                        <th className="py-2.5 px-4">Secondary Attribute</th>
                        <th className="py-2.5 px-4">Status / Role</th>
                        <th className="py-2.5 px-4">Timestamp</th>
                        <th className="py-2.5 px-4 text-right">Inspect</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-normal">
                      {dbDocuments
                        .filter(docItem => {
                          if (!dbSearchTerm.trim()) return true;
                          const q = dbSearchTerm.toLowerCase();
                          return docItem.id.toLowerCase().includes(q) ||
                            JSON.stringify(docItem.data).toLowerCase().includes(q);
                        })
                        .map((docItem) => {
                          const d = docItem.data;
                          const primary = d.name || d.displayName || d.schemeName || '—';
                          const secondary = d.department || d.email || d.categoryName || d.description || '—';
                          const status = d.verificationStatus || d.role || d.status || 'Active';
                          const timestamp = d.updatedAt || d.createdAt || d.savedAt || '—';

                          return (
                            <tr key={docItem.id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="py-2.5 px-4 font-mono text-[11px] text-indigo-900 font-semibold max-w-[180px] truncate">
                                <div className="flex items-center gap-1.5">
                                  <span className="truncate" title={docItem.id}>{docItem.id}</span>
                                  <button
                                    onClick={() => copyToClipboard(docItem.id, `doc-${docItem.id}`)}
                                    className="text-slate-400 hover:text-indigo-600"
                                    title="Copy Document ID"
                                  >
                                    {copiedField === `doc-${docItem.id}` ? (
                                      <Check className="w-3 h-3 text-emerald-600" />
                                    ) : (
                                      <Copy className="w-3 h-3" />
                                    )}
                                  </button>
                                </div>
                              </td>
                              <td className="py-2.5 px-4 font-medium text-slate-900 max-w-[220px] truncate" title={primary}>
                                {primary}
                              </td>
                              <td className="py-2.5 px-4 text-slate-500 max-w-[200px] truncate" title={secondary}>
                                {secondary}
                              </td>
                              <td className="py-2.5 px-4">
                                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                                  status === 'Verified' || status === 'admin' || status === 'active'
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    : status === 'Needs Review'
                                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                    : 'bg-slate-100 text-slate-700 border border-slate-200'
                                }`}>
                                  {status}
                                </span>
                              </td>
                              <td className="py-2.5 px-4 text-slate-400 text-[11px] whitespace-nowrap">
                                {timestamp.split('T')[0] || timestamp}
                              </td>
                              <td className="py-2.5 px-4 text-right">
                                <button
                                  onClick={() => setSelectedJsonDoc({
                                    id: docItem.id,
                                    collection: dbSelectedCollection,
                                    data: docItem.data
                                  })}
                                  className="px-2.5 py-1 rounded bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 text-xs font-semibold transition-colors inline-flex items-center gap-1"
                                >
                                  <Code2 className="w-3.5 h-3.5" />
                                  <span>Inspect</span>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Architecture Explanatory Guide */}
            <div className="p-5 bg-gradient-to-br from-indigo-50/50 to-slate-50 rounded-xl border border-indigo-100/80">
              <h3 className="text-xs font-bold text-indigo-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                How Database Data is Displayed & Structured Across GovScheme Finder
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600 leading-relaxed mt-3">
                <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-2xs">
                  <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1 text-xs">
                    <Building className="w-3.5 h-3.5 text-indigo-600" />
                    1. Schemes & Categories
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Stored in Firestore <code className="bg-slate-100 px-1 rounded text-indigo-700">/schemes</code> and <code className="bg-slate-100 px-1 rounded text-indigo-700">/categories</code>. Open to public citizen search, structured filter queries, and automated eligibility rule evaluations.
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-2xs">
                  <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1 text-xs">
                    <Users className="w-3.5 h-3.5 text-indigo-600" />
                    2. Citizen Profiles
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Stored in <code className="bg-slate-100 px-1 rounded text-indigo-700">/users/{'{uid}'}</code>. Citizens can view and update their age, economic bracket, and state via the <strong>Profile</strong> view. Governed by security rules ensuring private read/write access.
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-2xs">
                  <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1 text-xs">
                    <Bookmark className="w-3.5 h-3.5 text-indigo-600" />
                    3. Saved Schemes & Bookmarks
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Stored in <code className="bg-slate-100 px-1 rounded text-indigo-700">/savedSchemes</code> with composite keys <code className="bg-slate-100 px-1 rounded text-indigo-700">{'{userId}_{schemeId}'}</code>. Visible on the <strong>Saved</strong> page for logged-in citizens.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DELETE / DEACTIVATE CONFIRMATION MODAL */}
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
            <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-slate-200 text-center">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Manage Scheme Removal</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                You can either deactivate the scheme (preserve audit record, hide from active public citizen matching) or permanently delete it.
              </p>
              <div className="mt-5 space-y-2">
                <button
                  id="btn-deactivate-scheme"
                  onClick={() => handleDeactivateScheme(deleteConfirmId)}
                  className="w-full py-2.5 text-xs font-semibold rounded-xl bg-amber-600 text-white hover:bg-amber-700 shadow-xs transition-colors"
                >
                  Deactivate Scheme (Keep Record)
                </button>
                <button
                  id="btn-confirm-delete-scheme"
                  onClick={() => handleDeleteScheme(deleteConfirmId)}
                  className="w-full py-2.5 text-xs font-semibold rounded-xl bg-rose-600 text-white hover:bg-rose-700 shadow-xs transition-colors"
                >
                  Permanently Delete from Database
                </button>
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="w-full py-2 text-xs font-semibold rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ADD/EDIT SCHEME MODAL */}
        {modalMode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {modalMode === 'create' ? 'Create New Government Scheme' : `Edit: ${editingScheme?.name}`}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Provide verified details and structured criteria for algorithmic matching.
                  </p>
                </div>
                <button
                  onClick={() => setModalMode(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveScheme} className="space-y-6">
                
                {/* Basic Details */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                    1. Basic Scheme Information
                  </h4>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Scheme Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="admin-scheme-name-input"
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Category / Sector <span className="text-rose-500">*</span>
                      </label>
                      <select
                        id="admin-scheme-category-select"
                        value={formCategoryId}
                        onChange={(e) => setFormCategoryId(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                      >
                        {categories.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Application Method
                      </label>
                      <select
                        value={formAppMethod}
                        onChange={(e) => setFormAppMethod(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="Official Ministry Portal">Official Ministry Portal</option>
                        <option value="State Portal">State Portal</option>
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                        <option value="Online & Offline">Online & Offline</option>
                        <option value="Common Service Centre (CSC)">Common Service Centre (CSC)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Department / Nodal Authority <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formDept}
                        onChange={(e) => setFormDept(e.target.value)}
                        placeholder="Department of Agriculture and Farmers Welfare"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Central Ministry (Optional)
                      </label>
                      <input
                        type="text"
                        value={formMinistry}
                        onChange={(e) => setFormMinistry(e.target.value)}
                        placeholder="Ministry of Agriculture and Farmers Welfare"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Short Summary (For Card Listings) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formShortDesc}
                      onChange={(e) => setFormShortDesc(e.target.value)}
                      placeholder="One sentence overview of the scheme"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Detailed Description <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formDesc}
                      onChange={(e) => setFormDesc(e.target.value)}
                      placeholder="Comprehensive overview of the initiative"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Key Objective
                    </label>
                    <input
                      type="text"
                      value={formObjective}
                      onChange={(e) => setFormObjective(e.target.value)}
                      placeholder="e.g. Provide direct income support to vulnerable farmer families"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                </div>

                {/* Benefits Section */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    2. Benefits & Entitlements
                  </h4>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Primary Headline Benefit <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formKeyBenefit}
                      onChange={(e) => setFormKeyBenefit(e.target.value)}
                      placeholder="e.g. ₹6,000 annually paid in 3 equal installments"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Benefits List (One per line)
                    </label>
                    <textarea
                      rows={3}
                      value={formBenefitsText}
                      onChange={(e) => setFormBenefitsText(e.target.value)}
                      placeholder="Benefit 1&#10;Benefit 2&#10;Benefit 3"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {/* Structured Eligibility Criteria */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700">
                    3. Structured Algorithmic Eligibility Criteria
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    These rules power the automated evaluation engine. Leave blank if no restriction applies.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Minimum Age (Inclusive)
                      </label>
                      <input
                        type="number"
                        value={elMinAge}
                        onChange={(e) => setElMinAge(e.target.value)}
                        placeholder="e.g. 18"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Maximum Age (Inclusive)
                      </label>
                      <input
                        type="number"
                        value={elMaxAge}
                        onChange={(e) => setElMaxAge(e.target.value)}
                        placeholder="e.g. 40"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Min Income (₹ / Annum)
                      </label>
                      <input
                        type="number"
                        value={elMinIncome}
                        onChange={(e) => setElMinIncome(e.target.value)}
                        placeholder="e.g. 0"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Income Maximum (₹ / Annum)
                      </label>
                      <input
                        type="number"
                        value={elMaxIncome}
                        onChange={(e) => setElMaxIncome(e.target.value)}
                        placeholder="e.g. 250000"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Allowed States (Comma-separated or 'All States')
                      </label>
                      <input
                        type="text"
                        value={elStates}
                        onChange={(e) => setElStates(e.target.value)}
                        placeholder="All States or Delhi, Maharashtra"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Allowed Occupations (Comma-separated or 'Any')
                      </label>
                      <input
                        type="text"
                        value={elOccupations}
                        onChange={(e) => setElOccupations(e.target.value)}
                        placeholder="Student, Farmer or Any"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Allowed Education Levels (or 'Any')
                      </label>
                      <input
                        type="text"
                        value={elEducation}
                        onChange={(e) => setElEducation(e.target.value)}
                        placeholder="10th Pass, Undergraduate or Any"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Allowed Genders (All, Male, Female)
                      </label>
                      <input
                        type="text"
                        value={elGenders}
                        onChange={(e) => setElGenders(e.target.value)}
                        placeholder="All or Female"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Beneficiary Types
                      </label>
                      <input
                        type="text"
                        value={elBeneficiaries}
                        onChange={(e) => setElBeneficiaries(e.target.value)}
                        placeholder="Farmers, Students, All Citizens"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Additional Eligibility Conditions (One per line)
                    </label>
                    <textarea
                      rows={2}
                      value={elOtherRequirementsText}
                      onChange={(e) => setElOtherRequirementsText(e.target.value)}
                      placeholder="Must hold cultivable agricultural land&#10;Must not pay income tax"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900"
                    />
                  </div>

                </div>

                {/* Documents & Application */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    4. Application Process & Official Links
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Required Documents (One per line)
                      </label>
                      <textarea
                        rows={3}
                        value={formDocsText}
                        onChange={(e) => setFormDocsText(e.target.value)}
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Application Steps (One per line)
                      </label>
                      <textarea
                        rows={3}
                        value={formProcessText}
                        onChange={(e) => setFormProcessText(e.target.value)}
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Official Website URL <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="admin-scheme-url-input"
                        type="url"
                        required
                        value={formOfficialUrl}
                        onChange={(e) => setFormOfficialUrl(e.target.value)}
                        placeholder="https://pmkisan.gov.in"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Source Name / Authority <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formSourceName}
                        onChange={(e) => setFormSourceName(e.target.value)}
                        placeholder="PM-KISAN National Portal"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Information / Guidelines Source URL (Optional)
                      </label>
                      <input
                        type="url"
                        value={formSourceUrl}
                        onChange={(e) => setFormSourceUrl(e.target.value)}
                        placeholder="https://agricoop.nic.in/guidelines"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Online Direct Application URL (Optional)
                      </label>
                      <input
                        type="url"
                        value={formApplicationUrl}
                        onChange={(e) => setFormApplicationUrl(e.target.value)}
                        placeholder="https://pmkisan.gov.in/RegistrationFormNew.aspx"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900"
                      />
                    </div>
                  </div>

                  {/* Status, Flagship, Verification */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Status
                      </label>
                      <select
                        value={formStatus}
                        onChange={(e) => setFormStatus(e.target.value as any)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900"
                      >
                        <option value="active">Active Scheme</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Verification Status
                      </label>
                      <select
                        value={formVerification}
                        onChange={(e) => setFormVerification(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900"
                      >
                        <option value="Verified">Verified</option>
                        <option value="Needs Review">Needs Review</option>
                        <option value="Draft">Draft</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>

                    <div className="flex items-center space-x-2 pt-5">
                      <input
                        type="checkbox"
                        id="scheme-featured-check"
                        checked={formFeatured}
                        onChange={(e) => setFormFeatured(e.target.checked)}
                        className="w-4 h-4 text-indigo-600 rounded"
                      />
                      <label htmlFor="scheme-featured-check" className="text-xs font-bold text-slate-700 cursor-pointer">
                        Mark as Flagship Scheme
                      </label>
                    </div>
                  </div>

                </div>

                {/* Actions */}
                <div className="pt-6 border-t border-slate-200 flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setModalMode(null)}
                    className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    id="admin-scheme-save-btn"
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 text-xs font-semibold rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white shadow-xs"
                  >
                    {loading ? 'Saving to Database...' : modalMode === 'create' ? 'Create Scheme Record' : 'Save Changes'}
                  </button>
                </div>

              </form>

            </div>
          </div>
        )}

        {/* ADD CATEGORY MODAL */}
        {showCategoryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h3 className="text-base font-bold text-slate-900">Add New Category</h3>
                <button onClick={() => setShowCategoryModal(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateCategory} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={catName}
                    onChange={(e) => setCatName(e.target.value)}
                    placeholder="e.g. Women & Child Empowerment"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={catDesc}
                    onChange={(e) => setCatDesc(e.target.value)}
                    placeholder="Brief description of the sector"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Icon Representation
                  </label>
                  <select
                    value={catIcon}
                    onChange={(e) => setCatIcon(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  >
                    <option value="Layers">Layers</option>
                    <option value="Wheat">Wheat (Agriculture)</option>
                    <option value="HeartPulse">HeartPulse (Healthcare)</option>
                    <option value="GraduationCap">GraduationCap (Education)</option>
                    <option value="Users">Users (Social Welfare)</option>
                    <option value="Home">Home (Housing)</option>
                    <option value="Briefcase">Briefcase (Employment)</option>
                    <option value="Wrench">Wrench (Skill Development)</option>
                    <option value="Coins">Coins (Finance)</option>
                    <option value="Award">Award (Sports/Excellence)</option>
                  </select>
                </div>

                <div className="pt-3 flex items-center justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowCategoryModal(false)}
                    className="px-3 py-1.5 text-xs text-slate-600 rounded-lg hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-1.5 text-xs font-semibold bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg"
                  >
                    {loading ? 'Creating...' : 'Create Category'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* INSPECT JSON DOCUMENT MODAL */}
        {selectedJsonDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 max-h-[85vh] flex flex-col">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Firestore Document Inspector</h3>
                    <p className="text-[11px] font-mono text-slate-500">
                      /{selectedJsonDoc.collection}/{selectedJsonDoc.id}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const jsonText = JSON.stringify(selectedJsonDoc.data, null, 2);
                      copyToClipboard(jsonText, 'modalJsonCopy');
                    }}
                    className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    {copiedField === 'modalJsonCopy' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedField === 'modalJsonCopy' ? 'Copied!' : 'Copy JSON'}</span>
                  </button>
                  <button
                    onClick={() => setSelectedJsonDoc(null)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="my-4 flex-1 overflow-y-auto bg-slate-950 p-4 rounded-xl text-emerald-400 font-mono text-[11px] leading-relaxed shadow-inner">
                <pre>{JSON.stringify(selectedJsonDoc.data, null, 2)}</pre>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-400">
                <span>Database: {firebaseConfigData.firestoreDatabaseId}</span>
                <button
                  onClick={() => setSelectedJsonDoc(null)}
                  className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs"
                >
                  Close Inspector
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SYNC / SEED CONFIRMATION MODAL */}
        {showSyncConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mx-auto mb-3">
                <HardDrive className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 text-center">Sync Verified Catalog to Firestore</h3>
              <p className="text-xs text-slate-500 mt-2 text-center leading-relaxed">
                This will commit the verified catalog of <strong>15 government welfare schemes</strong> and <strong>7 sector categories</strong> directly into your live Firestore collections (<code className="text-indigo-700 font-mono">schemes</code> and <code className="text-indigo-700 font-mono">categories</code>).
              </p>
              <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  Existing scheme records with matching IDs will be restored to their official verified baseline.
                </span>
              </div>
              <div className="mt-6 space-y-2">
                <button
                  onClick={handleSyncToFirestore}
                  disabled={loading}
                  className="w-full py-2.5 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Writing to Cloud Firestore...</span>
                    </>
                  ) : (
                    <>
                      <HardDrive className="w-4 h-4" />
                      <span>Proceed with Firestore Sync</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowSyncConfirmModal(false)}
                  disabled={loading}
                  className="w-full py-2 text-slate-600 font-semibold text-xs rounded-xl hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
