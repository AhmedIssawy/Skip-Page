/**
 * @jest-environment jsdom
 */

// 1 Mock localStorage before loading the module under test
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value;
    }),
    clear: jest.fn(() => { store = {}; }),
    removeItem: jest.fn((key) => { delete store[key]; }),
  };
})();
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
  writable: true,
});

const { default: cartReducer, addProduct, clearCart } = require("./CartSlice");

const sampleProduct = {
  id: 1,
  size: 8,
  hire_period_days: 14,
  transport_cost: 50,
  per_tonne_cost: 25,
  price_before_vat: 100,
  vat: 20,
  postcode: "AB12 3CD",
  area: "North",
  forbidden: false,
  created_at: "2023-01-01T00:00:00Z",
  updated_at: "2023-01-01T00:00:00Z",
  allowed_on_road: true,
  allows_heavy_waste: false,
};

describe("cartSlice localStorage integration", () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  it("addProduct reducer should update state and save to localStorage", () => {
    const initialState = cartReducer(undefined, { type: "@@INIT" });
    expect(initialState).toEqual({});

    const nextState = cartReducer(initialState, addProduct(sampleProduct));

    expect(nextState).toEqual(sampleProduct);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "selectedProduct",
      JSON.stringify(sampleProduct)
    );
  });

  it("clearCart reducer should reset state to empty and save empty to localStorage", () => {
    const populated = cartReducer(undefined, addProduct(sampleProduct));
    expect(populated).toEqual(sampleProduct);

    const cleared = cartReducer(populated, clearCart());
    expect(cleared).toEqual({});

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "selectedProduct",
      JSON.stringify({})
    );
  });
});
