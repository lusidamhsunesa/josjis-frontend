import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const OrderStatusCustomer = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black relative overflow-x-hidden font-roboto pt-[80px]">
      <Navbar />
      
      {/* Background Main */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/order_status_bg.png" 
          alt="" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-[#770001]/50 mix-blend-multiply" />
      </div>

      {/* HERO SECTION */}
      <div className="relative h-[373px] w-full overflow-hidden flex flex-col items-center justify-center text-center px-8">
        <div className="absolute inset-0 z-0">
          <img src="/order_status_hero_bg.png" alt="" className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative z-10 text-white space-y-6">
          <h2 className="font-roboto font-bold text-[48px] leading-tight drop-shadow-lg uppercase tracking-tight">Lacak Pesananmu</h2>
          <p className="text-[24px] font-normal leading-relaxed opacity-90 max-w-2xl">Pantau setiap langkah, dari dapur ke mejamu.</p>
        </div>

        {/* Divider Vector */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] z-20">
           <img src="/wave_bottom.svg" alt="" className="w-full opacity-30" />
        </div>
      </div>

      {/* CONTENT AREA */}
      <main className="relative z-10 py-20 px-8 md:px-[170px] flex flex-col items-center">
        
        {/* Ringkasan Pesanan Section */}
        <div className="w-full max-w-[1220px] bg-white/10 backdrop-blur-xl rounded-[25px] border border-white/20 p-12 mb-12 shadow-2xl">
           <h3 className="font-roboto font-bold text-[40px] text-white text-center mb-12">Ringkasan Pesanan</h3>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Row 1: Order Number & Status */}
              <div className="bg-black/20 border border-white/10 rounded-[12px] p-6 flex gap-6 items-center">
                 <div className="size-[80px] shrink-0">
                    <img src="/icon_order.png" alt="Order" className="size-full object-contain" />
                 </div>
                 <div className="space-y-2">
                    <p className="text-[20px] font-medium text-white">Order #JOS-18427</p>
                    <span className="inline-block bg-[#FFD464]/50 border border-black/10 px-2 py-1 rounded-[4px] text-[12px] text-white">Nomor Pesanan</span>
                 </div>
              </div>

              <div className="bg-black/20 border border-white/10 rounded-[12px] p-6 flex gap-6 items-center">
                 <div className="size-[80px] shrink-0">
                    <img src="/icon_status.png" alt="Status" className="size-full object-contain" />
                 </div>
                 <div className="space-y-1">
                    <p className="text-[20px] font-medium text-white">Status</p>
                    <p className="text-[16px] text-white/80">Makananmu sedang dimasak sekarang.</p>
                    <span className="inline-block bg-[#FFD900]/50 border border-black/10 px-2 py-1 rounded-[4px] text-[12px] text-white">Sedang Diproses</span>
                 </div>
              </div>

              {/* Row 2: Table & Estimation */}
              <div className="bg-black/20 border border-white/10 rounded-[12px] p-6 flex gap-6 items-center">
                 <div className="size-[80px] shrink-0">
                    <img src="/icon_table.png" alt="Table" className="size-full object-contain" />
                 </div>
                 <div className="space-y-1 text-white">
                    <p className="text-[20px] font-medium">Meja</p>
                    <p className="text-[16px] opacity-80">Meja 12</p>
                 </div>
              </div>

              <div className="bg-black/20 border border-white/10 rounded-[12px] p-6 flex gap-6 items-center">
                 <div className="size-[80px] shrink-0">
                    <img src="/icon_wait.png" alt="Wait" className="size-full object-contain" />
                 </div>
                 <div className="space-y-2">
                    <p className="text-[20px] font-medium text-white">Estimasi Waktu Tunggu</p>
                    <p className="text-[16px] text-white/80">12–18 menit</p>
                    <span className="inline-block bg-[#FFD900]/50 border border-black/10 px-2 py-1 rounded-[4px] text-[12px] text-white">Estimasi Langsung</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Indikator Status Section */}
        <div className="w-full max-w-[1220px] bg-white/10 backdrop-blur-xl rounded-[25px] border border-white/20 p-12 mb-12 shadow-2xl">
           <h3 className="font-roboto font-bold text-[40px] text-white text-center mb-12">Indikator Status Pesanan</h3>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-2 border-r border-white/10 last:border-0 p-4">
                 <p className="text-white/60 uppercase tracking-widest text-sm font-bold">Diterima</p>
                 <p className="text-white text-3xl font-bold">Selesai</p>
                 <p className="text-[#FFD900] text-4xl">✓</p>
              </div>
              <div className="text-center space-y-2 border-r border-white/10 last:border-0 p-4 bg-white/5 rounded-xl">
                 <p className="text-white/60 uppercase tracking-widest text-sm font-bold">Sedang Diproses</p>
                 <p className="text-white text-3xl font-bold">Sekarang</p>
                 <div className="flex justify-center">
                    <div className="size-6 bg-[#FFD900] rounded-full animate-pulse" />
                 </div>
              </div>
              <div className="text-center space-y-2 border-r border-white/10 last:border-0 p-4 opacity-40">
                 <p className="text-white/60 uppercase tracking-widest text-sm font-bold">Siap</p>
                 <p className="text-white text-3xl font-bold">Berikutnya</p>
                 <p className="text-white text-4xl">—</p>
              </div>
           </div>
        </div>

        {/* Progres Status Section */}
        <div className="w-full max-w-[1220px] bg-white/10 backdrop-blur-xl rounded-[25px] border border-white/20 p-12 mb-12 shadow-2xl">
           <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1 space-y-4">
                 <h3 className="font-roboto font-bold text-[40px] text-white">Progres Status</h3>
                 <p className="text-white/80 text-[20px] font-medium italic">
                    Pesanan Anda sedang kami siapkan dengan sepenuh hati.
                 </p>
              </div>
              
              <div className="flex-[1.5] w-full bg-black/30 rounded-2xl p-8 border border-white/10 flex items-center gap-8">
                 <div className="size-[80px] shrink-0">
                    <img src="/icon_progress.png" alt="Progress" className="size-full object-contain" />
                 </div>
                 <div className="flex-1 space-y-4">
                    <div className="relative w-full h-4 bg-white/20 rounded-full overflow-hidden">
                       <div className="absolute top-0 left-0 h-full w-[65%] bg-gradient-to-r from-[#FFD900] to-yellow-500 rounded-full shadow-[0_0_10px_rgba(255,217,0,0.5)]" />
                    </div>
                    <div className="flex justify-between text-white/60 text-xs font-bold uppercase tracking-wider">
                       <span>Diterima</span>
                       <span className="text-[#FFD900]">Diproses</span>
                       <span>Siap</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Item yang Dipesan Section */}
        <div className="w-full max-w-[1220px] bg-white/10 backdrop-blur-xl rounded-[25px] border border-white/20 p-12 shadow-2xl">
           <h3 className="font-roboto font-bold text-[40px] text-white mb-12">Item yang Dipesan</h3>
           
           <div className="space-y-6">
              {[
                { name: 'Penyetan Ati Ampela', qty: 2, price: 'Rp 24.000' },
                { name: 'Penyetan Ayam', qty: 1, price: 'Rp 15.000' },
                { name: 'Jeruk', qty: 3, price: 'Rp 15.000' }
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-6 border-b border-white/10 last:border-0 group hover:bg-white/5 transition-colors px-4 rounded-lg">
                   <div className="space-y-1">
                      <p className="text-[24px] font-medium text-white">{item.name}</p>
                      <p className="text-[18px] text-white/60 italic font-light">Jumlah {item.qty}</p>
                   </div>
                   <p className="text-[24px] font-bold text-[#FFD900] drop-shadow-md">{item.price}</p>
                </div>
              ))}
           </div>
        </div>
      </main>

      {/* Decorative Wave Bottom */}
      <div className="relative h-[200px] w-full mt-20 opacity-40">
         <img src="/wave_bottom.svg" alt="" className="w-full" />
      </div>
    </div>
  );
};

export default OrderStatusCustomer;
