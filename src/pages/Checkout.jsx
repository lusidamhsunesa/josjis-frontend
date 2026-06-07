import React from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden font-roboto pt-[80px]" style={{ backgroundImage: "linear-gradient(56.7deg, rgb(210, 1, 2) 0%, rgb(119, 0, 1) 39.2%)" }}>
      
      {/* HERO SECTION - Height increased, image centered, text centered */}
      <div className="relative h-[480px] w-full overflow-hidden flex flex-col items-center justify-center text-center px-8 md:px-[170px]">
        <div className="absolute inset-0 z-0">
          <img 
            src="/checkout_bg_full.png" 
            alt="" 
            className="w-full h-full object-center object-cover opacity-70 pointer-events-none"
          />
          <div className="absolute inset-0 bg-black/56" />
        </div>
        
        <div className="relative z-10 text-white space-y-4 pt-[20px]">
          <h2 className="font-paytone text-[56px] md:text-[64px] uppercase tracking-tight leading-tight drop-shadow-md">Pembayaran</h2>
          <p className="text-[24px] md:text-[29px] opacity-100 font-roboto font-normal leading-relaxed max-w-3xl">Periksa pesanan Anda dan lengkapi detailnya.</p>
        </div>

        {/* Wave Bottom Vector inside Hero */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] z-20">
            <img src="/wave_bottom.svg" alt="" className="w-full object-cover opacity-30" />
        </div>
      </div>

      {/* TOP BAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#d40002] to-[#770001] h-[80px] flex items-center px-6 shadow-[0px_0px_6px_rgba(0,0,0,0.12)] border-b border-white/5">
        <div className="contents cursor-pointer" onClick={() => navigate(-1)}>
          <div className="w-10 h-10 bg-[#FFD900] rounded-full flex items-center justify-center shadow-md ml-[20px] hover:scale-110 transition-transform">
            <img src="/back_arrow.svg" alt="back" className="w-6 h-6" />
          </div>
        </div>
        <h1 className="font-paytone text-2xl text-white ml-4">
          JOS JIS - Halaman Pembayaran
        </h1>

        <div className="hidden md:flex ml-auto items-center gap-10 bg-[#770101] px-10 py-2 rounded-full mr-[95px] text-white border border-white/10 shadow-lg">
          <button onClick={() => navigate('/home')} className="hover:text-accent-yellow transition-colors font-roboto">Beranda</button>
          <button onClick={() => navigate('/menu')} className="hover:text-accent-yellow transition-colors font-roboto">Menu</button>
          <button onClick={() => navigate('/')} className="hover:text-accent-yellow transition-colors font-roboto">Keluar</button>
        </div>
      </header>

      <main className="relative z-10 flex flex-col items-center pb-20 pt-[80px]">
        {/* Main Content Container - Positioned lower on the solid red background area */}
        <div className="w-full max-w-[940px] bg-[rgba(175,175,175,0.6)] rounded-[30px] shadow-[0px_8px_12.9px_6px_rgba(255,255,255,0.39)] p-12 flex flex-col gap-12 backdrop-blur-md border border-white/10 mt-16">
          
          <div className="flex flex-col gap-4 relative overflow-hidden">
            {/* List Row Item 1 */}
            <div className="flex justify-between items-start pb-4 border-b border-black/10 relative">
               <div className="flex flex-col">
                  <span className="text-[20px] font-roboto font-normal text-black">Penyetan Ati Ampela</span>
                  <span className="text-[16px] text-black/50 font-roboto">Rp 24.000</span>
               </div>
               <div className="flex items-center gap-4">
                  <div className="w-[92px] h-[32px] bg-[rgba(222,222,222,0.75)] rounded-[20px] flex items-center justify-between px-3 border border-black/5">
                     <button className="text-black/80 font-bold hover:scale-125 transition-transform">−</button>
                     <span className="text-black font-bold">2</span>
                     <button className="text-black/80 font-bold hover:scale-125 transition-transform">+</button>
                  </div>
               </div>
            </div>

            {/* List Row Item 2 */}
            <div className="flex justify-between items-start pb-4 border-b border-black/10 relative">
               <div className="flex flex-col">
                  <span className="text-[20px] font-roboto font-normal text-black">Penyetan Ayam</span>
                  <span className="text-[16px] text-black/50 font-roboto">Rp 15.000</span>
               </div>
               <div className="flex items-center gap-4">
                  <div className="w-[92px] h-[32px] bg-[rgba(222,222,222,0.75)] rounded-[200px] flex items-center justify-between px-3 border border-black/5">
                     <button className="text-black/80 font-bold hover:scale-125 transition-transform">−</button>
                     <span className="text-black font-bold">1</span>
                     <button className="text-black/80 font-bold hover:scale-125 transition-transform">+</button>
                  </div>
               </div>
            </div>

            {/* List Row Item 3 */}
            <div className="flex justify-between items-start relative">
               <div className="flex flex-col">
                  <span className="text-[20px] font-roboto font-normal text-black">Es Jeruk</span>
                  <span className="text-[16px] text-black/50 font-roboto">Rp 15.000</span>
               </div>
               <div className="flex items-center gap-4">
                  <div className="w-[92px] h-[32px] bg-[rgba(222,222,222,0.74)] rounded-[20px] flex items-center justify-between px-3 border border-black/5">
                     <button className="text-black/80 font-bold hover:scale-125 transition-transform">−</button>
                     <span className="text-black font-bold">3</span>
                     <button className="text-black/80 font-bold hover:scale-125 transition-transform">+</button>
                  </div>
               </div>
            </div>
          </div>

          {/* Form Fields Area */}
          <div className="flex flex-col gap-10">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                   <label className="text-[14px] font-roboto font-medium text-black">Nama Pemesan</label>
                   <input 
                    type="text"
                    placeholder="Masukkan Nama Anda"
                    className="h-[36px] bg-white border border-black/10 rounded-[6px] px-3 font-roboto font-bold text-[14px] text-black placeholder:text-black/50 outline-none focus:ring-1 focus:ring-black/20"
                   />
                </div>
                <div className="flex flex-col gap-2">
                   <label className="text-[14px] font-roboto font-medium text-black">No. Antrian (Otomatis)</label>
                   <div className="h-[36px] bg-white border border-black/10 rounded-[6px] px-3 flex items-center">
                      <span className="text-[14px] font-roboto font-bold text-black/50">013131</span>
                   </div>
                </div>
                <div className="flex flex-col gap-2">
                   <label className="text-[14px] font-roboto font-medium text-black">Tipe Pesanan</label>
                   <div className="flex gap-4">
                      <button className="flex-1 h-[36px] bg-white border border-black/10 rounded-[6px] font-roboto font-bold text-[15px] text-black/85 hover:bg-gray-50 transition-colors shadow-sm text-center">Makan Sini</button>
                      <button className="flex-1 h-[36px] bg-white/70 border border-black/10 rounded-[6px] font-roboto font-bold text-[15px] text-black/50 hover:bg-white transition-colors text-center">Bungkus</button>
                   </div>
                </div>
                <div className="flex flex-col gap-2">
                   <label className="text-[14px] font-roboto font-medium text-black">Nomor Meja</label>
                   <input 
                    type="text"
                    placeholder="Masukkan nomor meja yang ditempati"
                    className="h-[36px] bg-white border border-black/10 rounded-[6px] px-3 font-roboto font-bold text-[14px] text-black placeholder:text-black/50 outline-none focus:ring-1 focus:ring-black/20"
                   />
                </div>
                <div className="md:col-span-2 flex flex-col gap-2">
                   <label className="text-[14px] font-roboto font-medium text-black">Catatan Tambahan (Optional)</label>
                   <textarea 
                    placeholder="Contoh: Sambal dipisah, es teh jangan terlalu manis."
                    className="min-h-[60px] bg-white border border-black/10 rounded-[6px] px-3 py-2 font-roboto font-bold text-[14px] text-black placeholder:text-black/50 outline-none focus:ring-1 focus:ring-black/20 resize-none"
                   />
                </div>
             </div>

             {/* Total Display */}
             <div className="flex justify-center mt-4">
                <div className="flex items-center gap-12 border-t border-black/5 pt-6 w-full justify-center">
                   <span className="font-paytone text-[24px] text-black uppercase opacity-60 text-center">Total:</span>
                   <span className="font-paytone text-[24px] text-black text-center">Rp 54.000</span>
                </div>
             </div>

             {/* Payment Selection Area */}
             <div className="flex flex-col items-center gap-8 border-t border-black/5 pt-10">
                <h3 className="font-paytone text-[24px] text-black text-center uppercase tracking-tight">Pilih Pembayaran</h3>
                <div className="flex gap-10">
                   <button 
                    onClick={() => navigate('/payment/qris')}
                    className="w-[193px] h-[47px] bg-[#88391F] rounded-[6px] shadow-[0px_7px_5px_rgba(6,6,6,0.55)] flex items-center justify-center hover:brightness-110 active:scale-95 transition-all"
                   >
                      <span className="font-paytone text-[15px] text-[#FFD900] uppercase">NON TUNAI</span>
                   </button>
                   <button 
                     onClick={() => navigate('/payment/cash')}
                     className="w-[193px] h-[47px] bg-[#FFD900] rounded-[6px] shadow-[0px_7px_5px_rgba(6,6,6,0.55)] flex items-center justify-center group active:scale-95 transition-transform"
                   >
                     <span className="font-paytone text-[15px] text-[#743B0E] uppercase">TUNAI</span>
                   </button>
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;