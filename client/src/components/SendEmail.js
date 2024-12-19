import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SendEmail = () => {
  const [laporanUser, setLaporanUser] = useState({});
  const [status, setStatus] = useState('');
  const url = window.location.href;
  const idLaporan = url.split('/')[5];
  const form = useRef();
  const navigate = useNavigate();

  const handleDashboardButton = () => {
    navigate('/dashboard');
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/api/laporan/${ idLaporan }`, { withCredentials: true })
      .then((response) => {
        setLaporanUser(response.data);
        setStatus(response.data.detailLaporan.status);
      }).catch((err) => {
        console.log(err);
      });
  }, [idLaporan]);

  function sendEmailHandler(e) {
    e.preventDefault();

    const templateId =
      laporanUser?.detailLaporan?.status === 'Selesai'
        ? 'template_ppuy95g'
        : laporanUser?.detailLaporan?.status === 'Ditolak' ? 'template_dc55h3n' : null;

    if (!templateId) {
      toast.error('Template email tidak ditemukan untuk status laporan ini.');
      return;
    }

    const templateParams = {
      name: laporanUser?.detailLaporan?.name,
      email: laporanUser?.detailLaporan?.email,
      status: laporanUser?.detailLaporan?.status,
      image: laporanUser?.detailLaporan?.image,
    };

    emailjs
      .send('service_qq81thb', templateId, templateParams, '0mgCiwlEqfhvm9Nln')
      .then(
        () => {
          console.log('SUCCESS!');
          toast.success('Status laporan berhasil dikirim ke User.');
        },
        (error) => {
          console.log('FAILED...', error);
          toast.error(error.text);
        }
      );
  }

  return (
    <div>
      <header className='bg-darkCharcoal p-6 flex flex-row items-center'>
        <button onClick={handleDashboardButton} className='transition duration-150 ease-in-out'><img src='https://img.icons8.com/?size=50&id=Yj5svDsC4jQA&format=png&color=D9D9D9' className='hover:bg-blueA hover:rounded-md' alt='Dashboard'></img></button>
        <h1 className='flex-1 text-white text-center text-3xl font-bold'>Kirim Status Laporan</h1>
      </header>
      <section className="p-5">
        <div className="flex items-center justify-center my-3">
          <div className="xl:mx-auto shadow-md p-4 xl:w-full xl:max-w-sm 2xl:max-w-md border border-darkCharcoal rounded-md">
            <form className="mt-2" ref={form} encType="multipart/form-data" onSubmit={sendEmailHandler}>
              <div className="space-y-4">
                <div>
                  <label className="text-base font-medium text-darkCharcoal">Username</label>
                  <input type="text" className="mt-2 flex h-10 w-full rounded-md border border-darkCharcoal bg-transparent px-3 py-2 text-sm text-darkCharcoal" name="name" disabled value={laporanUser?.detailLaporan?.name || ''}/>
                </div>
                <div>
                  <label className="text-base font-medium text-darkCharcoal">Email Address</label>
                  <input type="email" className="mt-2 flex h-10 w-full rounded-md border border-darkCharcoal bg-transparent px-3 py-2 text-sm text-darkCharcoal" name="email" disabled value={laporanUser?.detailLaporan?.email || ''}/>
                </div>
                <div>
                  <label className="text-base font-medium text-darkCharcoal">Description</label>
                  <input type="text" className="mt-2 flex h-10 w-full rounded-md border border-darkCharcoal bg-transparent px-3 py-2 text-sm  text-darkCharcoal" name="deskripsi" disabled value={laporanUser?.detailLaporan?.deskripsi || ''}/>
                </div>
                <div>
                  <label className="text-base font-medium text-darkCharcoal">Latitude</label>
                  <input type="number" className="mt-2 flex h-10 w-full rounded-md border border-darkCharcoal bg-transparent px-3 py-2 text-sm text-darkCharcoal" name="latitude" disabled value={laporanUser?.detailLaporan?.position?.latitude || ''}/>
                </div>
                <div>
                  <label className="text-base font-medium text-darkCharcoal">Longitude</label>
                  <input type="number" className="mt-2 flex h-10 w-full rounded-md border border-darkCharcoal bg-transparent px-3 py-2 text-sm text-darkCharcoal" name="longitude" disabled value={laporanUser?.detailLaporan?.position?.longitude || ''}/>
                </div>
                <div>
                  <label className="text-base font-medium text-darkCharcoal">Picture</label>
                  <img className='mt-2 rounded-md' src={laporanUser?.detailLaporan?.image || ''} alt='' />
                </div>
                <div>
                  <label className="text-base font-medium text-darkCharcoal">Status Laporan: {laporanUser?.detailLaporan?.status || ''}</label>
                </div>
                <div>
                  <button className="inline-flex w-full items-center justify-center rounded-md bg-darkCharcoal px-3.5 py-2.5 font-bold leading-7 text-white hover:bg-slate-900 transition duration-150 ease-in-out"
                  >Kirim Email</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SendEmail;
