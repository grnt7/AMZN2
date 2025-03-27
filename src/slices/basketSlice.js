import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    ///Actions
    addToBasket: (state, action) => {
      const numericPrice = parseFloat(action.payload.price);
      const numericQuantity = parseInt(action.payload.quantity);

      if (isNaN(numericPrice)) {
        console.error("Redux - Invalid price string:", action.payload.price);
        // Handle the error (e.g., set a default price)
        action.payload.price = 0; // Using zero as default
      } else {
        action.payload.price = numericPrice;
      }

      if (isNaN(numericQuantity)) {
        console.error("Redux - Invalid quantity string:", action.payload.quantity);
        action.payload.quantity = 1; // Using 1 as default
      } else {
        action.payload.quantity = numericQuantity;
      }

      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );

      let newBasket = [...state.items];

      if (index >= 0) {
        // The item exists in the basket, so remove it
        newBasket.splice(index, 1);
        state.items = newBasket;
      } else {
        // The item doesn't exist in the basket
        console.warn(
          `Cannot remove product ${action.payload.id} as it doesn't exist in the basket.`
        );
      }
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) =>
  state.basket.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  ); // Calculate total price of all items in the basket

export default basketSlice.reducer;