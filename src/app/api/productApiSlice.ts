import { apiSlice } from "./apiSlice";

import type { ProductType } from "../../types/Index";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<ProductType[], void>({
            query: () => "/skips/by-location?postcode=NR32&area=Lowestoft",
            providesTags: ["Product"],
        }),
    })
});

export const { useGetProductsQuery } = productApiSlice;
