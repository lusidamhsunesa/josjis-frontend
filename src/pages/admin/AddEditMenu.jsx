import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { adminService } from '../../services/adminService';

const imgRectangle4174 = "/admin/placeholder.png";
const imgIconamoonCloseBold = "/admin/close.svg";
const imgMdiTick = "/admin/tick.svg";
const imgBack = "/admin/back.svg";

const AddEditMenu = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: 'Makanan',
    description: '',
    price: '',
    image: imgRectangle4174,
    isBestSeller: false,
    stock: 'Tersedia'
  });

  useEffect(() => {
    if (id) {
      const item = adminService.getMenuItem(id);
      if (item) {
        setFormData(item);
      }
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    adminService.saveMenuItem(formData);
    alert('Menu berhasil disimpan!');
    navigate('/admin/menu');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-20px)] p-[40px]">
        <form onSubmit={handleSubmit} className="bg-[rgba(217,217,217,0.5)] border border-white rounded-[40px] shadow-2xl w-[1053px] min-h-[1200px] relative overflow-hidden p-[70px] pt-[60px]">
          {/* Close Button */}
          <div 
            className="absolute top-[60px] right-[70px] bg-[#d20102] border border-white rounded-[5px] size-[40px] flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors"
            onClick={() => navigate('/admin/menu')}
          >
            <img alt="Close" src={imgIconamoonCloseBold} className="size-[28px]" />
          </div>

          <h2 className="font-roboto font-semibold text-[32px] text-white text-center mb-[42px] mr-[100px]">
            {id ? 'Edit Menu' : 'Tambah Menu'}
          </h2>

          {/* Form Fields */}
          <div className="space-y-[15px]">
            {/* Nama Menu */}
            <div className="bg-[#f6f1ed] border border-black rounded-[20px] h-[101px] flex items-center px-[34px]">
               <input 
                type="text"
                name="name"
                placeholder="Nama Menu"
                className="bg-transparent border-none outline-none font-roboto text-[18px] text-black w-full"
                value={formData.name}
                onChange={handleChange}
                required
               />
            </div>

            {/* Kategori */}
            <div className="bg-[#f6f1ed] border border-black rounded-[20px] h-[101px] flex items-center px-[34px]">
               <select 
                name="category"
                className="bg-transparent border-none outline-none font-roboto text-[18px] text-black w-full appearance-none cursor-pointer"
                value={formData.category}
                onChange={handleChange}
               >
                 <option value="Makanan">Makanan</option>
                 <option value="Minuman">Minuman</option>
               </select>
            </div>

            {/* Deskripsi */}
            <div className="bg-[#f6f1ed] border border-black rounded-[20px] h-[215px] p-[34px] pt-[26px]">
               <textarea 
                name="description"
                placeholder="Deskripsi Menu"
                className="bg-transparent border-none outline-none font-roboto text-[18px] text-black w-full h-full resize-none leading-[30px] tracking-[0.54px]"
                value={formData.description}
                onChange={handleChange}
               />
            </div>

            {/* Harga */}
            <div className="bg-[#f6f1ed] border border-black rounded-[20px] h-[101px] flex items-center px-[34px]">
               <div className="flex items-center w-full">
                  <span className="font-roboto text-[18px] text-black mr-2">Rp</span>
                  <input 
                    type="text"
                    name="price"
                    placeholder="13.000"
                    className="bg-transparent border-none outline-none font-roboto text-[18px] text-black w-full"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
               </div>
            </div>
          </div>

          {/* Image Upload Area (Simplified for local storage demo) */}
          <div className="mt-[48px] flex items-center gap-[40px]">
            <div className="w-[233px] h-[129px] border border-black rounded-[20px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.25)] overflow-hidden bg-white/20">
               <img alt="Preview" src={formData.image} className="size-full object-cover" />
            </div>
            <div className="flex-1">
               <p className="font-roboto text-[18px] text-white mb-2">URL Gambar</p>
               <input 
                type="text"
                name="image"
                className="w-full bg-[#f6f1ed] border border-black rounded-[10px] h-[40px] px-4 font-roboto text-[14px]"
                value={formData.image}
                onChange={handleChange}
               />
            </div>
          </div>

          {/* Status Options */}
          <div className="mt-[59px] space-y-[20px]">
             {/* Best Seller Checkbox */}
             <div className="flex items-center gap-[23px] cursor-pointer" onClick={() => setFormData(p => ({ ...p, isBestSeller: !p.isBestSeller }))}>
                <div className="bg-[#f6f1ed] border border-black size-[50px] relative">
                   {formData.isBestSeller && <img alt="checked" src={imgMdiTick} className="absolute inset-0 size-full" />}
                </div>
                <span className="font-roboto text-[18px] text-white">Best Seller</span>
             </div>

             {/* Stock Options (Radio-like) */}
             <div className="flex items-center gap-[23px] cursor-pointer" onClick={() => setFormData(p => ({ ...p, stock: 'Tersedia' }))}>
                <div className="bg-[#f6f1ed] border border-black size-[50px] relative">
                   {formData.stock === 'Tersedia' && <img alt="checked" src={imgMdiTick} className="absolute inset-0 size-full" />}
                </div>
                <span className="font-roboto text-[18px] text-white">Stok Tersedia</span>
             </div>

             <div className="flex items-center gap-[23px] cursor-pointer" onClick={() => setFormData(p => ({ ...p, stock: 'Tidak Tersedia' }))}>
                <div className="bg-[#f6f1ed] border border-black size-[50px] relative">
                   {formData.stock === 'Tidak Tersedia' && <img alt="checked" src={imgMdiTick} className="absolute inset-0 size-full" />}
                </div>
                <span className="font-roboto text-[18px] text-white">Stok Tidak Tersedia</span>
             </div>
          </div>

          {/* Save Button */}
          <button 
            type="submit"
            className="mt-[92px] w-full h-[127px] bg-gradient-to-b from-[#02f305] to-[#018d03] rounded-[40px] shadow-[0px_15px_10px_0px_rgba(0,0,0,0.3)] flex items-center justify-center hover:brightness-110 transition-all active:scale-[0.98]"
          >
             <span className="font-roboto font-extrabold text-[30px] text-white">Simpan</span>
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddEditMenu;
