import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const goodsApi = createApi({
  reducerPath: "goodsApi",
  tagTypes: ["Products"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/",
  }),
  endpoints: (build) => ({
    getGoods: build.query({
      query: (limit) => ({
        url: "goods",
        params: {
          _limit: limit || "",
        },
      }),
      providesTags: () => ["Products"],
    }),
    addProduct: build.mutation({
      query: (body) => ({
        url: "goods",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),
    removeProduct: build.mutation({
      query: (id) => ({
        url: `goods/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetGoodsQuery,
  useAddProductMutation,
  useRemoveProductMutation,
} = goodsApi;
