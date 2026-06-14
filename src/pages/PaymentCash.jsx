import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentCash = () => {
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen relative overflow-x-hidden font-roboto bg-black pt-[80px]">

      {/* HEADER / TOP BAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#d40002] to-[#770001] h-[80px] flex items-center px-6 shadow-lg border-b border-white/5">
        <button
          onClick={() => navigate('/checkout')}
          className="w-10 h-10 bg-[#FFD900] rounded-full flex items-center justify-center shadow-md ml-[20px] hover:scale-110 transition-transform"
        >
          <img src="/back_arrow.svg" alt="back" className="w-6 h-6" />
        </button>
        <h1 className="font-paytone text-2xl text-white ml-4">
          JOS JIS - Halaman Pembayaran
        </h1>

        <div className="hidden md:flex ml-auto items-center gap-10 bg-[#770101] px-10 py-2 rounded-full mr-[95px] text-white border border-white/10 shadow-lg">
          <button onClick={() => navigate('/home')} className="hover:text-accent-yellow transition-colors font-roboto">Beranda</button>
          <button onClick={() => navigate('/menu')} className="hover:text-accent-yellow transition-colors font-roboto">Menu</button>
          <button onClick={() => navigate('/')} className="hover:text-accent-yellow transition-colors font-roboto">Keluar</button>
        </div>
      </header>

      {/* HERO SECTION */}
      <div className="relative h-[382px] w-full overflow-hidden flex flex-col items-center justify-center text-center px-8">
        <div className="absolute inset-0 z-0">
          <img src="/user-cash.png" alt="" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-white space-y-6 max-w-2xl pt-[20px]">
          <h2 className="font-paytone text-[40px] leading-tight drop-shadow-lg uppercase tracking-tight">Pembayaran Tunai</h2>
          <p className="text-[16px] font-normal leading-relaxed opacity-90">Anda telah memilih pembayaran tunai.</p>
          <div className="bg-white/90 border border-black/10 rounded-[6px] py-3 px-6 shadow-sm mx-auto w-fit">
            <span className="text-black/50 text-[14px]">Mohon konfirmasi setelah melakukan pembayaran</span>
          </div>
        </div>

        {/* Divider Vector */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] z-20">
          <img src="/wave_bottom.svg" alt="" className="w-full opacity-30" />
        </div>
      </div>

      {/* CONTENT AREA - Background moved up to start right after hero */}
      <main className="relative z-10 flex flex-col items-center overflow-hidden min-h-screen">

        {/* Background Overlay - Continuous from Hero (Node 2:2646) */}
        <div className="absolute inset-0 z-0 bg-[#770001]">
          <img
            src="/cash_bg_bottom.png"
            alt=""
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Unified Main Glass Container (Instructions + Details) */}
        <div className="relative z-10 w-full max-w-[1282px] mt-20 mb-12 bg-white/10 backdrop-blur-xl rounded-[20px] shadow-[0px_10px_40px_rgba(0,0,0,0.5)] border border-white/20 p-8 md:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: Instruction */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="font-roboto font-bold text-[40px] text-white leading-tight drop-shadow-lg">Silahkan Lakukan Pembayaran ke Kasir</h3>
                <p className="text-[20px] text-white/90 font-medium leading-relaxed">Harap siapkan pembayaran anda sesuai dengan nominal yang tertera agar transaksi dapat diproses dengan cepat.</p>
              </div>
            </div>

            {/* Right: Payment Details Area (Now inside the same glass box) */}
            <div className=" rounded-[20px] shadow-2xl p-10 space-y-10  backdrop-blur-md">
              <h4 className="font-roboto font-bold text-[32px] text-black text-center border-b border-black/10 pb-6 uppercase tracking-tight">Detail Pembayaran</h4>

              <div className="space-y-6">
                {/* Merchant Row */}
                <div className="flex items-center gap-6  border-black/10 rounded-[6px] p-4 ">
                  <img src="/cash_merchant_logo.png" alt="Merchant" className="w-[100px] h-[100px] object-cover rounded-md shadow-sm" />
                  <div className="flex flex-col gap-1">
                    <p className="font-medium text-[20px] text-black">Metode Pembayaran: <span className="font-bold">Tunai</span></p>
                    <p className="text-[15px] text-black/70">Nama Merchant: <span className="font-medium">Josjis</span></p>
                    <div className="text-[16px] text-black/70 leading-relaxed">
                      <p>Meja nomor: 12</p>
                      <p>Jenis pesanan: Makan di tempat</p>
                    </div>
                  </div>
                </div>

                {/* Stats Rows */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="size-[60px] bg-black/5 rounded-full flex items-center justify-center text-3xl shadow-inner">💳</div>
                      <span className="text-[20px] text-black/80 font-medium font-roboto">Jumlah</span>
                    </div>
                    <span className="text-[24px] font-bold text-black font-roboto">Rp 54.000</span>
                  </div>

                  <div className="flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="size-[60px] bg-black/5 rounded-full flex items-center justify-center text-3xl shadow-inner">📅</div>
                      <span className="text-[20px] text-black/80 font-medium font-roboto">Tanggal</span>
                    </div>
                    <span className="text-[20px] font-medium text-black font-roboto">{today}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Thanks Section - Glassmorphism applied */}
        <div className="relative z-10 w-full max-w-[1282px] mb-16 bg-white/10 backdrop-blur-xl rounded-[20px] overflow-hidden flex flex-col md:flex-row items-center p-12 gap-12 shadow-2xl border border-white/20">
          <img src="/wave_bottom.svg" alt="" className="absolute top-0 left-0 w-full opacity-10" />

          <div className="w-full md:w-[452px] h-[234px] rounded-[20px] overflow-hidden shrink-0 shadow-xl border-2 border-white/20">
            <img src="/cash_thanks_img.png" alt="Thanks" className="w-full h-full object-cover" />
          </div>

          <div className="flex-1 space-y-6 text-center md:text-left text-white">
            <h3 className="font-paytone text-[45px] leading-tight">
              TERIMA KASIH! <span className="text-6xl">🎉</span>
            </h3>
            <p className="text-[26px] font-light leading-relaxed opacity-90 font-roboto">
              Anda sudah menjadi bagian dari <br />
              pengalaman kuliner bersama <span className="font-bold underline decoration-accent-yellow">Josjis!</span>
            </p>
          </div>
        </div>

        {/* ACTION BUTTON - Lanjutkan */}
        <div className="relative z-20 mb-32 flex justify-center">
          <button
            onClick={() => navigate('/success')}
            className="bg-[#FFD900] text-[#743B0E] font-paytone text-[32px] py-6 px-24 rounded-[15px] shadow-[0_17px_10px_-1px_rgba(0,0,0,0.5)] border-2 border-white/40 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest"
          >
            Lanjutkan
          </button>
        </div>
      </main>
    </div>
  );
};

export default PaymentCash;
