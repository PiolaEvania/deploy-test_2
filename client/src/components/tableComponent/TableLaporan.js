import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const TableLaporan = () => {
  const [laporanUser, setLaporanUser] = useState([]);
  const [filteredLaporan, setFilteredLaporan] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/laporan', { withCredentials: true })
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setLaporanUser(response.data.data);
          setFilteredLaporan(response.data.data); // Initialize filteredLaporan with all data
        } else {
          console.error('API response is not an array:', response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteLaporanHandler = (e) => {
    const getId = e.currentTarget.getAttribute('data-id');
    if (!getId) {
      toast.error('Invalid ID. Unable to delete laporan.');
      return;
    }

    Swal.fire({
      title: 'Anda yakin?',
      text: 'Data laporan ini akan dihapus secara permanen!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/api/laporan/${getId}`, { withCredentials: true })
          .then(() => {
            toast.success('Data Laporan berhasil dihapus');
            setLaporanUser(laporanUser.filter((laporan) => laporan._id !== getId));
            setFilteredLaporan(filteredLaporan.filter((laporan) => laporan._id !== getId));
          })
          .catch((error) => {
            toast.error('Kesalahan Server. Coba lagi nanti.');
            console.error('Delete failed:', error);
          });
      }
    });
  };

  const sortByStatusHandle = (e) => {
    const targetStatus = e.target.value;
    if (targetStatus === 'Status') {
      setFilteredLaporan(laporanUser);
    } else {
      const filterLaporan = laporanUser.filter((laporan) => laporan.status === targetStatus);
      setFilteredLaporan(filterLaporan);
    }
  };

  return (
    <div className="bg-white overflow-x-auto px-4">
      <table className="items-center table-auto w-full text-sm text-gray-500 divide-y divide-darkCharcoal">
        <thead className="text-xs text-left text-gray-700 uppercase">
          <tr>
            <th className="px-4 py-3">Username</th>
            <th className="px-4 py-3">Email Address</th>
            <th className="px-4 py-3">Latitude</th>
            <th className="px-4 py-3">Longitude</th>
            <th className="px-4 py-3">Description</th>
            <th className="px-4 py-3 text-center">Picture</th>
            <th className="px-4 py-3">
              <select className="ml-4 border-none bg-transparent border-gray-700 text-gray-700 uppercase text-center justify-center items-center" onChange={sortByStatusHandle} name="filter">
                <option value="Status">Status</option>
                <option value="Proses">Proses</option>
                <option value="Selesai">Selesai</option>
                <option value="Ditolak">Ditolak</option>
              </select>
            </th>
            <th className="px-4 py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-darkCharcoal">
          {filteredLaporan.map((laporan) => (
            <tr key={laporan._id}>
              <td className="px-4 py-2 break-words">{laporan.name}</td>
              <td className="px-4 py-2 break-words">{laporan.email}</td>
              <td className="px-4 py-2 break-words">{laporan.position.latitude}</td>
              <td className="px-4 py-2 break-words">{laporan.position.longitude}</td>
              <td className="px-4 py-2 break-words">{laporan.deskripsi}</td>
              <td className="px-4 py-2">
                <img className="w-40 h-20 object-cover rounded" src={laporan.image} alt='' />
              </td>
              <td className="px-11 py-2 items-center">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    laporan.status === 'Proses'
                      ? 'bg-yellow-200 text-orange-400'
                      : laporan.status === 'Selesai' ? 'bg-green-200 text-green-400' : laporan.status === 'Ditolak' ? 'bg-red-200 text-red-400' : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {laporan.status}
                </span>
              </td>
              <td className="px-4 py-10 flex flex-row">
                <Link
                  to={`/dashboard/laporan/edit/${laporan._id}`}
                  className="bg-blue-600 rounded hover:bg-blue-500 transition duration-150 ease-in-out"
                >
                  <img src="https://img.icons8.com/?size=44&id=86374&format=png&color=FFFFFF" alt="Edit Laporan" />
                </Link>
                <Link
                  to={`/dashboard/sendStatus/${laporan._id}`}
                  className="bg-orange-600 rounded mx-2 hover:bg-orange-500 transition duration-150 ease-in-out"
                >
                  <img src="https://img.icons8.com/?size=44&id=85500&format=png&color=FFFFFF" alt="Kirim Status Laporan" />
                </Link>
                <button
                  onClick={deleteLaporanHandler}
                  className="bg-red-600 rounded hover:bg-red-500 transition duration-150 ease-in-out"
                  data-id={laporan._id}
                >
                  <img src="https://img.icons8.com/?size=44&id=99961&format=png&color=FFFFFF" alt="Hapus Laporan" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableLaporan;
