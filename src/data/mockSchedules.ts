export interface Schedule {
    id: number;
    title: string;
    date: string;
    placeCount: number;
    tags: string[];
    isShared: boolean;
}

export const mockSchedules: Schedule[] = [
    {
        id: 1,
        title: '가평주말 나들이',
        date: '2026-07-12',
        placeCount: 9,
        tags: ['가평 패밀리아일랜드', '자라섬'],
        isShared: false,
    },
    {
        id: 2,
        title: '여름 강원도 치킨',
        date: '2026-07-18',
        placeCount: 9,
        tags: ['양양 서피비치', '낙산해변', '삼척 촬영지'],
        isShared: true,
    },
    {
        id: 3,
        title: '부산 먹방 투어',
        date: '2026-08-03',
        placeCount: 6,
        tags: ['해운대', '광안리', '자갈치시장'],
        isShared: false,
    },
    {
        id: 4,
        title: '제주도 힐링 여행',
        date: '2026-08-15',
        placeCount: 12,
        tags: ['성산일출봉', '우도', '협재해변'],
        isShared: true,
    },
];
