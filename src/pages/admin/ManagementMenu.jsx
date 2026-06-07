import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { adminService } from '../../services/adminService';

const imgVector7 = "/admin/hand_meal.svg";
const imgGridiconsDropdown = "/admin/dropdown.svg";
const imgIcon1 = "/admin/plus.svg";
const imgVector6 = "/admin/edit.svg";
const imgWeuiDeleteOnFilled = "/admin/delete.svg";

const ManagementMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setMenuItems(adminService.getMenu());
    
    // Get pending orders count
    const orders = adminService.getOrders();
    setPendingOrdersCount(orders.filter(o => o.status === 'Menunggu').length);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus menu ini?')) {
      const updatedMenu = adminService.deleteMenuItem(id);
      setMenuItems(updatedMenu);
    }
  };

  const filteredMenu = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua Kategori' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    total: menuItems.length,
    makanan: menuItems.filter(i => i.category === 'Makanan').length,
    minuman: menuItems.filter(i => i.category === 'Minuman').length
  };

  return (
    <AdminLayout>
      <div className="p-[37px]">
         {/* Header Section */}
         <div className="flex justify-between items-start mb-[33px]">
          <div className="relative w-[409px] h-[122px] bg-gradient-to-r from-[#d20102] to-[#770001] rounded-[15px] border border-black p-[22px] pl-[23px]">
            <h2 className="font-roboto font-extrabold text-[28px] text-white">Manajemen Menu</h2>
            <p className="font-roboto text-[18px] text-white mt-[5px]">Kelola semua menu makanan dan minuman</p>
          </div>

          <div className="relative cursor-pointer" onClick={() => navigate('/admin/orders')}>
            <div className="w-[173px] h-[45px] mt-[10px] bg-[#ffd900] rounded-[10px] border border-black/20 shadow-sm overflow-hidden flex items-center pl-[11px] gap-2">
               <div className="size-[24px]">
                  <img alt="" src={imgVector7} className="size-full object-contain" />
               </div>
               <span className="font-roboto font-extrabold text-[18px] text-[#743b0e]">Pesanan Baru</span>
            </div>
            <div className="absolute -top-[10px] -right-[9px] size-[30px] bg-[#ffd900] rounded-full border border-black/20 flex items-center justify-center shadow-md">
               <span className="absolute inset-0 flex items-center justify-center font-roboto font-medium text-[18px] text-[#743b0e]">{pendingOrdersCount}</span>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex gap-[58px] mb-[25px]">
           <div className="w-[273px] h-[120px] bg-[rgba(217,217,217,0.5)] border border-white rounded-[20px] shadow-[0px_0px_42px_0px_rgba(0,0,0,0.25)] flex items-center gap-[21px] p-[24px] pl-[31px]">
              <div className="w-[81px] h-[72px] bg-[rgba(217,217,217,0.5)] border border-white rounded-[15px] flex items-center justify-center">
                 <span className="text-white text-2xl font-bold">#</span>
              </div>
              <div>
                 <p className="font-roboto font-medium text-[18px] text-white">Total Menu</p>
                 <p className="font-roboto font-extrabold text-[20px] text-white">{stats.total}</p>
              </div>
           </div>
           <div className="w-[273px] h-[120px] bg-[rgba(217,217,217,0.5)] border border-white rounded-[20px] shadow-[0px_0px_42px_0px_rgba(0,0,0,0.25)] flex items-center gap-[15px] p-[24px] pl-[34px]">
              <div className="w-[81px] h-[72px] bg-[rgba(217,217,217,0.5)] border border-white rounded-[15px] flex items-center justify-center">
                 <span className="text-white text-2xl font-bold">M</span>
              </div>
              <div>
                 <p className="font-roboto font-medium text-[18px] text-white">Makanan</p>
                 <p className="font-roboto font-extrabold text-[20px] text-white">{stats.makanan}</p>
              </div>
           </div>
           <div className="w-[273px] h-[120px] bg-[rgba(217,217,217,0.5)] border border-white rounded-[20px] shadow-[0px_0px_42px_0px_rgba(0,0,0,0.25)] flex items-center gap-[15px] p-[24px] pl-[42px]">
              <div className="w-[81px] h-[72px] bg-[rgba(217,217,217,0.5)] border border-white rounded-[15px] flex items-center justify-center">
                 <span className="text-white text-2xl font-bold">D</span>
              </div>
              <div>
                 <p className="font-roboto font-medium text-[18px] text-white">Minuman</p>
                 <p className="font-roboto font-extrabold text-[20px] text-white">{stats.minuman}</p>
              </div>
           </div>
        </div>

        {/* Table Section */}
        <div className="bg-[rgba(217,217,217,0.5)] border border-white rounded-[15px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25),0px_10px_12px_0px_rgba(0,0,0,0.5)] p-[23px] min-h-[1355px]">
           <div className="flex items-center justify-between mb-[24px]">
              <h3 className="font-roboto font-bold text-[20px] text-white">Daftar Menu</h3>
              <div className="flex gap-[8px]">
                 <div className="relative w-[215px] h-[30px]">
                    <select 
                      className="w-full h-full bg-[#9d8a7e] rounded-[10px] shadow-[0px_10px_6px_rgba(0,0,0,0.25)] px-[13px] font-roboto font-medium text-[18px] text-white outline-none appearance-none cursor-pointer"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                       <option value="Semua Kategori">Semua Kategori</option>
                       <option value="Makanan">Makanan</option>
                       <option value="Minuman">Minuman</option>
                    </select>
                    <img alt="" className="absolute right-2 top-1 size-[24px] pointer-events-none" src={imgGridiconsDropdown} />
                 </div>
                 <div className="w-[200px] h-[30px] bg-[#9d8a7e] rounded-[10px] shadow-[0px_10px_6px_rgba(0,0,0,0.25)] flex items-center px-[13px]">
                    <input 
                      type="text" 
                      placeholder="Cari Menu..." 
                      className="bg-transparent border-none outline-none font-roboto font-medium text-[15px] text-white placeholder:text-white/70 w-full"
                      value={searchTerm}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                 </div>
                 <button 
                  onClick={() => navigate('/admin/menu/add')}
                  className="w-[114px] h-[30px] bg-[#06b139] rounded-[10px] shadow-[0px_10px_6px_rgba(0,0,0,0.25)] flex items-center justify-center gap-[15px] px-[11px]"
                 >
                    <span className="font-roboto font-extrabold text-[18px] text-white">Tambah</span>
                    <img alt="" className="size-[12px]" src={imgIcon1} />
                 </button>
              </div>
           </div>

           {/* Table Header */}
           <div className="grid grid-cols-[90px_1fr_120px_150px_150px_100px] gap-[40px] bg-[#9d8a7e] h-[54px] items-center px-[26px]">
              <span className="font-roboto font-medium text-[18px]">Gambar</span>
              <span className="font-roboto font-medium text-[18px]">Nama</span>
              <span className="font-roboto font-medium text-[18px]">Kategori</span>
              <span className="font-roboto font-medium text-[18px]">Harga</span>
              <span className="font-roboto font-medium text-[18px]">Stok</span>
              <span className="font-roboto font-medium text-[18px]">Aksi</span>
           </div>

           {/* Table Rows */}
           <div className="space-y-0 mt-0">
              {filteredMenu.map((item) => (
                <div key={item.id} className="grid grid-cols-[90px_1fr_120px_150px_150px_100px] gap-[40px] bg-[#9d8a7e]/50 h-[96px] items-center px-[26px] border-t border-black/10">
                   <div className="w-[90px] h-[80px] relative">
                      <img alt="" className="size-full object-cover" src={item.image} />
                      {item.isBestSeller && (
                         <div className="absolute top-0 left-0 bg-[#ffd900] px-[2px] py-[1px]">
                            <span className="text-[5px] font-roboto font-medium">Best Seller</span>
                         </div>
                      )}
                   </div>
                   <span className="font-roboto font-medium text-[18px] text-black truncate">{item.name}</span>
                   <div className="bg-gradient-to-r from-[#d20102]/65 to-[#760001]/65 px-[10px] py-[4px] rounded-[5px] text-center">
                      <span className="font-roboto font-medium text-[18px] text-white">{item.category}</span>
                   </div>
                   <span className="font-roboto font-medium text-[18px] text-black">Rp {item.price}</span>
                   <div className={`px-[10px] py-[4px] rounded-[5px] text-center ${item.stock === 'Tersedia' ? 'bg-[#06b139]/85' : 'bg-[#d20102]/85'}`}>
                      <span className="font-roboto font-medium text-[18px] text-white">{item.stock}</span>
                   </div>
                   <div className="flex gap-[8px]">
                      <div className="size-[35px] cursor-pointer hover:scale-110 transition-transform" onClick={() => navigate(`/admin/menu/edit/${item.id}`)}>
                         <img alt="Edit" src={imgVector6} className="size-full" />
                      </div>
                      <div className="size-[35px] cursor-pointer hover:scale-110 transition-transform" onClick={() => handleDelete(item.id)}>
                         <img alt="Delete" src={imgWeuiDeleteOnFilled} className="size-full" />
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManagementMenu;
