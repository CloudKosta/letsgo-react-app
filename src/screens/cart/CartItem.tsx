import { useState } from "react";
import { X, ImageOff } from "lucide-react";
import type { PlaceDTO } from "../place/interface";
import { useCartStore } from "../../store/cartStore";

import './CartItem.css';

interface CartItemProps {
    place: PlaceDTO;
}

export default function CartItem({ place }: CartItemProps) {
    const [imageError, setImageError] = useState(false);
    const removeFromCart = useCartStore((state) => state.removeFromCart);

    const getCategoryLabel = (type: string) => {
        switch (type) {
            case 'LEISURE': return '레저스포츠';
            case 'STAY': return '숙박';
            case 'RESTAURANT': return '음식점';
            default: return type;
        }
    };

    return (
        <div className="cart-item-container">
            <div className="cart-item-image-wrapper">
                {!imageError && place.firstImage ? (
                    <img
                        src={place.firstImage}
                        alt={place.title}
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
                <div className="min-w-0 flex-1">
                    <h4 className="cart-item-title truncate" title={place.title}>
                        {place.title}
                    </h4>
                    <span className={`cart-item-category-badge ${place.placeType.toLowerCase()}`}>
                        {getCategoryLabel(place.placeType)}
                    </span>
                </div>

                <button 
                    className="cart-item-remove-button"
                    onClick={() => removeFromCart(place.placeId)}
                    title="장바구니에서 삭제"
                >
                    <X />
                </button>
            </div>
        </div >
    );
}
