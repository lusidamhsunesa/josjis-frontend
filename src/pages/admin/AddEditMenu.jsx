import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { adminService } from "../../services/adminService";
import { useProducts } from "../../services/adminProducts/productContext";

const imgRectangle4174 = "/admin/placeholder.png";
const imgIconamoonCloseBold = "/admin/close.svg";
const imgMdiTick = "/admin/tick.svg";
const imgBack = "/admin/back.svg";

const uid = () => crypto.randomUUID?.() ?? Math.random().toString(36).slice(2);

const EMPTY_FORM = {
  name: "",
  description: "",
  category: "",
  price: "",
  is_active: true,
  images: [],
};

function ProductFormModal({ product, onClose, onSave }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const [form, setForm] = useState(
    isEdit
      ? {
          name: product.name,
          description: product.description,
          category: product.category ?? "",
          price: product.price,
          is_active: product.is_active,
        }
      : { ...EMPTY_FORM },
  );
  const [previews, setPreviews] = useState(
    isEdit && product?.img_urls ? product.img_urls : [],
  );
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleImage = (e) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    // simpan file asli
    set("images", files);

    // buat preview URLs
    const urls = files.map((file) => URL.createObjectURL(file));

    setPreviews(urls);
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Nama produk wajib diisi";
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0)
      e.price = "Harga harus berupa angka positif";
    return e;
  };

  const submitForm = () => {
    const e = validate();

    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    onSave({
      ...(isEdit
        ? product
        : {
            id: uid(),
            img_urls: [],
            created_at: new Date().toISOString(),
          }),
      ...form,
      images: form.images,
      price: String(Number(form.price)),
      category: form.category.trim() || null,
    });
    console.log("FILES:", form.images);
  };

  return (
    <div onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="flex items-center justify-center min-h-[calc(100vh-20px)] p-[40px]">
        <div
          // onSubmit={submitForm}
          className="bg-[rgba(217,217,217,0.5)] border border-white rounded-[40px] shadow-2xl w-[1053px] min-h-[1200px] relative overflow-hidden p-[70px] pt-[60px]"
        >
          {/* Close Button */}
          <div
            className="absolute top-[60px] right-[70px] bg-[#d20102] border border-white rounded-[5px] size-[40px] flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors"
            onClick={() => navigate("/admin/menu")}
          >
            <img
              alt="Close"
              src={imgIconamoonCloseBold}
              className="size-[28px]"
            />
          </div>

          <h2 className="font-roboto font-semibold text-[32px] text-white text-center mb-[42px] mr-[100px]">
            {isEdit ? "Edit Menu" : "Tambah Menu"}
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
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                required
              />
            </div>

            {/* Kategori */}
            <div className="bg-[#f6f1ed] border border-black rounded-[20px] h-[101px] flex items-center px-[34px]">
              <select
                name="category"
                className="bg-transparent border-none outline-none font-roboto text-[18px] text-black w-full appearance-none cursor-pointer"
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
              >
                <option value="" disabled>
                  -- Pilih Kategori --
                </option>
                <option value="Makanan">Makanan</option>
                <option value="Minuman">Minuman</option>
                <option value="Best Seller">Best Seller</option>
              </select>
            </div>

            {/* Deskripsi */}
            <div className="bg-[#f6f1ed] border border-black rounded-[20px] h-[215px] p-[34px] pt-[26px]">
              <textarea
                name="description"
                placeholder="Deskripsi Menu"
                className="bg-transparent border-none outline-none font-roboto text-[18px] text-black w-full h-full resize-none leading-[30px] tracking-[0.54px]"
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
              />
            </div>

            {/* Harga */}
            <div className="bg-[#f6f1ed] border border-black rounded-[20px] h-[101px] flex items-center px-[34px]">
              <div className="flex items-center w-full">
                <span className="font-roboto text-[18px] text-black mr-2">
                  Rp
                </span>
                <input
                  type="number"
                  name="price"
                  min="0"
                  placeholder="13.000"
                  className="bg-transparent border-none outline-none font-roboto text-[18px] text-black w-full"
                  value={form.price}
                  onChange={(e) => set("price", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Image Upload Area (Simplified for local storage demo) */}
          <div className="mt-[48px] flex items-center gap-[40px]">
            {previews[0] && (
              <div className="w-[233px] h-[129px] border border-black rounded-[20px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.25)] overflow-hidden bg-white/20">
                <img
                  src={previews[0]}
                  alt={`preview`}
                  className="size-full object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <p className="font-roboto text-[18px] text-white mb-2">
                URL Gambar
              </p>
              <input
                type="file"
                accept="image/*"
                name="image"
                className="w-full bg-[#f6f1ed] border border-black rounded-[10px] h-[40px] px-4 font-roboto text-[14px]"
                onChange={handleImage}
              />
            </div>
          </div>

          {/* Status Options */}
          <div className="mt-[59px] space-y-[20px]">
            {/* Best Seller Checkbox */}
            {/* <div
              className="flex items-center gap-[23px] cursor-pointer"
              onClick={() =>
                setFormData((p) => ({ ...p, isBestSeller: !p.isBestSeller }))
              }
            >
              <div className="bg-[#f6f1ed] border border-black size-[50px] relative">
                {formData.isBestSeller && (
                  <img
                    alt="checked"
                    src={imgMdiTick}
                    className="absolute inset-0 size-full"
                  />
                )}
              </div>
              <span className="font-roboto text-[18px] text-white">
                Best Seller
              </span>
            </div> */}

            {/* Stock Options (Radio-like) */}
            <div
              className="flex items-center gap-[23px] cursor-pointer"
              // onClick={() => setFormData((p) => ({ ...p, stock: "Tersedia" }))}
            >
              <div className="bg-[#f6f1ed] border border-black size-[50px] relative">
                {form.is_active === true && (
                  <img
                    alt="checked"
                    src={imgMdiTick}
                    className="absolute inset-0 size-full"
                  />
                )}
              </div>
              <span className="font-roboto text-[18px] text-white">
                Stok Tersedia
              </span>
            </div>

            <div
              className="flex items-center gap-[23px] cursor-pointer"
              // onClick={() =>
              //   setFormData((p) => ({ ...p, stock: "Tidak Tersedia" }))
              // }
            >
              <div className="bg-[#f6f1ed] border border-black size-[50px] relative">
                {form.is_deleted === false && (
                  <img
                    alt="checked"
                    src={imgMdiTick}
                    className="absolute inset-0 size-full"
                  />
                )}
              </div>
              <span className="font-roboto text-[18px] text-white">
                Stok Tidak Tersedia
              </span>
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            onClick={submitForm}
            className="mt-[92px] w-full h-[127px] bg-gradient-to-b from-[#02f305] to-[#018d03] rounded-[40px] shadow-[0px_15px_10px_0px_rgba(0,0,0,0.3)] flex items-center justify-center hover:brightness-110 transition-all active:scale-[0.98]"
          >
            <span className="font-roboto font-extrabold text-[30px] text-white">
              Simpan
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

const AddEditMenu = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const [modalType, setModalType] = useState(null); // "add" | "edit" | "delete"
  const [selected, setSelected] = useState(null);
  const {
    products,
    meta,
    isLoading,
    addProduct,
    editProduct,
    removeProduct,
    query,
    setQuery,
  } = useProducts();
  const product = products.find((p) => p.id === id);

  useEffect(() => {
    setModalType(isEdit ? "edit" : "add");
  }, [isEdit]);

  // ── CRUD handlers ──────────────────────────────────────────────────────
  const handleSave = async (data) => {
    try {
      if (modalType === "add") {
        await addProduct(data);

        alert(`Produk "${data.name}" berhasil ditambahkan`);
      } else {
        await editProduct(data.id, data);

        alert(`Produk "${data.name}" berhasil diperbarui`);
      }

      setModalType(null);
      setSelected(null);
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan");
    }
  };

  const openEdit = (p) => {
    setSelected(p);
    setModalType("edit");
  };

  const closeModal = () => {
    setModalType(null);
    setSelected(null);
  };

  return (
    <AdminLayout>
      {(modalType === "add" || modalType === "edit") && (
        <ProductFormModal
          product={selected || product}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}
    </AdminLayout>
  );
};

export default AddEditMenu;
