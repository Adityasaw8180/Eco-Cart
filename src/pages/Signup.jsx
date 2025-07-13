import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../firebase/firebase'

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    mobileNumber: '',
    username: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      if (!formData.email || !formData.password || !formData.username) {
        throw new Error('Please fill in all required fields');
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email.trim(),
        formData.password
      );

      // Update user profile with username
      await updateProfile(userCredential.user, {
        displayName: formData.username
      });
      
      const user = {
        email: userCredential.user.email,
        username: formData.username,
        mobileNumber: formData.mobileNumber
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/account');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else if (error.code === 'auth/weak-password') {
        setError('Password is too weak. Please use a stronger password.');
      } else {
        setError(error.message);
      }
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
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full px-4 py-2 rounded-md bg-white text-black border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address"
            className="w-full px-4 py-2 rounded-md bg-white text-black border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 rounded-md bg-white text-black border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            className="w-full px-4 py-2 rounded-md bg-white text-black border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <div className="flex gap-2">
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Mobile Number"
              className="flex-1 px-4 py-2 rounded-md bg-white text-black border border-zinc-700"
            />
          </div>

          {/* <p className="text-xs text-gray-500">
            By signing up, you consent to our{" "}
            <a href="#" className="underline text-gray-300">
              Terms of Use
            </a>{" "}
            and{" "}
            <a href="#" className="underline text-gray-300">
              Privacy Policy
            </a>.
          </p> */}

          <button
            type="submit"
            className="w-full py-1 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign up'}
          </button>
        </form>

        <div className='text-center mt-4'>
          <p className='text-sm text-black'>Already have an account?</p>
          <Link to='/login' className='text-blue-500 hover:underline text-sm'>
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;