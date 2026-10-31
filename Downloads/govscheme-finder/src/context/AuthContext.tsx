import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { UserProfile } from '../types';

export const ADMIN_EMAILS = ['2425018@saec.ac.in'];

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (email: string, pass: string, name: string, initialData?: Partial<UserProfile>) => Promise<void>;
  logout: () => Promise<void>;
  updateProfileData: (data: Partial<UserProfile>) => Promise<void>;
  resetUserPassword: (email: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch or initialize profile
  const fetchUserProfile = async (uid: string, userEmail?: string | null, customDisplayName?: string): Promise<UserProfile | null> => {
    try {
      const isEmailAdmin = Boolean(userEmail && ADMIN_EMAILS.includes(userEmail.toLowerCase()));
      const docRef = doc(db, 'users', uid);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data() as UserProfile;
        if (isEmailAdmin && data.role !== 'admin') {
          const updated: UserProfile = { ...data, role: 'admin', updatedAt: new Date().toISOString() };
          try {
            await updateDoc(docRef, { role: 'admin', updatedAt: updated.updatedAt });
          } catch (e) {
            console.warn('Could not update role in Firestore, using memory admin role:', e);
          }
          setProfile(updated);
          return updated;
        }
        setProfile(data);
        return data;
      } else {
        // Create initial profile for user
        const initialProfile: UserProfile = {
          uid,
          email: userEmail || '',
          displayName: customDisplayName || userEmail?.split('@')[0] || 'Citizen',
          role: isEmailAdmin ? 'admin' : 'user',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        try {
          await setDoc(docRef, initialProfile);
        } catch (e) {
          console.warn('Could not write initial profile to Firestore:', e);
        }
        setProfile(initialProfile);
        return initialProfile;
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
      if (userEmail) {
        const fallbackProfile: UserProfile = {
          uid,
          email: userEmail,
          displayName: customDisplayName || userEmail.split('@')[0] || 'Citizen',
          role: (userEmail && ADMIN_EMAILS.includes(userEmail.toLowerCase())) ? 'admin' : 'user',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        setProfile(fallbackProfile);
        return fallbackProfile;
      }
      return null;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchUserProfile(currentUser.uid, currentUser.email, currentUser.displayName || undefined);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const cred = await signInWithPopup(auth, provider);
    await fetchUserProfile(cred.user.uid, cred.user.email, cred.user.displayName || undefined);
  };

  const login = async (email: string, pass: string) => {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      await fetchUserProfile(cred.user.uid, cred.user.email);
    } catch (err: any) {
      if (err.code === 'auth/operation-not-allowed') {
        const customErr = new Error('Email/Password sign-in is not enabled in Firebase Authentication for this project. Please use "Sign in with Google" instead.');
        (customErr as any).code = 'auth/operation-not-allowed';
        throw customErr;
      }
      throw err;
    }
  };

  const register = async (email: string, pass: string, name: string, initialData?: Partial<UserProfile>) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      const isEmailAdmin = Boolean(email && ADMIN_EMAILS.includes(email.toLowerCase()));
      const newProfile: UserProfile = {
        uid: cred.user.uid,
        email,
        displayName: name,
        role: isEmailAdmin ? 'admin' : 'user',
        state: initialData?.state || '',
        age: initialData?.age,
        occupation: initialData?.occupation || '',
        education: initialData?.education || '',
        annualIncome: initialData?.annualIncome,
        incomeRange: initialData?.incomeRange || '',
        gender: initialData?.gender,
        socialCategory: initialData?.socialCategory || 'General',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      try {
        await setDoc(doc(db, 'users', cred.user.uid), newProfile);
      } catch (e) {
        console.warn('Could not write registered profile to Firestore:', e);
      }
      setProfile(newProfile);
    } catch (err: any) {
      if (err.code === 'auth/operation-not-allowed') {
        const customErr = new Error('Email/Password registration is not enabled in Firebase Authentication for this project. Please use "Sign in with Google" instead.');
        (customErr as any).code = 'auth/operation-not-allowed';
        throw customErr;
      }
      throw err;
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setProfile(null);
  };

  const updateProfileData = async (data: Partial<UserProfile>) => {
    if (!user || !profile) throw new Error('User not logged in');
    
    // Prevent non-admin user from escalating to admin
    const isEmailAdmin = Boolean(user.email && ADMIN_EMAILS.includes(user.email.toLowerCase()));
    if (data.role && profile.role !== 'admin' && !isEmailAdmin && data.role === 'admin') {
      delete data.role;
    }

    const docRef = doc(db, 'users', user.uid);
    const updated = {
      ...data,
      updatedAt: new Date().toISOString()
    };
    try {
      await updateDoc(docRef, updated);
    } catch (e) {
      console.warn('Could not update Firestore profile:', e);
    }
    setProfile(prev => prev ? { ...prev, ...updated } : null);
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchUserProfile(user.uid, user.email, user.displayName || undefined);
    }
  };

  const resetUserPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const isAdmin = profile?.role === 'admin' || Boolean(user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase()));

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAdmin,
        loading,
        login,
        loginWithGoogle,
        register,
        logout,
        updateProfileData,
        resetUserPassword,
        refreshProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
