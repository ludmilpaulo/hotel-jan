"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, User, Lock, Mail, UserCheck, AlertCircle, CheckCircle } from 'lucide-react';

interface RegisterFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

export default function RegisterForm({ onSuccess, onSwitchToLogin }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password_confirm: '',
    role: 'GUEST' as 'GUEST' | 'STAFF' | 'MANAGER' | 'ADMIN'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});
  
  const { register } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear field-specific errors when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    // Clear general error when user starts typing
    if (error) {
      setError('');
    }
  };

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    // Check required fields
    if (!formData.first_name.trim()) {
      errors.first_name = 'Nome é obrigatório';
    }
    
    if (!formData.last_name.trim()) {
      errors.last_name = 'Sobrenome é obrigatório';
    }
    
    if (!formData.username.trim()) {
      errors.username = 'Nome de usuário é obrigatório';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email inválido';
    }
    
    if (!formData.password) {
      errors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 8) {
      errors.password = 'Senha deve ter pelo menos 8 caracteres';
    }
    
    if (!formData.password_confirm) {
      errors.password_confirm = 'Confirmação de senha é obrigatória';
    } else if (formData.password !== formData.password_confirm) {
      errors.password_confirm = 'As senhas não coincidem';
    }
    
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    setFieldErrors({});

    // Validate form before submission
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const result = await register(formData);
      
      if (result.success) {
        setSuccess(true);
        setError('');
        
        // Show success message briefly, then redirect
        setTimeout(() => {
          // Redirect based on user role
          switch (formData.role) {
            case 'ADMIN':
              router.push('/admin');
              break;
            case 'MANAGER':
            case 'STAFF':
              router.push('/staff');
              break;
            case 'GUEST':
            default:
              router.push('/dashboard');
              break;
          }
        }, 1500);
        
        onSuccess?.();
      } else {
        setError(result.error || 'Erro ao criar conta. Verifique os dados e tente novamente.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Erro de conexão. Verifique sua internet e tente novamente.');
    }
    
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <UserCheck className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Registrar</h1>
        <p className="text-gray-600">Crie sua conta para acessar o sistema</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            Conta criada com sucesso! Redirecionando...
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nome
            </label>
            <input
              type="text"
              name="first_name"
              required
              value={formData.first_name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 transition-all outline-none ${
                fieldErrors.first_name 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                  : 'border-gray-200 focus:border-yellow-500 focus:ring-yellow-200'
              }`}
              placeholder="Seu nome"
            />
            {fieldErrors.first_name && (
              <p className="text-red-600 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {fieldErrors.first_name}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Sobrenome
            </label>
            <input
              type="text"
              name="last_name"
              required
              value={formData.last_name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 transition-all outline-none ${
                fieldErrors.last_name 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                  : 'border-gray-200 focus:border-yellow-500 focus:ring-yellow-200'
              }`}
              placeholder="Seu sobrenome"
            />
            {fieldErrors.last_name && (
              <p className="text-red-600 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {fieldErrors.last_name}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nome de Usuário
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 transition-all outline-none ${
                fieldErrors.username 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                  : 'border-gray-200 focus:border-yellow-500 focus:ring-yellow-200'
              }`}
              placeholder="Nome de usuário único"
            />
          </div>
          {fieldErrors.username && (
            <p className="text-red-600 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {fieldErrors.username}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 transition-all outline-none ${
                fieldErrors.email 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                  : 'border-gray-200 focus:border-yellow-500 focus:ring-yellow-200'
              }`}
              placeholder="seu@email.com"
            />
          </div>
          {fieldErrors.email && (
            <p className="text-red-600 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {fieldErrors.email}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Tipo de Usuário
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all outline-none"
          >
            <option value="GUEST">Hóspede</option>
            <option value="STAFF">Funcionário</option>
            <option value="MANAGER">Gerente</option>
            <option value="ADMIN">Administrador</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Senha
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl focus:ring-2 transition-all outline-none ${
                fieldErrors.password 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                  : 'border-gray-200 focus:border-yellow-500 focus:ring-yellow-200'
              }`}
              placeholder="Mínimo 8 caracteres"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {fieldErrors.password && (
            <p className="text-red-600 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {fieldErrors.password}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Confirmar Senha
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="password_confirm"
              required
              value={formData.password_confirm}
              onChange={handleChange}
              className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl focus:ring-2 transition-all outline-none ${
                fieldErrors.password_confirm 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                  : 'border-gray-200 focus:border-yellow-500 focus:ring-yellow-200'
              }`}
              placeholder="Confirme sua senha"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {fieldErrors.password_confirm && (
            <p className="text-red-600 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {fieldErrors.password_confirm}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || success}
          className={`w-full font-bold py-3 rounded-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
            success 
              ? 'bg-green-500 text-white' 
              : 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600'
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
              Criando conta...
            </div>
          ) : success ? (
            <div className="flex items-center justify-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Conta criada com sucesso!
            </div>
          ) : (
            'Criar Conta'
          )}
        </button>
      </form>

      {onSwitchToLogin && (
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Já tem uma conta?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-yellow-600 hover:text-yellow-700 font-semibold"
            >
              Faça login aqui
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
