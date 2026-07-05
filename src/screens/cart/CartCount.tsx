import './CartCount.css';
import { useCartStore } from "../../store/cartStore";

export default function CartCount() {
    const cartItems = useCartStore((state) => state.cartItems);
    return (
        <div className="cart-count-container">
            <div className="cart-count-info">
                <div>
                    <div className="cart-count-label">
                        장바구니에 담긴 활동 수
                    </div>
                </div>
                <div className="cart-count-value">
                    {cartItems.length}개
                </div>
            </div>
        </div >
    );
}
