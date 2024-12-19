import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditLaporan = () => {
  const navigate = useNavigate();
  const [laporanUser, setLaporanUser] = useState({});
  const [status, setStatus] = useState('');
  const url = window.location.href;
  const idLaporan = url.split('/')[6];

  const handleDashboardButton = () => {
    navigate('/dashboard');
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/api/laporan/${ idLaporan }`, { withCredentials: true })
      .then((response) => {
        setLaporanUser(response.data);
        setStatus(response.data.detailLaporan.status);
        console.log(response.data);
      }).catch((err) => {
        console.log(err);
      });
  }, [idLaporan]);

  function editLaporanHandle(e) {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/laporan/${ idLaporan }`, { status: status }, { withCredentials: true })
      .then((response) => {
        setLaporanUser(response.data);
        console.log(response.data);
        toast.success('Data laporan berhasil disimpan.');
        navigate('/dashboard');
      }).catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <header className='bg-darkCharcoal p-6 flex flex-row items-center justify-center'>
        <button onClick={handleDashboardButton} className='transition duration-150 ease-in-out'><img src='https://img.icons8.com/?size=50&id=Yj5svDsC4jQA&format=png&color=D9D9D9' className='hover:bg-blueA hover:rounded-md' alt='Dashboard'></img></button>
        <h1 className='flex-1 text-white text-center text-3xl font-bold'>Edit Laporan</h1>
      </header>
      <section className="p-5">
        <div className="flex items-center justify-center my-3">
          <div className="xl:mx-auto shadow-md p-4 xl:w-full xl:max-w-sm 2xl:max-w-md border border-darkCharcoal rounded-md">
            <form className="mt-2" encType="multipart/form-data" onSubmit={editLaporanHandle}>
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
                <div className='flex flex-col'>
                  <label className="text-base font-medium text-darkCharcoal">Status Laporan: {laporanUser?.detailLaporan?.status || ''}</label>
                  <select className='text-base text-darkCharcoal mt-2 w-max bg-transparent border border-darkCharcoal rounded' name='status' value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value='Proses'>Proses</option>
                    <option value='Selesai'>Selesai</option>
                    <option value='Ditolak'>Ditolak</option>
                  </select>
                </div>
                <div>
                  <button className="inline-flex w-full items-center justify-center rounded-md bg-darkCharcoal px-3.5 py-2.5 font-bold leading-7 text-white hover:bg-slate-900 transition duration-150 ease-in-out" type="submit">Edit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditLaporan;
