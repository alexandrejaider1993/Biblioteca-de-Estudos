import { LibraryData, StudyItem, UserAccount } from '../types/library';
import { INITIAL_LIBRARY_DATA } from '../data/initialData';

const STORAGE_KEY_LIB = 'bib_estudos_brandbook_v31_final';
const STORAGE_KEY_USERS = 'bib_estudos_usuarios_v31';
const STORAGE_KEY_SESSION = 'bib_estudos_sessao_v31';
const STORAGE_KEY_THEME = 'bib_estudos_tema_v31';

export const DEFAULT_USER: UserAccount = {
  nome: "Dr. Alexandre Jaider",
  senhaHash: "h_medicina_hash",
  email: "alexandre.jaiderdecastro@gmail.com",
  dataCriacao: "06/11/2026",
};

export function hashPassword(password: string): string {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return 'h_' + Math.abs(hash).toString(36) + '_' + password.length;
}

export function getStoredLibrary(): LibraryData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LIB);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_LIB, JSON.stringify(INITIAL_LIBRARY_DATA));
      return INITIAL_LIBRARY_DATA;
    }
    const parsed = JSON.parse(raw) as LibraryData;
    // Verify that the Brand Book chapter exists, otherwise refresh to ensure latest
    const hasBrandBookCap = parsed.disciplinas?.some(d =>
      d.itens?.some(i => i.id === 'apostila-cap-7')
    );
    if (!hasBrandBookCap) {
      localStorage.setItem(STORAGE_KEY_LIB, JSON.stringify(INITIAL_LIBRARY_DATA));
      return INITIAL_LIBRARY_DATA;
    }
    return parsed;
  } catch (e) {
    console.error('Erro ao ler biblioteca do localStorage:', e);
    return INITIAL_LIBRARY_DATA;
  }
}

export function saveLibrary(data: LibraryData): void {
  try {
    localStorage.setItem(STORAGE_KEY_LIB, JSON.stringify(data));
    window.dispatchEvent(new Event('bib_library_updated'));
  } catch (e) {
    console.error('Erro ao salvar biblioteca no localStorage:', e);
  }
}

export function getStoredUsers(): UserAccount[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USERS);
    if (!raw) {
      const defaultUsers: UserAccount[] = [DEFAULT_USER];
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(defaultUsers));
      return defaultUsers;
    }
    return JSON.parse(raw) as UserAccount[];
  } catch (e) {
    return [DEFAULT_USER];
  }
}

export function saveUser(user: UserAccount): boolean {
  const users = getStoredUsers();
  if (users.some(u => u.nome.toLowerCase() === user.nome.toLowerCase())) {
    return false;
  }
  users.push(user);
  localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
  return true;
}

export function getCurrentUser(): UserAccount {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SESSION);
    if (!raw) {
      // Auto-authenticate with the active profile so user immediately sees the interface
      localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(DEFAULT_USER));
      return DEFAULT_USER;
    }
    return JSON.parse(raw) as UserAccount;
  } catch (e) {
    return DEFAULT_USER;
  }
}

export function setCurrentUser(user: UserAccount | null): void {
  if (user) {
    localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEY_SESSION);
  }
  window.dispatchEvent(new Event('bib_session_changed'));
}

export function getStoredTheme(): 'light' | 'dark' {
  const t = localStorage.getItem(STORAGE_KEY_THEME);
  if (t === 'dark' || t === 'light') return t;
  return 'light'; // Light is the canonical Apple-like white background of Brand Book v3.1
}

export function setStoredTheme(theme: 'light' | 'dark'): void {
  localStorage.setItem(STORAGE_KEY_THEME, theme);
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

export function cleanPath(p: string): string {
  return p
    .split('/')
    .map(seg => seg.trim().replace(/[<>:"|?*\x00-\x1f]/g, ''))
    .filter(Boolean)
    .join('/');
}
