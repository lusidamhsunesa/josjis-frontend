import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";

const imgVector = "/admin/reviews.svg"; // Star icon
const imgVector3 = "/admin/hand_meal.svg";

import { useRatings } from "../../services/adminRating/ratingsContext";

const INITIAL_REVIEWS = [
  {
    name: "Alex Trie",
    rating: 5,
    comment:
      "Penyetan ayamnya enak banget, sambalnya pedas mantap! Service juga cepat.",
  },
  {
    name: "Budi Santoso",
    rating: 4,
    comment:
      "Lele gorengnya garing, nasi hangat. Cuma sayang tadi nunggunya agak lama pas ramai.",
  },
  {
    name: "Siti Aminah",
    rating: 5,
    comment: "Langganan terus di sini, harga terjangkau rasa bintang lima!",
  },
  {
    name: "Dedi Kurniawan",
    rating: 3,
    comment: "Rasa oke, tapi es tehnya kurang manis tadi.",
  },
];

const RatingReview = () => {
  const [reviews, setReviews] = useState([]);
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
  const { ratings, meta, isLoading, query, setQuery } = useRatings();
  const { page, search, limit } = query;

  useEffect(() => {
    const stored = localStorage.getItem("admin_reviews");
    if (stored) {
      setReviews(JSON.parse(stored));
    } else {
      localStorage.setItem("admin_reviews", JSON.stringify(INITIAL_REVIEWS));
      setReviews(INITIAL_REVIEWS);
    }

    // Get pending orders count
    const orders = JSON.parse(localStorage.getItem("admin_orders") || "[]");
    setPendingOrdersCount(orders.filter((o) => o.status === "Menunggu").length);
  }, []);

  const averageRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
  ).toFixed(1);

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
        <div
  key={i}
  className="
    bg-white/5
    backdrop-blur-md
    border
    border-white/10
    rounded-[15px]
    p-[24px]
    hover:bg-white/10
    hover:scale-[1.01]
    transition-all
    duration-300
    shadow-[0_10px_20px_rgba(0,0,0,0.15)]
  "
>
          {ratings?.map((review, i) => (
            <div
              key={i}
              className="bg-white/80 border border-black/10 rounded-[10px] p-[20px] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center mb-[10px]">
                <h4 className="font-roboto font-bold text-[18px] text-black">
                  {review?.name ?? "anonymous"}
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
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default RatingReview;