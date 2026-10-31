import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  writeBatch
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { Scheme, SchemeCategory, SavedScheme } from '../types';
import { INITIAL_SCHEMES, INITIAL_CATEGORIES } from '../data/seedSchemes';

const SCHEMES_COLL = 'schemes';
const CATEGORIES_COLL = 'categories';
const SAVED_SCHEMES_COLL = 'savedSchemes';

/**
 * Seed initial categories if not already present
 */
export async function seedCategoriesIfEmpty(): Promise<SchemeCategory[]> {
  try {
    const catSnapshot = await getDocs(collection(db, CATEGORIES_COLL));
    if (!catSnapshot.empty) {
      return catSnapshot.docs.map(d => ({ ...d.data(), id: d.id } as SchemeCategory));
    }

    // Seed initial categories
    const batch = writeBatch(db);
    for (const cat of INITIAL_CATEGORIES) {
      const docRef = doc(db, CATEGORIES_COLL, cat.id);
      batch.set(docRef, cat);
    }
    await batch.commit();
    return INITIAL_CATEGORIES;
  } catch (error) {
    console.warn('Could not read or seed categories from Firestore, using initial dataset:', error);
    return INITIAL_CATEGORIES;
  }
}

/**
 * Seed initial schemes if not already present
 */
export async function seedSchemesIfEmpty(): Promise<Scheme[]> {
  try {
    const schemeSnapshot = await getDocs(collection(db, SCHEMES_COLL));
    if (!schemeSnapshot.empty) {
      return schemeSnapshot.docs.map(d => ({ ...d.data(), id: d.id } as Scheme));
    }

    // Seed initial schemes
    const batch = writeBatch(db);
    for (const scheme of INITIAL_SCHEMES) {
      const docRef = doc(db, SCHEMES_COLL, scheme.id);
      batch.set(docRef, scheme);
    }
    await batch.commit();
    return INITIAL_SCHEMES;
  } catch (error) {
    console.warn('Could not read or seed schemes from Firestore, using initial dataset:', error);
    return INITIAL_SCHEMES;
  }
}

/**
 * Force re-seed database with fresh sample government data (useful for Admin reset)
 */
export async function reseedAllData(): Promise<void> {
  const batch = writeBatch(db);
  for (const cat of INITIAL_CATEGORIES) {
    batch.set(doc(db, CATEGORIES_COLL, cat.id), cat);
  }
  for (const scheme of INITIAL_SCHEMES) {
    batch.set(doc(db, SCHEMES_COLL, scheme.id), scheme);
  }
  await batch.commit();
}

/**
 * Get all schemes (all for admin, or filter by status)
 */
export async function fetchSchemes(includeInactive = false): Promise<Scheme[]> {
  try {
    let q;
    if (includeInactive) {
      q = collection(db, SCHEMES_COLL);
    } else {
      q = query(collection(db, SCHEMES_COLL), where('status', '==', 'active'));
    }

    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      // Return initial verified dataset without executing unauthenticated database writes
      return includeInactive ? INITIAL_SCHEMES : INITIAL_SCHEMES.filter(s => s.status === 'active');
    }

    const schemes = snapshot.docs.map(d => ({ ...(d.data() as Record<string, any>), id: d.id } as Scheme));
    return schemes;
  } catch (error) {
    console.error('Error fetching schemes from Firestore:', error);
    // Fallback gracefully to memory data if firestore query has issue
    return includeInactive ? INITIAL_SCHEMES : INITIAL_SCHEMES.filter(s => s.status === 'active');
  }
}

/**
 * Get single scheme by ID
 */
export async function fetchSchemeById(id: string): Promise<Scheme | null> {
  try {
    const docRef = doc(db, SCHEMES_COLL, id);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return { ...snap.data(), id: snap.id } as Scheme;
    }
    
    // Check in initial dataset if not yet in firestore
    const found = INITIAL_SCHEMES.find(s => s.id === id);
    return found || null;
  } catch (error) {
    console.error(`Error fetching scheme ${id}:`, error);
    return INITIAL_SCHEMES.find(s => s.id === id) || null;
  }
}

/**
 * Create a new scheme (Admin only)
 */
export async function createSchemeInDb(schemeData: Omit<Scheme, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const id = schemeData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now().toString(36);
  const now = new Date().toISOString();
  
  const newScheme: Scheme = {
    ...schemeData,
    id,
    createdAt: now,
    updatedAt: now,
    lastVerifiedAt: new Date().toISOString().split('T')[0]
  };

  await setDoc(doc(db, SCHEMES_COLL, id), newScheme);
  return id;
}

/**
 * Update an existing scheme (Admin only)
 */
export async function updateSchemeInDb(id: string, updates: Partial<Scheme>): Promise<void> {
  const docRef = doc(db, SCHEMES_COLL, id);
  const updatedData = {
    ...updates,
    updatedAt: new Date().toISOString()
  };
  await updateDoc(docRef, updatedData);
}

/**
 * Delete a scheme (Admin only)
 */
export async function deleteSchemeFromDb(id: string): Promise<void> {
  const docRef = doc(db, SCHEMES_COLL, id);
  await deleteDoc(docRef);
}

/**
 * Fetch categories
 */
export async function fetchCategories(): Promise<SchemeCategory[]> {
  try {
    const snapshot = await getDocs(collection(db, CATEGORIES_COLL));
    if (snapshot.empty) {
      return INITIAL_CATEGORIES;
    }
    return snapshot.docs.map(d => ({ ...(d.data() as Record<string, any>), id: d.id } as SchemeCategory));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return INITIAL_CATEGORIES;
  }
}

/**
 * Create a category (Admin only)
 */
export async function createCategoryInDb(category: SchemeCategory): Promise<void> {
  await setDoc(doc(db, CATEGORIES_COLL, category.id), category);
}

// -----------------------------------------------------
// Saved Schemes / Bookmarks
// -----------------------------------------------------

/**
 * Fetch all saved schemes for a given user
 */
export async function fetchUserSavedSchemes(userId: string): Promise<SavedScheme[]> {
  try {
    const q = query(collection(db, SAVED_SCHEMES_COLL), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({ ...(d.data() as Record<string, any>), id: d.id } as SavedScheme));
  } catch (error) {
    console.error('Error fetching saved schemes:', error);
    return [];
  }
}

/**
 * Bookmark a scheme
 */
export async function saveSchemeForUser(userId: string, scheme: Scheme): Promise<void> {
  const saveId = `${userId}_${scheme.id}`;
  const docRef = doc(db, SAVED_SCHEMES_COLL, saveId);
  
  const savedRecord: SavedScheme = {
    id: saveId,
    userId,
    schemeId: scheme.id,
    schemeName: scheme.name,
    categoryName: scheme.categoryName,
    department: scheme.department,
    keyBenefit: scheme.keyBenefit,
    officialUrl: scheme.officialUrl,
    savedAt: new Date().toISOString()
  };

  await setDoc(docRef, savedRecord);
}

/**
 * Remove bookmark
 */
export async function unsaveSchemeForUser(userId: string, schemeId: string): Promise<void> {
  const saveId = `${userId}_${schemeId}`;
  const docRef = doc(db, SAVED_SCHEMES_COLL, saveId);
  await deleteDoc(docRef);
}

export const createScheme = createSchemeInDb;
export const updateScheme = updateSchemeInDb;
export const deleteScheme = deleteSchemeFromDb;
export const getUserSavedSchemes = fetchUserSavedSchemes;
export const saveScheme = saveSchemeForUser;
export const unsaveScheme = unsaveSchemeForUser;

export async function createCategory(cat: Omit<SchemeCategory, 'id'>): Promise<void> {
  const existing = await fetchCategories();
  const normalizedNew = cat.name.trim().toLowerCase();
  if (existing.some(c => c.name.trim().toLowerCase() === normalizedNew)) {
    throw new Error(`Category "${cat.name.trim()}" already exists.`);
  }
  const id = cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  await createCategoryInDb({ ...cat, id });
}

export async function resetToSeedData(): Promise<void> {
  // Clear and re-populate categories
  const catBatch = writeBatch(db);
  for (const cat of INITIAL_CATEGORIES) {
    catBatch.set(doc(db, CATEGORIES_COLL, cat.id), cat);
  }
  await catBatch.commit();

  // Clear and re-populate schemes
  const schemeBatch = writeBatch(db);
  for (const scheme of INITIAL_SCHEMES) {
    schemeBatch.set(doc(db, SCHEMES_COLL, scheme.id), scheme);
  }
  await schemeBatch.commit();
}

/**
 * Fetch raw collection documents for direct database inspection
 */
export async function getFirestoreCollectionData(collectionName: string): Promise<{ id: string; data: Record<string, any> }[]> {
  try {
    const colRef = collection(db, collectionName);
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map(docSnap => ({
      id: docSnap.id,
      data: docSnap.data()
    }));
  } catch (error) {
    console.error(`Error reading collection ${collectionName} from Firestore:`, error);
    throw error;
  }
}

/**
 * Fetch overview stats across all collections
 */
export async function getFirestoreOverviewStats(): Promise<{
  schemesCount: number;
  categoriesCount: number;
  usersCount: number;
  savedSchemesCount: number;
  isOnline: boolean;
}> {
  try {
    const [schemesSnap, catsSnap, usersSnap, savedSnap] = await Promise.all([
      getDocs(collection(db, SCHEMES_COLL)).catch(() => ({ size: 0 })),
      getDocs(collection(db, CATEGORIES_COLL)).catch(() => ({ size: 0 })),
      getDocs(collection(db, 'users')).catch(() => ({ size: 0 })),
      getDocs(collection(db, SAVED_SCHEMES_COLL)).catch(() => ({ size: 0 }))
    ]);

    return {
      schemesCount: schemesSnap.size,
      categoriesCount: catsSnap.size,
      usersCount: usersSnap.size,
      savedSchemesCount: savedSnap.size,
      isOnline: true
    };
  } catch (error) {
    console.warn('Error fetching Firestore stats:', error);
    return {
      schemesCount: 0,
      categoriesCount: 0,
      usersCount: 0,
      savedSchemesCount: 0,
      isOnline: false
    };
  }
}


