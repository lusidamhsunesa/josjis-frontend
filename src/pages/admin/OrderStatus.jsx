import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { adminService } from "../../services/adminService";
import { rupiahFormat } from "../../utils/rupiahFormat";

// Figma Assets
const imgVector6 = "/admin/hand_meal.svg"; // Hand meal
const imgVector7 = "/admin/hand_meal.svg"; // Hand meal vector
const imgGridiconsDropdown = "/admin/dropdown.svg";
const imgGridiconsDropdownWhite = "/admin/dropdown.svg";
const imgMaterialSymbolsSearch = "/admin/search.svg";
const imgArrow1 = "/admin/dropdown.svg";

// Alur Pesanan Icons
const imgMingcuteTimeFill = "/admin/status.svg";
const imgFluentTextChangeAccept = "/admin/tick.svg";
const imgSolarHourglassBold = "/admin/status.svg";
const imgWeuiDone2Filled = "/admin/tick.svg";

import { useOrders } from "../../services/adminOrders/orderContext";

const OrderStatus = () => {
  //   const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const { orders, meta, isLoading, editOrder, query, setQuery } = useOrders();
  const { page, search, limit } = query;

  //   useEffect(() => {
  //     setOrders(adminService.getOrders());
  //   }, []);

  const handleStatusChange = (id, newStatus) => {
    const updatedOrders = adminService.updateOrderStatus(id, newStatus);
    //  setOrders(updatedOrders);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "Semua" || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: orders.length,
    menunggu: orders.filter((o) => o.status === "pending").length,
    diproses: orders.filter((o) => o.status === "in_progress").length,
    selesai: orders.filter((o) => o.status === "completed").length,
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-[rgba(210,1,2,0.85)] text-white";
      case "in_progress":
        return "bg-[#ffd900] text-[#743b0e]";
      case "completed":
        return "bg-[#743b0e] text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  return (
    <AdminLayout>
      <div className="p-[37px] pb-[60px]">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-[35px]">
          <div className="w-[409px] min-h-[122px] bg-gradient-to-r from-[#d20102] to-[#770001] rounded-[15px] border border-black p-[24px] pl-[29px] flex flex-col justify-center shadow-lg">
            <h2 className="font-roboto font-extrabold text-[28px] text-white">
              Status Pesanan
            </h2>
            <p className="font-roboto text-[18px] text-white mt-[5px]">
              Pantau dan kelola semua status pesanan
            </p>
          </div>

          <div
            className="relative mt-[15px] cursor-pointer"
            onClick={() => (window.location.href = "/admin/orders")}
          >
            <div className="w-[173px] h-[45px] relative bg-[#ffd900] rounded-[10px] border border-black/20 shadow-sm overflow-hidden flex items-center pl-[11px] gap-2">
              <div className="size-[24px]">
                <img
                  src={imgVector7}
                  alt=""
                  className="size-full object-contain"
                />
              </div>
              <span className="font-roboto font-extrabold text-[18px] text-[#743b0e]">
                Pesanan Baru
              </span>
            </div>
            <div className="absolute -top-[18px] -right-[9px] size-[30px] flex items-center justify-center bg-[#ffd900] rounded-full border border-black/20 shadow-md">
              <span className="relative z-10 font-roboto font-medium text-[18px] text-[#743b0e] pt-[2px]">
                {stats.menunggu}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex gap-[32px] mb-[25px]">
          {[
            { label: "Total Pesanan", val: stats.total },
            { label: "pending", val: stats.menunggu },
            { label: "in_progress", val: stats.diproses },
            { label: "completed", val: stats.selesai },
          ].map((stat, i) => (
            <div
              key={i}
              className="w-[210px] h-[109px] bg-[rgba(217,217,217,0.5)] border border-white rounded-[15px] shadow-lg p-[19px] flex flex-col justify-between backdrop-blur-md"
            >
              <p className="font-roboto font-semibold text-[20px] text-white">
                {stat.label}
              </p>
              <p className="font-roboto font-extrabold text-[25px] text-white leading-none">
                {stat.val}
              </p>
            </div>
          ))}
        </div>

        {/* Table Section */}
        <div className="bg-[rgba(217,217,217,0.5)] border border-white rounded-[15px] shadow-lg p-[20px] md:p-[23px] min-h-[600px] backdrop-blur-md overflow-x-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-[24px] gap-4">
            <h3 className="font-roboto font-bold text-[20px] text-white">
              Daftar Status Pesanan
            </h3>
            <div className="flex flex-col sm:flex-row gap-[12px]">
              <div className="relative w-full sm:w-[141px] h-[35px] sm:h-[30px]">
                <select
                  className="w-full h-full bg-[#9d8a7e] px-[13px] font-roboto font-medium text-[15px] text-white outline-none appearance-none cursor-pointer pr-[30px]"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="Semua">Semua</option>
                  <option value="pending">pending</option>
                  <option value="in_progress">in_progress</option>
                  <option value="completed">completed</option>
                </select>
                <img
                  src={imgGridiconsDropdown}
                  alt=""
                  className="absolute right-2 top-1/2 -translate-y-1/2 size-[24px] pointer-events-none rotate-180"
                />
              </div>
              <div className="w-full sm:w-[241px] h-[35px] sm:h-[30px] bg-[#9d8a7e] rounded-[10px] shadow-[0px_10px_6px_rgba(0,0,0,0.25)] flex items-center px-[13px] justify-between">
                <input
                  type="text"
                  placeholder="Cari ID Order/Customer..."
                  className="bg-transparent border-none outline-none font-roboto font-medium text-[15px] text-white placeholder:text-white/70 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                  src={imgMaterialSymbolsSearch}
                  alt=""
                  className="size-[24px]"
                />
              </div>
            </div>
          </div>

          {/* Table Content */}
          <div className="min-w-[800px]">
            {/* Table Header */}
            <div className="grid grid-cols-[120px_1fr_100px_80px_150px_180px] gap-[10px] bg-[#9d8a7e] h-[38px] items-center px-[26px]">
              <span className="font-roboto font-medium text-[18px] text-black">
                ID Order
              </span>
              <span className="font-roboto font-medium text-[18px] text-black">
                Customer
              </span>
              <span className="font-roboto font-medium text-[18px] text-black text-center">
                No Meja
              </span>
              <span className="font-roboto font-medium text-[18px] text-black text-center">
                Items
              </span>
              <span className="font-roboto font-medium text-[18px] text-black text-center">
                Total Harga
              </span>
              <span className="font-roboto font-medium text-[18px] text-black text-center">
                Status Pesanan
              </span>
            </div>

            {/* Table Body */}
            <div className="mt-1 space-y-1">
              {filteredOrders.map((order, index) => (
                <div
                  key={order.id}
                  className="grid grid-cols-[120px_1fr_100px_80px_150px_180px] gap-[10px] bg-[rgba(157,138,126,0.5)] h-[55px] items-center px-[26px] hover:bg-[rgba(157,138,126,0.7)] transition-colors"
                >
                  <span className="font-roboto font-medium text-[18px] text-black">
                    {order.id.slice(0, 8)}
                  </span>
                  <span
                    className="font-roboto font-medium text-[18px] text-black truncate pr-4"
                    title={order.customer}
                  >
                    {/* {order.customer} */}-
                  </span>
                  <span className="font-roboto font-medium text-[18px] text-black text-center">
                    {order.table_id?.slice(0, 8) ?? "-"}
                  </span>
                  <span className="font-roboto font-medium text-[18px] text-black text-center">
                    {order.order_items?.length ?? 0}
                  </span>
                  <span className="font-roboto font-medium text-[18px] text-black text-center">
                    {rupiahFormat(order.total_amount ?? 0)}
                  </span>
                  <div className="flex justify-center">
                    <div
                      className={`relative ${getStatusStyle(order.status)} h-[30px] rounded-[5px] flex items-center px-[10px] gap-2 min-w-[140px]`}
                    >
                      <select
                        className="w-full bg-transparent border-none outline-none font-roboto font-medium text-[16px] appearance-none cursor-pointer pr-[20px]"
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                      >
                        <option value="pending">pending</option>
                        <option value="in_progress">in_progress</option>
                        <option value="completed">completed</option>
                      </select>
                      <img
                        src={
                          order.status === "in_progress"
                            ? imgGridiconsDropdown
                            : imgGridiconsDropdownWhite
                        }
                        alt=""
                        className="absolute right-2 top-1/2 -translate-y-1/2 size-[20px] pointer-events-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
              {filteredOrders.length === 0 && (
                <div className="h-[100px] flex items-center justify-center text-white/70 font-roboto text-[18px]">
                  Tidak ada data pesanan.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Alur Pesanan Section */}
        <div className="mt-[40px] bg-[rgba(217,217,217,0.5)] border border-white rounded-[10px] shadow-lg p-[25px] backdrop-blur-md">
          <h3 className="font-roboto font-bold text-[20px] text-black mb-[35px]">
            Alur Pesanan
          </h3>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-[10px] py-[10px]">
            {/* Step 1 */}
            <div className="bg-[rgba(217,217,217,0.5)] border border-white rounded-[20px] p-[20px] flex flex-col items-center w-[150px] md:w-[138px] min-h-[151px] transition-transform hover:scale-105">
              <img
                src={imgMingcuteTimeFill}
                alt=""
                className="size-[46px] mb-2"
              />
              <p className="font-inter font-medium text-[18px] text-black text-center leading-tight">
                pending
              </p>
              <p className="font-inter text-[14px] text-black text-center mt-1">
                Order baru masuk
              </p>
            </div>

            {/* Arrow */}
            <img
              src={imgArrow1}
              alt=""
              className="w-[34px] rotate-90 md:rotate-0"
            />

            {/* Step 2 */}
            <div className="bg-[rgba(217,217,217,0.5)] border border-white rounded-[20px] p-[20px] flex flex-col items-center w-[150px] md:w-[138px] min-h-[151px] transition-transform hover:scale-105">
              <img
                src={imgFluentTextChangeAccept}
                alt=""
                className="size-[46px] mb-2"
              />
              <p className="font-inter font-medium text-[18px] text-black text-center leading-tight">
                Diterima
              </p>
              <p className="font-inter text-[14px] text-black text-center mt-1 leading-tight">
                Pesanan diterima
              </p>
            </div>

            {/* Arrow */}
            <img
              src={imgArrow1}
              alt=""
              className="w-[34px] rotate-90 md:rotate-0"
            />

            {/* Step 3 */}
            <div className="bg-[rgba(217,217,217,0.5)] border border-white rounded-[20px] p-[20px] flex flex-col items-center w-[150px] md:w-[138px] min-h-[151px] transition-transform hover:scale-105">
              <img
                src={imgSolarHourglassBold}
                alt=""
                className="size-[46px] mb-2"
              />
              <p className="font-inter font-medium text-[18px] text-black text-center leading-tight">
                in_progress
              </p>
              <p className="font-inter text-[14px] text-black text-center mt-1 leading-tight">
                Sedang disiapkan
              </p>
            </div>

            {/* Arrow */}
            <img
              src={imgArrow1}
              alt=""
              className="w-[34px] rotate-90 md:rotate-0"
            />

            {/* Step 4 */}
            <div className="bg-[rgba(217,217,217,0.5)] border border-white rounded-[20px] p-[20px] flex flex-col items-center w-[150px] md:w-[138px] min-h-[151px] transition-transform hover:scale-105">
              <img
                src={imgWeuiDone2Filled}
                alt=""
                className="size-[46px] mb-2"
              />
              <p className="font-inter font-medium text-[18px] text-black text-center leading-tight">
                completed
              </p>
              <p className="font-inter text-[14px] text-black text-center mt-1 leading-tight">
                Pesanan selesai
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 flex justify-center">
          <button className="bg-gradient-to-r from-[#d20102] to-[#770001] px-[60px] py-[15px] rounded-[15px] font-roboto font-extrabold text-[30px] text-white shadow-xl hover:scale-105 transition-transform">
            Simpan
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default OrderStatus;
