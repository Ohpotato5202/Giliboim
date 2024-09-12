// 지도상의 위치를 위한 타입 - 사용자의 위치
export type Position = {
  lat: number;
  lng: number;
};

export const initPosition: Position = {
  lat: 0,
  lng: 0,
};

// 경로 정보를 위한 타입
export type Cource = {
  departure: string;
  destination: string;
};

export const initCource: Cource = {
  departure: "",
  destination: "",
};

// 경로 검색시에 반환될 타입
export type CourceSearch = {
  roadAddr: string;
  jibunAddr: string;
};

// 사용자의 출발지와 목적지, 위치의 정보를 담아주는 타입 - 출발지와 목적지의 좌표
// 위도, 경도가 있는 Position 타입을 재활용했다.
export type CourcePoint = {
  departure: Position;
  destination: Position;
};

export const initCourcePoint: CourcePoint = {
  departure: { lat: 0, lng: 0 },
  destination: { lat: 0, lng: 0 },
};

export const initCourSearchResult: CourceSearch[] = [];

// 폴리라인을 그릴 수 있는 경로 타입

export type Feature = {
  type : "Feature",
  geometry: {
    type: "Point"
    coordinates: number[];
  },
  
  properties: {
    totalDistance: number;
    totalTime: number;
    index: number;
    pointIndex: number;
    lineIndex: number;
    name: string;
    description: string;
    direction: string;
    nearPoiName: string;
    nearPoiX: string;
    nearPoiY: string;
    intersectionName: string;
    facilityType: string;
    facilityName: string;
    turnType: number;
    pointType: string;
    distance: number;
    time: number;
    roadType: number;
    categoryRoadType: number;
  };
};

// 출발지 - 목적지의 보행자 경로의 좌표를 담아주게될 타입

export type GuidePoint = Position[]; 

export const initGuidePoint: GuidePoint = [];

// 출발지 - 목적지의 이동 거리와 시간을 담는 타입

export type GuideInfo = {
  distance: string, // 킬로미터
  time : string  // 분
}

export const initGuideInfo: GuideInfo = { distance: "", time: "" }; 

// 경로를 안내하고 있을때의 상태값

export type isGuided = boolean 
export const initIsGuided : isGuided  = false; 