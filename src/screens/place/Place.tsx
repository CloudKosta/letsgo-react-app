import { useState, useEffect } from "react";
import axios from "axios";
import SearchInput from "./SearchInput";
import LookupTable from "./LookupTable";
import PlaceBox from "./PlaceBox";
import type { PlaceDTO } from "./interface";
import "./Place.css";

export default function Place() {
    const [places, setPlaces] = useState<PlaceDTO[]>([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:5531/leisureListAjax")
            .then(response => {
                setPlaces(response.data);
            })
            .catch(error => {
                console.error("플레이스 없음:", error);
            });
    }, []);

    return (
        <div className="place-container">
            <SearchInput />
            <LookupTable />


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {places.map(place => (
                    <PlaceBox key={place.placeId} place={place} />
                ))}
            </div>
        </div>
    );
}
