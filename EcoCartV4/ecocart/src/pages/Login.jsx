import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../firebase/AuthContext';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, googleLogin, facebookLogin, error, setError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/home');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      await googleLogin();
      navigate('/home');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    setError('');
    setLoading(true);

    try {
      await facebookLogin();
      navigate('/home');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-dark/50 backdrop-blur-sm border border-primary/20 rounded-xl p-8 shadow-glow">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-orbitron text-primary mb-2">Welcome Back</h1>
            <p className="text-light/70 font-futura">Sign in to continue your eco-friendly journey</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-500 font-futura text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-light/70 font-futura text-sm">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-primary/50" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-dark/50 border border-primary/20 rounded-lg text-light focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 font-futura transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-light/70 font-futura text-sm">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-primary/50" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-12 py-3 bg-dark/50 border border-primary/20 rounded-lg text-light focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 font-futura transition-all duration-300"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-primary/50 hover:text-primary transition-colors duration-300" />
                  ) : (
                    <Eye className="w-5 h-5 text-primary/50 hover:text-primary transition-colors duration-300" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 bg-dark/50 border-primary/20 rounded focus:ring-primary/20 text-primary"
                />
                <label htmlFor="remember" className="ml-2 text-light/70 font-futura text-sm">
                  Remember me
                </label>
              </div>
              <Link
                to="/reset-password"
                className="text-primary hover:text-primary/80 font-futura text-sm transition-colors duration-300"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg font-futura transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-primary/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-dark/50 text-light/70 font-futura">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full py-2 px-4 bg-dark/50 hover:bg-dark/80 border border-primary/20 rounded-lg font-futura text-light/70 hover:text-light transition-all duration-300 flex items-center justify-center gap-2"
              >
                <img src="/google.svg" alt="Google" className="w-5 h-5" />
                Google
              </button>
              <button
                onClick={handleFacebookLogin}
                disabled={loading}
                className="w-full py-2 px-4 bg-dark/50 hover:bg-dark/80 border border-primary/20 rounded-lg font-futura text-light/70 hover:text-light transition-all duration-300 flex items-center justify-center gap-2"
              >
                <img src="/facebook.svg" alt="Facebook" className="w-5 h-5" />
                Facebook
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-light/70 font-futura">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-primary hover:text-primary/80 transition-colors duration-300"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;