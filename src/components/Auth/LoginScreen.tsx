import React, { useState } from 'react';
import { UserAccount } from '../../types/library';
import { getStoredUsers, saveUser, setCurrentUser, hashPassword } from '../../utils/storage';
import { BookOpen, AlertCircle, CheckCircle2, User, Lock } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: (user: UserAccount) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  
  // Login form
  const [loginNome, setLoginNome] = useState('Jaider');
  const [loginSenha, setLoginSenha] = useState('medicina123');
  const [loginError, setLoginError] = useState('');

  // Register form
  const [regNome, setRegNome] = useState('');
  const [regSenha, setRegSenha] = useState('');
  const [regConf, setRegConf] = useState('');
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const users = getStoredUsers();
    const user = users.find(
      (u) =>
        u.nome.toLowerCase() === loginNome.trim().toLowerCase() &&
        u.senhaHash === hashPassword(loginSenha)
    );

    if (user) {
      setCurrentUser(user);
      onLoginSuccess(user);
    } else {
      setLoginError('Nome ou senha incorretos.');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');
    setRegSuccess('');

    const nome = regNome.trim();
    if (!nome) {
      setRegError('Informe um nome de usuário.');
      return;
    }
    if (regSenha.length < 6) {
      setRegError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (regSenha !== regConf) {
      setRegError('As senhas não coincidem.');
      return;
    }

    const newUser: UserAccount = {
      nome,
      senhaHash: hashPassword(regSenha),
      dataCriacao: new Date().toLocaleDateString('pt-BR'),
    };

    const saved = saveUser(newUser);
    if (!saved) {
      setRegError('Esse nome de usuário já está em uso.');
      return;
    }

    setRegSuccess('Conta criada! Faça login abaixo.');
    setLoginNome(nome);
    setLoginSenha(regSenha);
    setTimeout(() => {
      setMode('login');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#FDFDFC] dark:bg-[#161618] text-[#1D1D1F] dark:text-[#F5F5F7] font-org transition-colors">
      <div className="w-full max-w-[340px] flex flex-col gap-6 animate-entra">
        
        {/* Brand Header com o novo logo transparente reduzido */}
        <div className="flex flex-col items-center text-center gap-2">
          <img
            src="/assets/aistudio/logo_transparente.png?v=transp4"
            alt="estuda Jaider"
            className="h-4.5 sm:h-5 w-auto object-contain dark:invert mb-1 transition-all select-none"
          />
          <p className="text-[11.5px] font-semibold text-[#5B5F66] dark:text-[#9E9EA4] tracking-wide uppercase">
            Estudos · Medicina
          </p>
          <h1 className="text-2xl font-normal tracking-[-0.015em] text-[#1D1D1F] dark:text-[#F5F5F7]">
            {mode === 'login' ? 'Acessar' : 'Criar Conta'}
          </h1>
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-[#1E1E22] rounded-lg p-6 shadow-sm border border-[#D9DCE1] dark:border-zinc-800">
          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {loginError && (
                <div className="flex items-center gap-2 p-2 rounded-md bg-[#FBEFEE] dark:bg-[#2D1A19] text-[#A8322D] dark:text-[#D2534D] text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              {regSuccess && (
                <div className="flex items-center gap-2 p-2 rounded-md bg-[#EDF6F0] dark:bg-[#15261D] text-[#3D7A5A] dark:text-[#52A078] text-xs">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{regSuccess}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#5B5F66] dark:text-[#9E9EA4] mb-1">
                  Nome
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={loginNome}
                    onChange={(e) => setLoginNome(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-sm bg-white dark:bg-zinc-800 border border-[#D9DCE1] dark:border-zinc-700 rounded-md text-[#1D1D1F] dark:text-[#F5F5F7] focus:outline-hidden focus:border-[#2B4F7E] dark:focus:border-[#4A7AB5] transition-colors"
                  />
                  <User className="w-4 h-4 text-[#5B5F66] absolute left-2.5 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5B5F66] dark:text-[#9E9EA4] mb-1">
                  Senha
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={loginSenha}
                    onChange={(e) => setLoginSenha(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-sm bg-white dark:bg-zinc-800 border border-[#D9DCE1] dark:border-zinc-700 rounded-md text-[#1D1D1F] dark:text-[#F5F5F7] focus:outline-hidden focus:border-[#2B4F7E] dark:focus:border-[#4A7AB5] transition-colors"
                  />
                  <Lock className="w-4 h-4 text-[#5B5F66] absolute left-2.5 top-2.5" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#2B4F7E] hover:bg-[#23426A] dark:bg-[#4A7AB5] dark:hover:bg-[#3E689B] rounded-md transition-colors cursor-pointer shadow-xs mt-1"
              >
                Acessar
              </button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setLoginError('');
                    setRegError('');
                  }}
                  className="text-xs text-[#5B5F66] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] transition-colors cursor-pointer"
                >
                  + Criar Conta
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              {regError && (
                <div className="flex items-center gap-2 p-2 rounded-md bg-[#FBEFEE] dark:bg-[#2D1A19] text-[#A8322D] dark:text-[#D2534D] text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{regError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#5B5F66] dark:text-[#9E9EA4] mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  required
                  value={regNome}
                  onChange={(e) => setRegNome(e.target.value)}
                  placeholder="Nome de usuário"
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-800 border border-[#D9DCE1] dark:border-zinc-700 rounded-md text-[#1D1D1F] dark:text-[#F5F5F7] focus:outline-hidden focus:border-[#2B4F7E] dark:focus:border-[#4A7AB5] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5B5F66] dark:text-[#9E9EA4] mb-1">
                  Senha (mínimo 6 caracteres)
                </label>
                <input
                  type="password"
                  required
                  value={regSenha}
                  onChange={(e) => setRegSenha(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-800 border border-[#D9DCE1] dark:border-zinc-700 rounded-md text-[#1D1D1F] dark:text-[#F5F5F7] focus:outline-hidden focus:border-[#2B4F7E] dark:focus:border-[#4A7AB5] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5B5F66] dark:text-[#9E9EA4] mb-1">
                  Confirmar senha
                </label>
                <input
                  type="password"
                  required
                  value={regConf}
                  onChange={(e) => setRegConf(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-zinc-800 border border-[#D9DCE1] dark:border-zinc-700 rounded-md text-[#1D1D1F] dark:text-[#F5F5F7] focus:outline-hidden focus:border-[#2B4F7E] dark:focus:border-[#4A7AB5] transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#2B4F7E] hover:bg-[#23426A] dark:bg-[#4A7AB5] dark:hover:bg-[#3E689B] rounded-md transition-colors cursor-pointer shadow-xs mt-1"
              >
                + Criar Conta
              </button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setRegError('');
                  }}
                  className="text-xs text-[#5B5F66] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] transition-colors cursor-pointer"
                >
                  Já tenho conta (Acessar)
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Quick test credentials */}
        <div className="p-3 rounded-md bg-[#F4F5F7] dark:bg-zinc-800/60 border border-[#D9DCE1] dark:border-zinc-700 text-center text-xs text-[#5B5F66] dark:text-[#9E9EA4]">
          <p className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] mb-0.5">
            Conta de Demonstração
          </p>
          <p>Usuário: <code>Jaider</code> · Senha: <code>medicina123</code></p>
        </div>

      </div>
    </div>
  );
};
