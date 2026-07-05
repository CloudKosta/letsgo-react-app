import { api } from "./axiosInstance";

export type PlaceTab = "LEISURE" | "STAY" | "RESTAURANT";

export interface PlaceItem {
  placeId: number;
  title: string;
  addr1: string;
  firstImage: string;
  placeType: string;
}

const ENDPOINT: Record<PlaceTab, string> = {
  LEISURE: "/leisureListAjax",
  STAY: "/stayListAjax",
  RESTAURANT: "/restaurantListAjax",
};

export async function searchPlaces(tab: PlaceTab, keyword: string): Promise<PlaceItem[]> {
  const res = await api.get<PlaceItem[]>(ENDPOINT[tab], {
    params: { category: null, keyword: keyword || null },
  });
  return res.data;
}
