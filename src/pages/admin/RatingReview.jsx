import React from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { useRatings } from "../../services/adminRating/ratingsContext";
import { useGetOrdersQuery } from "../../services/adminOrders/ordersApi";

const imgVector = "/admin/reviews.svg"; // Star icon
const imgVector3 = "/admin/hand_meal.svg";

const RatingReview = () => {
  const { ratings, isLoading } = useRatings();
  const { data: ordersData } = useGetOrdersQuery({ status: "pending" });
  
  const pendingOrdersCount = ordersData?.data?.orders?.length || 0;

  const averageRating = ratings && ratings.length > 0
    ? (ratings.reduce((acc, r) => acc + Number(r.rating), 0) / ratings.length).toFixed(1)
    : "0.0";

  return (
    <AdminLayout>
      <div className="p-[37px]">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-[33px]">
          <div className="relative w-[409px] h-[122px] bg-gradient-to-r from-[#d20102] to-[#770001] rounded-[15px] border border-black p-[22px] pl-[23px]">
            <h2 className="font-roboto font-extrabold text-[28px] text-white">
              Rating & Review
            </h2>
            <p className="font-roboto text-[18px] text-white mt-[5px]">
              Bintang rata-rata: {averageRating} / 5.0
            </p>
          </div>

          <div
            className="relative cursor-pointer"
            onClick={() => (window.location.href = "/admin/orders")}
          >
            <div className="w-[173px] h-[45px] mt-[18px] bg-[#ffd900] rounded-[10px] border border-black/20 shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 flex items-center pl-[11px]">
                <div className="size-[24px]">
                  <img
                    alt=""
                    src={imgVector3}
                    className="size-full object-contain"
                  />
                </div>
                <span className="font-roboto font-extrabold text-[18px] text-[#743b0e] ml-[8px]">
                  Pesanan Baru
                </span>
              </div>
            </div>
            <div className="absolute -top-[18px] -right-[9px] size-[30px] bg-[#ffd900] rounded-full border border-black/20 flex items-center justify-center shadow-md">
              <span className="font-roboto font-medium text-[18px] text-[#743b0e]">
                {pendingOrdersCount}
              </span>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="bg-[rgba(217,217,217,0.5)] border border-white rounded-[15px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25),0px_10px_12px_0px_rgba(0,0,0,0.5)] p-[30px] min-h-[800px] space-y-[20px]">
          {isLoading ? (
            <div className="h-[200px] flex items-center justify-center text-white font-roboto text-[18px]">
              Memuat ulasan...
            </div>
          ) : ratings && ratings.length > 0 ? (
            ratings.map((review, i) => (
              <div
                key={review.id || i}
                className="bg-white/80 border border-black/10 rounded-[10px] p-[20px] shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center mb-[10px]">
                  <h4 className="font-roboto font-bold text-[18px] text-black">
                    {review?.name || review?.orders?.customer_name || "Pelanggan"}
                  </h4>
                  <div className="flex">
                    {[...Array(5)].map((_, star) => (
                      <div
                        key={star}
                        className="size-[20px] relative flex items-center justify-center"
                      >
                        <img
                          alt="star"
                          src={imgVector}
                          className={`size-full object-contain ${star < review.rating ? "opacity-100" : "opacity-20"}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <p className="font-roboto text-[16px] text-black/80 italic">
                  "{review.comment}"
                </p>
              </div>
            ))
          ) : (
            <div className="h-[200px] flex items-center justify-center text-white/70 font-roboto text-[18px]">
              Belum ada ulasan dari pelanggan.
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default RatingReview;
