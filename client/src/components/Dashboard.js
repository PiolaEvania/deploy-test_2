import React, { useState } from 'react';
import TableLaporan from './tableComponent/TableLaporan';
import TableUser from './tableComponent/TableUser';
import Map from '../components/mapComponent/Map';
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import DashboardCount from './DashboardCount';

const Dashboard = () => {
  const [showContent, setShowContent] = useState('laporan');
  const navigate = useNavigate();

  const handleHomeButton = () => {
    navigate('/home');
  };

  const handleLogoutButton = () => {
    const getUser = localStorage.getItem('user');
    if (getUser) {
      Swal.fire({
        title: 'Anda yakin?',
        text: 'Anda akan log out!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Log Out',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          const removeUser = localStorage.removeItem('user');
          Cookies.remove('jwt');
          axios.post('http://localhost:5000/api/logout', removeUser, { withCredentials: true })
            .then(() => {
              toast.success('Logout berhasil.');
              navigate('/login');
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
    }
  };

  return (
    <div className="flex">
      <aside className="sidebar w-64 bg-darkCharcoal text-white min-h-screen flex flex-col justify-between p-4">
        <nav className="flex flex-col space-y-4">
          <button onClick={handleHomeButton} className='transition duration-150 ease-in-out'><img src='https://img.icons8.com/?size=50&id=84102&format=png&color=FFFFFF' className='hover:bg-blueA hover: rounded-md' alt='Home'></img></button>
          <button
            className={`items-center flex flex-row p-2 rounded-md text-left font-bold transition duration-150 ease-in-out ${showContent === 'laporan' ? 'bg-darkBlue text-white' : 'hover:bg-blueA'}`}
            onClick={() => setShowContent('laporan')}
          ><img src='https://img.icons8.com/?size=35&id=102914&format=png&color=FFFFFF' className='mr-2' alt='Laporan File'/>Data Laporan</button>
          <button
            className={`items-center flex flex-row p-2 rounded-md text-left font-bold transition duration-150 ease-in-out ${showContent === 'user' ? 'bg-darkBlue text-white' : 'hover:bg-blueA'}`}
            onClick={() => setShowContent('user')}
          ><img src='https://img.icons8.com/?size=35&id=120859&format=png&color=FFFFFF' className='mr-2' alt='User File'/>Data User</button>
          <button
            className={`items-center flex flex-row p-2 rounded-md text-left font-bold transition duration-150 ease-in-out ${showContent === 'map' ? 'bg-darkBlue text-white' : 'hover:bg-blueA'}`}
            onClick={() => setShowContent('map')}><img src='https://img.icons8.com/?size=35&id=85961&format=png&color=FFFFFF' className='mr-2' alt='Maps'/>Map</button>
        </nav>
        <div>
          <button
            className="align-bottom items-center flex flex-row p-2 mb-2 rounded-md text-left font-bold bg-red-500 hover:bg-red-400 text-white w-full transition duration-150 ease-in-out"
            onClick={handleLogoutButton}
          ><img src='https://img.icons8.com/?size=35&id=105512&format=png&color=FFFFFF' className='mr-2' alt='Log Out'></img>Logout</button>
        </div>
      </aside>

      <div className="flex-1 bg-white">
        <header className="header bg-darkCharcoal p-7 items-center">
          <h1 className="text-white text-center text-3xl font-bold">Dashboard</h1>
        </header>
        <main className="content">
          {showContent === 'laporan' && <TableLaporan />}
          {showContent === 'user' && <TableUser />}
          {showContent === 'map' && (
            <div>
              <div className="w-full h-[420px]">
                <Map />
              </div>
              <div className='mt-2'>
                <DashboardCount/>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
