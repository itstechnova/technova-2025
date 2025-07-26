'use client';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';
import supabase from '@/config/supabaseClient';

interface AccountContextType {
  user: any;
  loading: boolean;
  loginWithEmail: (
    email: string,
    password: string
  ) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loginWithEmail = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      setUser(data.user ?? null);
      setLoading(false);
      if (error) return { error: error.message };
      return {};
    },
    []
  );

  const logout = useCallback(async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setLoading(false);
  }, []);

  const contextValue: AccountContextType = useMemo(
    () => ({
      user,
      loading,
      loginWithEmail,
      logout,
    }),
    [user, loading]
  );

  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (mounted) {
        setUser(data.user ?? null);
        setLoading(false);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log(event, session);
        if (event === 'INITIAL_SESSION') {
          setUser(session?.user ?? null);
        } else if (event === 'SIGNED_IN') {
          setUser(session?.user ?? null);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        } else if (event === 'PASSWORD_RECOVERY') {
          setUser(null);
        } else if (event === 'TOKEN_REFRESHED') {
          setUser(session?.user ?? null);
        } else if (event === 'USER_UPDATED') {
          setUser(session?.user ?? null);
        }
      }
    );
    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AccountContext.Provider value={contextValue}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context)
    throw new Error('useAccount must be used within an AccountProvider');
  return context;
};
