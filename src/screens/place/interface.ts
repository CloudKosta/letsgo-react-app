export interface PlaceDTO {
    placeId: number;
    title: string;
    firstImage: string;
    addr1: string;
    addr2?: string;
    mapx: string;
    mapy: string;
    likeCount: number;
    placeType: string;
}

export type TabType = 'LEISURE' | 'STAY' | 'RESTAURANT';

export interface LookupTableProps {
    currentTab: TabType;
    setCurrentTab: (tab: TabType) => void;
    selectedMajor: string;
    setSelectedMajor: (major: string) => void;
    selectedSub: string;
    setSelectedSub: (sub: string) => void;

}

export interface SearchInputProps {
    keyword: string
    setKeyword: (keyword: string) => void;
}