import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../firebase/firebase'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      navigate('/account');
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    // Clear form data when component mounts
    setFormData({
      email: '',
      password: ''
    });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!formData.email || !formData.password) {
        throw new Error('Please fill in all fields');
      }

      await signInWithEmailAndPassword(
        auth,
        formData.email.trim(),
        formData.password
      );
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        setError('Invalid email or password. Please try again.');
      } else if (error.code === 'auth/user-not-found') {
        setError('No account found with this email.');
      } else if (error.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-white px-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-lg">
        <img
          src="/logo.svg"
          alt="EcoCart"
          className="mx-auto mb-4 h-10"
        />

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-600 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@mail.com"
            className="w-full px-4 py-2 rounded-md bg-white text-black border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            autocomplete="off"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 rounded-md bg-white text-black border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            autocomplete="off"
          />

          <button
            type="submit"
            className="w-full py-1 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        <div className="mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full py-1 bg-white border border-zinc-700 rounded-md text-black font-medium flex items-center justify-center gap-2"
            disabled={loading}
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            {loading ? 'Signing in...' : 'Sign in with Google'}
          </button>
        </div>

        <div className='text-center mt-4'>
          <p className='text-sm text-black'>Don't have an account?</p>
          <Link to='/signup' className='text-blue-500 hover:underline text-sm'>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;