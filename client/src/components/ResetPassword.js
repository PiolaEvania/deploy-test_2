import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

const ResetPassword = () => {

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function resetPasswordHandler(e) {
    e.preventDefault();
    const url = window.location.href;
    const token = url.split('/')[4];

    if (password !== confirmPassword) {
      toast.error('Password dan Confirm Password tidak sama!');
      return;
    }
    axios.put(`http://localhost:5000/api/resetPassword/${ token }`,
      { password: password })
      .then((response) => {
        console.log(response.data);
        toast.success(response.data.message);
        setPassword('');
        setConfirmPassword('');
      }).catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  }


  return (
    <div className="flex min-h-screen items-center justify-center bg-darkCharcoal px-6 py-12 lg:px-8">
      <div className="w-full max-w-md bg-white rounded shadow-md p-6">
        <h1 className="text-center text-2xl font-bold text-gray-900">Reset Password</h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Set a new password to secure your account
        </p>
        <form method="POST" className="mt-6 space-y-4">
          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <div className="relative mt-2">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                placeholder="Enter your new password"
                required
                className="block w-full rounded-md bg-gray-100 px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                onChange={(e) => setPassword(e.target.value)}
              />
              <img
                src={showPassword
                  ? 'https://img.icons8.com/?size=25&id=121530&format=png&color=0D0D0D'
                  : 'https://img.icons8.com/?size=25&id=85130&format=png&color=0D0D0D'}
                alt="Toggle Password Visibility"
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer ease-in-out"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            </div>
          </div>
          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">
              Confirm Password
            </label>
            <div className="relative mt-2">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Re-enter your new password"
                required
                className="block w-full rounded-md bg-gray-100 px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <img
                src={showConfirmPassword
                  ? 'https://img.icons8.com/?size=25&id=121530&format=png&color=0D0D0D'
                  : 'https://img.icons8.com/?size=25&id=85130&format=png&color=0D0D0D'}
                alt="Toggle Password Visibility"
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer ease-in-out"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              />
            </div>
          </div>
          {/* Login Redirect */}
          <div className="mt-4 text-center">
            <a href="/login" className="text-sm text-indigo-600 hover:underline">
              Login to RouteSure
            </a>
          </div>
          {/* Reset Button */}
          <div className="pt-6">
            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition duration-150 ease-in-out"
              onClick={resetPasswordHandler}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
