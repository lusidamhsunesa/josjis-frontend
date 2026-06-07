import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../services/adminProducts/productsApi";
import { ordersApi } from "../services/adminOrders/ordersApi";
// import { ordersApi } from "../services/order/OrdersApi";
// import { paymentsApi } from "../services/payments/PaymentApi";
// import { tablesApi } from "../services/tables/TablesApi";

export const store = configureStore({
  reducer: {
    // RTK Query — reducer & cache untuk todos
    [productsApi.reducerPath]: productsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    // [paymentsApi.reducerPath]: paymentsApi.reducer,
    // [tablesApi.reducerPath]: tablesApi.reducer,
  },

  // WAJIB menambahkan: middleware RTK Query untuk caching, invalidasi, polling
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      ordersApi.middleware,
      // paymentsApi.middleware,
      // tablesApi.middleware,
    ),
});
