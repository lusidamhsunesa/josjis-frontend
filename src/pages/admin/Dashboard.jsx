import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { adminService } from '../../services/adminService';

const imgVector3 = "/admin/hand_meal.svg";
const imgIcSearch = "/admin/search.svg";
const imgIcon = "/admin/plus.svg";
const imgVector200 = "/admin/graph.svg";

const Dashboard = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedTab, setSelectedTab] = useState('Semua');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setMenuItems(adminService.getMenu());
    setOrders(adminService.getOrders());
  }, []);

  const filteredMenu = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    let matchesTab = true;
    if (selectedTab === 'Best Seller') matchesTab = item.isBestSeller;
    else if (selectedTab !== 'Semua') matchesTab = item.category === selectedTab;
    
    return matchesSearch && matchesTab;
  });

  const pendingOrdersCount = orders.filter(o => o.status === 'Menunggu').length;

  return (
    <AdminLayout>
      <div className="p-[37px]">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-[51px]">
          <div className="relative w-[366px] h-[122px] bg-gradient-to-r from-[#d20102] to-[#770001] rounded-[15px] border border-black p-[24px] pl-[29px]">
            <h2 className="font-roboto font-extrabold text-[28px] text-white">Hallo, Admin!</h2>
            <p className="font-roboto text-[18px] text-white mt-[5px]">Ringkasan hari ini</p>
          </div>

          <div className="relative cursor-pointer" onClick={() => window.location.href = '/admin/orders'}>
            <div className="w-[173px] h-[45px] mt-[18px] bg-[#ffd900] rounded-[10px] border border-black/20 shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 flex items-center pl-[11px]">
                 <div className="size-[24px]">
                    <img alt="" src={imgVector3} className="size-full object-contain" />
                 </div>
                 <span className="font-roboto font-extrabold text-[18px] text-[#743b0e] ml-[8px]">Pesanan Baru</span>
              </div>
            </div>
            <div className="absolute -top-[18px] -right-[9px] size-[30px] bg-[#ffd900] rounded-full border border-black/20 flex items-center justify-center shadow-md">
              <span className="font-roboto font-medium text-[18px] text-[#743b0e]">
                {pendingOrdersCount}
              </span>
            </div>
          </div>
        </div>

        {/* Products Container */}
        <div className="relative bg-[rgba(217,217,217,0.5)] border border-white rounded-[15px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25),0px_10px_12px_0px_rgba(0,0,0,0.5)] p-[55px] min-h-[1164px]">
          {/* Tabs and Search */}
          <div className="flex items-center gap-[23px] mb-[40px]">
            {['Semua', 'Makanan', 'Minuman', 'Best Seller'].map(tab => (
              <button 
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`w-[120px] h-[48px] rounded-[30px] shadow-[0px_0px_42px_0px_rgba(0,0,0,0.58)] font-roboto font-medium text-[20px] text-white transition-all ${
                  selectedTab === tab ? 'bg-black/40 border border-white' : 'hover:bg-black/20'
                }`}
              >
                {tab}
              </button>
            ))}
            
            <div className="ml-auto w-[200px] h-[36px] bg-white/70 border border-black/10 rounded-[6px] shadow-[0px_5px_10px_0px_rgba(255,255,255,0.39)] flex items-center px-[8px] gap-[4px]">
              <input 
                type="text" 
                placeholder="Cari Menu.." 
                className="bg-transparent border-none outline-none flex-1 font-roboto text-[14px] text-black/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <img alt="" className="size-[20px]" src={imgIcSearch} />
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-3 gap-x-[40px] gap-y-[40px]">
            {filteredMenu.map((product) => (
              <div key={product.id} className="h-[420px] rounded-[6px] border border-white bg-gradient-to-b from-transparent to-white/50 overflow-hidden relative shadow-[0px_0px_42px_0px_rgba(0,0,0,0.58)]">
                <div className="h-[340px] relative overflow-hidden bg-black/20">
                  <img alt={product.name} className="absolute inset-0 object-cover size-full" src={product.image} />
                  <div className="absolute top-0 left-0 bg-[#ffd900]/94 px-[8px] py-[4px] rounded-br-[6px] rounded-tl-[6px]">
                    <span className="font-roboto font-medium text-[12px] text-black">
                      {product.isBestSeller ? 'Best Seller' : product.category}
                    </span>
                  </div>
                </div>
                <div className="p-[12px] text-black">
                  <h3 className="font-roboto font-bold text-[16px] leading-normal truncate">{product.name}</h3>
                  <p className="font-paytone text-[20px] leading-normal mt-[4px]">Rp {product.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Vector decoration */}
          <div className="absolute bottom-0 left-0 right-0 h-0">
             <img alt="" className="w-full opacity-30" src={imgVector200} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
