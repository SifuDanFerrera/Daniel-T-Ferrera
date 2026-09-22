import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, Lock, Key, Shield, ArrowRight } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { loginWithGoogle, loginDemoAdmin, error: authError } = useAuth();
  const [keyCode, setKeyCode] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    setLocalError(null);
    setLoading(true);
    try {
      await loginWithGoogle();
      onSuccess();
    } catch (err: unknown) {
      setLocalError(err instanceof Error ? err.message : 'Google authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleKeycodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setLoading(true);
    try {
      const ok = await loginDemoAdmin(keyCode);
      if (ok) {
        onSuccess();
      } else {
        setLocalError('Invalid administrative keycode.');
      }
    } catch (err: unknown) {
      setLocalError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0A0E1A]/95 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-200">
      <div className="relative max-w-md w-full border-2 border-[#C9A84C] bg-[#0c1220] p-8 shadow-2xl text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#F5F0E8]/60 hover:text-[#C9A84C] p-2"
          aria-label="Close Admin Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Lock Icon */}
        <div className="w-14 h-14 rounded-full border border-[#C9A84C] bg-[#0A0E1A] flex items-center justify-center mx-auto mb-4">
          <Lock className="w-6 h-6 text-[#C9A84C]" />
        </div>

        <h3 className="text-2xl font-serif text-[#F5F0E8] font-normal mb-1">
          Administrator Terminal
        </h3>
        <p className="font-mono text-xs text-[#C9A84C] uppercase tracking-widest mb-6">
          Daniel Ferrera · CMS Control Gateway
        </p>

        {/* Primary Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-3.5 px-4 bg-[#C9A84C] text-[#0A0E1A] font-serif text-sm font-semibold tracking-wide hover:bg-[#d8b85c] transition-all flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer mb-6"
        >
          <Shield className="w-4 h-4" />
          <span>Authenticate via Google (Admin Email)</span>
        </button>

        {/* Divider */}
        <div className="relative flex py-2 items-center mb-6">
          <div className="flex-grow border-t border-[#C9A84C]/20" />
          <span className="flex-shrink mx-4 font-mono text-[10px] text-[#C9A84C]/60 uppercase tracking-widest">
            OR SANDBOX KEYCODE
          </span>
          <div className="flex-grow border-t border-[#C9A84C]/20" />
        </div>

        {/* Keycode Form for instant preview testing */}
        <form onSubmit={handleKeycodeSubmit} className="space-y-3">
          <div className="relative">
            <input
              type="password"
              value={keyCode}
              onChange={(e) => setKeyCode(e.target.value)}
              placeholder="Enter master keycode (e.g. GANN-1920)..."
              className="w-full px-4 py-3 bg-[#0A0E1A] border border-[#C9A84C]/40 text-[#F5F0E8] font-mono text-xs placeholder-[#F5F0E8]/30 focus:outline-none focus:border-[#C9A84C]"
            />
            <Key className="w-4 h-4 text-[#C9A84C]/40 absolute right-3 top-3.5" />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 border border-[#C9A84C]/50 text-[#C9A84C] font-mono text-xs uppercase tracking-wider hover:bg-[#C9A84C]/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Verify Master Key</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {(localError || authError) && (
          <p className="mt-4 text-xs font-mono text-rose-400 bg-rose-950/40 p-2 border border-rose-900/50">
            {localError || authError}
          </p>
        )}

        <div className="mt-6 pt-4 border-t border-[#C9A84C]/10 text-[10px] font-mono text-[#F5F0E8]/40">
          Authorized Admin: <span className="text-[#C9A84C]">ferreradanielt@gmail.com</span>
        </div>
      </div>
    </div>
  );
};
