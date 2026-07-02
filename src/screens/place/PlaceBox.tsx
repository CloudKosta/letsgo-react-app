import { Heart, MapPin, SquarePlus } from "lucide-react";

export default function PlaceBox() {
    return (
        <div className="w-[360px] bg-white border shadow mx-auto my-8 rounded-md">

            <div className="relative h-[220px] ">
                <img
                    src="/bbangee.jpeg"
                    alt="빵빵이"
                    className="w-full h-full object-cover rounded-t-md"
                />

                <button className="absolute top-4 right-4 bg-white p-2 text-gray-400 rounded-md">
                    <Heart className="w-5 h-5 rounded-md " />
                </button>
            </div>

            <div className="p-5">
                <div className="flex items-center text-sm text-gray-400 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    빵빵이
                </div>

                <h3 className="text-2xl font-bold text-blue-600 mb-3">
                    빵빵아 옥찌얌!
                </h3>

                <button className="w-full py-3 font-bold text-sm flex items-center justify-center gap-1.5">
                    <SquarePlus className="w-4 h-4" />
                    담기
                </button>
            </div>
        </div>
    );
}
