import { createContext, useContext, useState } from "react";
import {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} from "./ordersApi";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    search: "",
    sortBy: "created_at",
    order: "desc",
  });

  const { data, isLoading, isError, error, refetch } = useGetOrdersQuery(query);

  const [createOrder] = useCreateOrderMutation();
  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const addOrder = async (data) => await createOrder(data).unwrap();

  const editOrder = async (id, data) =>
    await updateOrder({ id, ...data }).unwrap();

  const removeOrder = async (id) => await deleteOrder(id).unwrap();

  return (
    <OrderContext.Provider
      value={{
        orders: data?.data?.orders || [],
        meta: data?.data?.meta || {},
        isLoading,
        error: isError ? error : null,

        // CRUD
        addOrder,
        editOrder,
        removeOrder,

        // 🔥 QUERY CONTROL
        query,
        setQuery,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  return useContext(OrderContext);
};
