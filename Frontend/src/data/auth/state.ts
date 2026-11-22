import type { Credentials, CurrentUser } from './types';

const storageKey = 'gapresearch.auth';
export const authChangeEvent = 'auth:changed';

function canUseStorage() {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

function notify(user: CurrentUser | null) {
  window.dispatchEvent(new CustomEvent<CurrentUser | null>(authChangeEvent, { detail: user }));
}

export function getCurrentUser(): CurrentUser | null {
  if (!canUseStorage()) return null;
  try {
    return JSON.parse(localStorage.getItem(storageKey) || 'null') as CurrentUser | null;
  } catch {
    return null;
  }
}

export function setCurrentUser(user: CurrentUser | null) {
  if (!canUseStorage()) return;
  if (user) localStorage.setItem(storageKey, JSON.stringify(user));
  else localStorage.removeItem(storageKey);
  notify(user);
}

/** Local stand-in for the future API login endpoint. */
export function signIn(credentials: Credentials, registered = false) {
  const email = credentials.email.trim();
  if (!email) throw new Error('Введите email');
  const user: CurrentUser = { email, name: credentials.name?.trim() || email };
  if (registered) user.registered = true;
  setCurrentUser(user);
  return user;
}

/** Local stand-in for anonymous access granted by the future API. */
export function signInAsGuest() {
  const user: CurrentUser = { email: '', name: 'гость', guest: true };
  setCurrentUser(user);
  return user;
}

export function signOut() {
  setCurrentUser(null);
}
