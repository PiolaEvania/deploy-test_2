import axios from 'axios';
import { useState } from 'react';
import { Bounce, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const toastUtil = {
    position: 'top-left',
    closeOnClick: true,
    draggable: true,
    transition: Bounce,
  };

  async function submitUserData(e) {
    e.preventDefault();
    if (!userData.email || !userData.password) {
      toast.error('Semua field harus diisi!', toastUtil);
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/login', userData, { withCredentials: true });
      localStorage.setItem('user', JSON.stringify(response.data.user));
      if (response.status === 200) {
        toast.success(`Akun ${ response.data.message } terdaftar.`, toastUtil);
        setUser(response.data.user);
      }
      if (response.data.user.name === 'admin') {
        console.log('Navigating to /dashboard');
        navigate('/dashboard');
      } else {
        console.log('Navigating to /home');
        navigate('/home');
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error('Error: Email atau Password salah!', toastUtil);
        return;
      } else {
        toast.error('Terjadi kesalahan pada server.', toastUtil);
        return;
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-darkCharcoal py-50 px-6 py-12 lg:px-8">
      <div className="w-full max-w-sm sm:mx-auto bg-white rounded-lg border border-gray-200 p-6">
        <h1 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Welcome to RouteSure
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Log in to your account
        </p>

        <div className="mt-10">
          <form method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email Address
              </label>
              <div className="relative mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                  onChange={(e) => setUserData((prevState) => ({ ...prevState, email: e.target.value }))}
                />
                <img
                  src="https://img.icons8.com/?size=25&id=85500&format=png&color=0D0D0D"
                  alt="Email Icon"
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                  Password
                </label>
              </div>
              <div className="relative mt-2">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                  onChange={(e) => setUserData((prevState) => ({ ...prevState, password: e.target.value }))}
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
              <div className="flex items-center justify-end pt-2">
                <a href="/forgotPassword" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={submitUserData}
              ><img src='https://img.icons8.com/?size=25&id=83887&format=png&color=FFFFFF' className='mr-2' alt='Log in'/>Login</button>
            </div>
          </form>
          <p className="mt-5 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <a href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Register now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;