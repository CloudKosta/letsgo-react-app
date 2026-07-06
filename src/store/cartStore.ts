import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PlaceDTO } from '../screens/place/interface';
import { useToastStore } from './toastStore';

interface CartState {
    cartItems: PlaceDTO[];
    addToCart: (place: PlaceDTO) => void;
    removeFromCart: (placeId: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            cartItems: [],

            addToCart: (place) =>
                set((state) => {
                    const isExist = state.cartItems.some((item) => item.placeId === place.placeId);
                    if (isExist) {
                        useToastStore.getState().showToast('이미 장바구니에 담겨 있습니다.');
                        return { cartItems: state.cartItems };
                    }

                    if (place.placeType === 'LEISURE') {
                        const hasLeisure = state.cartItems.some((item) => item.placeType === 'LEISURE');
                        if (hasLeisure) {
                            useToastStore.getState().showToast('레저스포츠는 장바구니에 하나만 담을 수 있습니다.');
                            return { cartItems: state.cartItems };
                        }
                    }

                    useToastStore.getState().showToast(`${place.title}을(를) 장바구니에 담았습니다.`);
                    return { cartItems: [...state.cartItems, place] };
                }),


            removeFromCart: (placeId) =>
                set((state) => ({

                    cartItems: state.cartItems.filter((item) => item.placeId !== placeId),
                })),


            clearCart: () => set({ cartItems: [] }),
        }),
        {
            name: 'letsgo-cart-storage',
        }
    )
);
