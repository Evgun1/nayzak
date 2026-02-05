import React, { createContext, useContext, useState, ReactNode } from "react";

interface CartItem {
	id: string;
	name: string;
	price: number;
	quantity: number;
}

interface CartContextType {}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
	return <CartContext.Provider value={{}}>{children}</CartContext.Provider>;
}

export function useCart() {
	const context = useContext(CartContext);
	if (!context) throw new Error("useCart must be used within CartProvider");
	return context;
}
