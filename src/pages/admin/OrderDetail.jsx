import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

const imgVector4 = "/admin/hand_meal.svg";

const OrderDetail = () => {
  return (
    <AdminLayout>
      <div className="p-[37px]">
         {/* Header Section */}
         <div className="flex justify-between items-start mb-[33px]">
          <div className="relative w-[409px] h-[122px] bg-gradient-to-r from-[#d20102] to-[#770001] rounded-[15px] border border-black p-[22px] pl-[23px]">
            <h2 className="font-roboto font-extrabold text-[28px] text-white">Detail Pesanan</h2>
            <p className="font-roboto text-[18px] text-white mt-[5px]">ID Order: #JOS-18427</p>
          </div>

          <div className="relative cursor-pointer" onClick={() => window.location.href = '/admin/orders'}>
            <div className="w-[173px] h-[45px] mt-[10px] bg-[#ffd900] rounded-[10px] border border-black/20 shadow-sm relative overflow-hidden flex items-center pl-[11px] gap-2">
               <div className="size-[24px]">
                  <img alt="" src={imgVector4} className="size-full object-contain" />
               </div>
               <span className="font-roboto font-extrabold text-[18px] text-[#743b0e]">Pesanan Baru</span>
            </div>
            <div className="absolute -top-[10px] -right-[9px] size-[30px] bg-[#ffd900] rounded-full border border-black/20 flex items-center justify-center shadow-md">
              <span className="font-roboto font-medium text-[18px] text-[#743b0e]">2</span>
            </div>
          </div>
        </div>

        {/* Detail Content */}
        <div className="bg-[rgba(217,217,217,0.5)] border border-white rounded-[15px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25),0px_10px_12px_0px_rgba(0,0,0,0.5)] p-[40px] min-h-[600px]">
           <div className="grid grid-cols-2 gap-[40px]">
              <div className="space-y-[20px]">
                 <h3 className="font-roboto font-bold text-[24px] text-white border-b border-white/20 pb-2">Informasi Customer</h3>
                 <p className="font-roboto text-[18px] text-white/90">Nama: <span className="font-medium">Alex Trie</span></p>
                 <p className="font-roboto text-[18px] text-white/90">No Meja: <span className="font-medium">02</span></p>
                 <p className="font-roboto text-[18px] text-white/90">Waktu: <span className="font-medium">26 Mei 2026, 14:30</span></p>
              </div>
              <div className="space-y-[20px]">
                 <h3 className="font-roboto font-bold text-[24px] text-white border-b border-white/20 pb-2">Status Pembayaran</h3>
                 <p className="font-roboto text-[18px] text-white/90">Metode: <span className="font-medium">QRIS</span></p>
                 <p className="font-roboto text-[18px] text-[#58E85A] font-bold">LUNAS</p>
              </div>
           </div>

           <div className="mt-[40px]">
              <h3 className="font-roboto font-bold text-[24px] text-white border-b border-white/20 pb-2 mb-[20px]">Daftar Menu</h3>
              <div className="space-y-[15px]">
                 {[
                   { name: 'Penyetan Ayam', qty: 1, price: '15.000' },
                   { name: 'Es Jeruk', qty: 1, price: '5.000' },
                   { name: 'Nasi Putih', qty: 1, price: '2.000' },
                 ].map((item, i) => (
                   <div key={i} className="flex justify-between items-center bg-white/10 p-[15px] rounded-[10px]">
                      <div className="flex items-center gap-4">
                         <span className="font-roboto font-bold text-white">{item.qty}x</span>
                         <span className="font-roboto text-white">{item.name}</span>
                      </div>
                      <span className="font-roboto font-medium text-white">Rp {item.price}</span>
                   </div>
                 ))}
              </div>
              <div className="mt-[30px] border-t border-white/20 pt-[20px] flex justify-between items-center">
                 <span className="font-roboto font-extrabold text-[24px] text-white">Total</span>
                 <span className="font-paytone text-[28px] text-white">Rp 22.000</span>
              </div>
           </div>

           <div className="mt-[50px] flex gap-[20px]">
              <button className="flex-1 h-[60px] bg-[#06b139] rounded-[10px] font-roboto font-bold text-white text-[18px]">Terima Pesanan</button>
              <button className="flex-1 h-[60px] bg-[#d20102] rounded-[10px] font-roboto font-bold text-white text-[18px]">Tolak Pesanan</button>
           </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default OrderDetail;
