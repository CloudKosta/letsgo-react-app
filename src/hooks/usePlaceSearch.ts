import { useEffect, useState } from "react";
import { searchPlaces, type PlaceItem, type PlaceTab } from "../api/placeApi";

export function usePlaceSearch() {
  const [tab, setTab] = useState<PlaceTab>("LEISURE");
  const [keyword, setKeyword] = useState("");
  const [places, setPlaces] = useState<PlaceItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function run() {
      setLoading(true);
      try {
        const data = await searchPlaces(tab, keyword);
        if (!ignore) setPlaces(data);
      } catch {
        if (!ignore) setPlaces([]);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    run();

    return () => {
      ignore = true;
    };
  }, [tab, keyword]);

  return { tab, setTab, keyword, setKeyword, places, loading };
}
