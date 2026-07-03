export interface PlaceDTO {
    id: number;
    name: string;
    address: string;
    photoUrl: string | null;
    categoryGroup: string;
    categoryMajor?: string;
    categorySub?: string;
    isLiked?: boolean;
}

export interface PlaceSearchCondition {
    keyword?: string;
    categoryGroup?: string;
    categoryMajor?: string;
    categorySub?: string;
}
