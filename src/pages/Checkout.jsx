import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import Navbar from "../components/Navbar";

const Checkout = () => {
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const orderId = localStorage.getItem('orderId');

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      if (!orderId) {
        alert("Order tidak ditemukan. Silakan ulang dari cart.");
        navigate('/cart');
        return;
      }

      const res = await api.get(`/orders/${orderId}`);

      if (res.data?.data) {
      setOrder(res.data.data);
      }

      console.log("ORDER DETAIL:", res.data);

    } catch (err) {
      console.error(err);
      alert("Gagal mengambil data order");
    } finally {
      setLoading(false);
    }
  };

  const handleQty = async (itemId, type) => {
    // NOTE: ini optional (kalau backend support update order)
    // kalau belum ada endpoint update → bisa dihapus dulu
    console.log(itemId, type);
  };

   const handleNonTunai = async () => {
   try {
      const orderId = localStorage.getItem("orderId");

      if (!orderId) {
         alert("Order ID tidak ditemukan");
         return;
      }

      const res = await api.post("/payments", {
         orderId: orderId,
         method: "midtrans"
      });

      const data = res.data;

      console.log("PAYMENT RESPONSE:", data);

      const redirectUrl = data?.data?.redirect_url;

      if (!redirectUrl) {
         throw new Error("Redirect URL tidak ditemukan");
      }

      // langsung ke Midtrans
      window.location.href = redirectUrl;

   } catch (error) {
      console.error("PAYMENT ERROR:", error.response?.data || error.message);

      alert(
         error.response?.data?.message ||
         "Gagal membuat pembayaran"
      );
   }
   };


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }



  return (
    <div
      className="min-h-screen relative overflow-hidden font-roboto pt-[80px]"
      style={{
        backgroundImage:
          "linear-gradient(56.7deg, rgb(210, 1, 2) 0%, rgb(119, 0, 1) 39.2%)",
      }}
    >
      {/* HERO */}
      <div className="relative h-[480px] w-full flex items-center justify-center text-center">
        <div className="absolute inset-0">
          <img
            src="/checkout_bg_full.png"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative text-white">
          <h1 className="font-paytone text-5xl">PEMBAYARAN</h1>
          <p className="text-xl mt-2">Cek ulang pesanan kamu</p>
        </div>
      </div>

      {/* TOP BAR */}
      <Navbar showBack={true} title="Checkout" />

      {/* CONTENT */}
      <main className="relative z-10 flex justify-center pb-20 mt-10">
        <div className="w-full max-w-[900px] bg-white/70 rounded-2xl p-8">

          {/* ORDER ITEMS */}
          <div className="space-y-4">
            {order?.order_items?.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-3"
              >
                <div>
                  <p className="font-bold text-black">
                    {item.products?.name}
                  </p>
                  <p className="text-sm text-black/60">
                    Rp {Number(item.price).toLocaleString('id-ID')}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQty(item.id, 'minus')}
                    className="w-8 h-8 bg-gray-200 rounded"
                  >
                    -
                  </button>

                  <span>{item.qty}</span>

                  <button
                    onClick={() => handleQty(item.id, 'plus')}
                    className="w-8 h-8 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* TOTAL */}
          <div className="mt-6 flex justify-between font-bold text-xl">
            <span>Total</span>
            <span>
              Rp {Number(order?.total_amount || 0).toLocaleString('id-ID')}
            </span>
          </div>

          {/* FORM */}
          <div className="mt-8 space-y-4">
            <input
              placeholder="Nama Pemesan"
              className="w-full p-2 border rounded"
            />

            <input
              placeholder="Nomor Meja"
              className="w-full p-2 border rounded"
            />
          </div>

          {/* PAYMENT BUTTON */}
          <div className="flex justify-center gap-6 mt-10">

            {/* QRIS / NON TUNAI */}
            <button
              onClick={handleNonTunai}
              className="px-10 py-3 bg-[#88391F] text-yellow-300 rounded"
            >
              NON TUNAI
            </button>

            {/* CASH */}
            <button
              onClick={() => navigate('/payment/cash')}
              className="px-10 py-3 bg-yellow-400 text-black rounded"
            >
              TUNAI
            </button>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;