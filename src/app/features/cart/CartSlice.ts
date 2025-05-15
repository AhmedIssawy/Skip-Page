import type { ProductType } from "@/types/Index";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const LOCAL_STORAGE_KEY = "selectedProduct";

const loadFromLocalStorage = (): ProductType => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : {} as ProductType;
};

const saveToLocalStorage = (data: ProductType) => {
    const formattedData = JSON.stringify(data);
    localStorage.setItem(LOCAL_STORAGE_KEY, formattedData);
};

const initialState: ProductType = loadFromLocalStorage();

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct(_state, action: PayloadAction<ProductType>) {
            const updated = action.payload;
            saveToLocalStorage(updated);
            return updated;
        },
        clearCart() {
            const emptyCart = {} as ProductType;
            saveToLocalStorage(emptyCart);
            return emptyCart;
        },
    },
});

export const { clearCart, addProduct } = cartSlice.actions;
export default cartSlice.reducer;
