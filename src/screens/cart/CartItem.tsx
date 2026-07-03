import { useState } from "react";
import { X, ImageOff } from "lucide-react";
import './CartItem.css';

export default function CartItem() {
    const [imageError, setImageError] = useState(false);

    return (
        <div className="cart-item-container">
            <div className="cart-item-image-wrapper">
                {!imageError ? (
                    <img
                        src="/bbangee.jpeg"
                        alt="빵빵이"
                        className="cart-item-image"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="cart-item-no-image">
                        <ImageOff className="w-5 h-5 text-gray-300 mb-1" />
                        <span>사진 없음</span>
                    </div>
                )}
            </div>

            <div className="cart-item-info-container">
                <div>
                    <h4 className="cart-item-title">
                        랜더스 필드
                    </h4>
                    <div className="cart-item-category">
                        레저스포츠
                    </div>
                </div>

                <button className="cart-item-remove-button">
                    <X />
                </button>
            </div>
        </div >
    );
}
