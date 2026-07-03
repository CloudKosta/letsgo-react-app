import { useState } from "react";
import { Heart, MapPin, SquarePlus, ImageOff } from "lucide-react";
import type { PlaceDTO } from "./interface";
import "./PlaceBox.css";

interface PlaceBoxProps {
    place: PlaceDTO;
}

export default function PlaceBox({ place }: PlaceBoxProps) {
    const [imageError, setImageError] = useState(false);

    return (
        <div className="place-box-container">

            <div className="place-box-image-wrapper">
                {!imageError && place.firstImage ? (
                    <img
                        src={place.firstImage}
                        alt={place.title}
                        className="place-box-image"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="place-box-no-image">
                        <ImageOff className="w-8 h-8 text-gray-300 mb-1" />
                        <span>사진 없음</span>
                    </div>
                )}

                <button className="place-box-like-button">
                    <Heart className="place-box-like-icon" />
                    <span className="text-white text-xs ml-1">{place.likeCount || 0}</span>
                </button>
            </div>

            <div className="place-box-content">
                <div className="place-box-meta">
                    <MapPin className="place-box-meta-icon" />
                    <span className="truncate">{place.addr1 || "주소 미상"}</span>
                </div>

                <h3 className="place-box-title truncate" title={place.title}>
                    {place.title}
                </h3>

                <button className="place-box-add-button">
                    <SquarePlus className="place-box-add-icon" />
                    담기
                </button>
            </div>
        </div>
    );
}

