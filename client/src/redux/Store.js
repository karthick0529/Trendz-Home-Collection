import { configureStore } from "@reduxjs/toolkit";
import { CartSlice } from "./Slices/CartSlice";

// Save to localStorage
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
  } catch (e) {
    console.error("Could not save state", e);
  }
};

// Load from localStorage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) return undefined; 
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Could not load state", e);
    return undefined;
  }
};

// Preload the state from localStorage (if available)
const persistedState = loadFromLocalStorage();

// Redux store creation with persisted state
export const store = configureStore({
  reducer: {
    cart: CartSlice.reducer,
  },
  preloadedState: {
    cart: persistedState,  // Preload cart state from localStorage
  },
});

// Subscribe to store changes and save the cart state to localStorage
store.subscribe(() => {
  saveToLocalStorage(store.getState().cart);  // Save only cart state to localStorage
});
