import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">RouteSure</h1>
        <p className="text-base sm:text-lg mb-6">
          RouteSure adalah aplikasi berbasis website sebagai wadah pelaporan kondisi infrastruktur yang bermasalah.
          Project ini dibuat untuk memenuhi tugas akhir SIB Dicoding Batch 7 Pengembang Front-End dan Back-End.
        </p>
      </div>

      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8">Team</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 sm:w-36 sm:h-36 border border-darkCharcoal rounded-full overflow-hidden mb-4">
              <img
                src="https://images2.imgbox.com/59/2a/440n3W5K_o.jpg"
                alt="Febrio Dwi Setiawan"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-base sm:text-lg font-semibold">
              <a href="https://www.linkedin.com/in/febrio-dwi-setiawan-7a634329b" className='flex flex-row'>Febrio Dwi Setiawan<img src='https://img.icons8.com/?size=25&id=85141&format=png&color=0D0D0D' alt="LinkedIn" className='ml-1 hover:bg-blue-300 hover:rounded'></img>
              </a>
            </h3>
            <p className="text-sm text-gray-600">Founder</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-32 h-32 sm:w-36 sm:h-36 border border-darkCharcoal rounded-full overflow-hidden mb-4">
              <img
                src="https://images2.imgbox.com/20/b4/JHhmdHps_o.jpg"
                alt="Piola Evania"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-base sm:text-lg font-semibold">
              <a href="https://www.linkedin.com/in/piola-evania" className='flex flex-row'>Piola Evania<img src='https://img.icons8.com/?size=25&id=85141&format=png&color=0D0D0D' className='ml-1 hover:bg-blue-300 hover:rounded' alt="LinkedIn"></img></a>
            </h3>
            <p className="text-sm text-gray-600">Co-Founder</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-32 h-32 sm:w-36 sm:h-36 border border-darkCharcoal rounded-full overflow-hidden mb-4">
              <img
                src="https://images2.imgbox.com/62/6c/dOaGpmGd_o.jpg?"
                alt="Dhea Aprilinda Utami"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-base sm:text-lg font-semibold">
              <a href="https://www.linkedin.com/in/dhea-aprilinda-utami" className='flex flex-row'>Dhea Aprilinda Utami<img src='https://img.icons8.com/?size=25&id=85141&format=png&color=0D0D0D' className='ml-1 hover:bg-blue-300 hover:rounded' alt="LinkedIn"></img></a>
            </h3>
            <p className="text-sm text-gray-600">Developer</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-32 h-32 sm:w-36 sm:h-36 border border-darkCharcoal rounded-full overflow-hidden mb-4">
              <img
                src="https://images2.imgbox.com/73/3a/P1sLHtN1_o.jpg"
                alt="Dian Nur Rahmah"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-base sm:text-lg font-semibold">
              <a href="https://www.linkedin.com/in/diannurrahmah" className='flex flex-row'>Dian Nur Rahmah <img src='https://img.icons8.com/?size=25&id=85141&format=png&color=0D0D0D' className='ml-1 hover:bg-blue-300 hover:rounded' alt="LinkedIn"></img></a>
            </h3>
            <p className="text-sm text-gray-600">Project Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
