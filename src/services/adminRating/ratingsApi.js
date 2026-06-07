import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Redux Toolkit (RTK) adalah library yang menyederhanakan penggunaan Redux dengan menyediakan utilitas seperti createSlice, configureStore, dan RTK Query.
// RTK Query adalah bagian dari RTK yang memungkinkan pengelolaan data server-side dengan caching otomatis, invalidation, dan hooks siap pakai.
// File ini mendefinisikan API slice untuk mengelola data ratings menggunakan RTK Query.

export const ratingsApi = createApi({
  // reducerPath: Nama unik untuk slice ini di Redux store. Digunakan untuk menyimpan cache dan state RTK Query.
  reducerPath: "ratingsApi",

  baseQuery: fetchBaseQuery({
    // baseUrl: URL dasar untuk semua request API. Diambil dari environment variable VITE_API_URL dan ditambahkan "/api".
    baseUrl: import.meta.env.VITE_API_URL,
    // credentials: "include" memastikan cookie dikirim dengan setiap request, berguna untuk autentikasi berbasis session.
    credentials: "include",
  }),

  // tagTypes: Array dari string yang mendefinisikan tag untuk invalidasi cache. Ketika data berubah, cache dengan tag tertentu dapat dihapus otomatis.
  tagTypes: ["Rating"],

  endpoints: (builder) => ({
    // Endpoint untuk GET /ratings - Menggunakan query untuk operasi read-only. Data akan dicache dan dapat diakses ulang tanpa request baru.
    getRatings: builder.query({
      query: (params = {}) => {
        const cleanParams = Object.fromEntries(
          Object.entries(params).filter(
            ([_, v]) => v !== "" && v !== null && v !== undefined,
          ),
        );

        return {
          url: "/ratings",
          params: cleanParams,
        };
      },
      providesTags: ["Rating"],
    }),

    getRatingById: builder.query({
      query: (id) => `/ratings/${id}`,
      providesTags: (result, error, id) => [{ type: "Rating", id }],
    }),

    // Endpoint untuk POST /ratings - Menggunakan mutation untuk operasi yang mengubah data (create).
    createRating: builder.mutation({
      query: (data) => {
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("price", data.price);
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("is_active", data.is_active ? true : false);

        // upload multiple images
        data.images?.forEach((file) => {
          formData.append("img", file);
        });

        return {
          url: "/ratings",
          method: "POST",
          body: formData,
        };
      },
      // invalidatesTags: Setelah mutation berhasil, hapus cache dengan tag "Rating" agar query getRatings refetch data terbaru.
      invalidatesTags: ["Rating"],
    }),

    // Endpoint untuk PUT /ratings/:id - Mutation untuk update product berdasarkan ID.
    updateRating: builder.mutation({
      query: ({ id, ...data }) => {
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("price", data.price);
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("is_active", data.is_active ? true : false);
        formData.append("is_deleted", data.is_deleted ? true : false);

        // kalau ada gambar baru
        data.images?.forEach((file) => {
          formData.append("img", file);
        });

        return {
          url: `/ratings/${id}`,
          method: "PUT", // atau "PATCH" tergantung backend
          body: formData,
        };
      },
      invalidatesTags: ["Rating"],
    }),

    // Endpoint untuk DELETE /ratings/:id - Mutation untuk menghapus product.
    deleteRating: builder.mutation({
      query: (id) => ({
        url: `/ratings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Rating"], // Invalidasi cache setelah delete.
    }),
  }),
});

// Export hooks yang dihasilkan secara otomatis oleh RTK Query. Hooks ini dapat digunakan di komponen React untuk mengakses data dan melakukan mutations.
// Contoh: useGetRatingsQuery() untuk fetch ratings, useCreateRatingMutation() untuk membuat product baru.
export const {
  useGetRatingsQuery,
  useGetRatingByIdQuery,
  useCreateRatingMutation,
  useUpdateRatingMutation,
  useDeleteRatingMutation,
} = ratingsApi;
