// global.d.ts

// 전역 객체인 `window.kakao`를 TypeScript에서 인식하도록 선언
declare global {
  interface Window {
      kakao: typeof kakao; // kakao 네임스페이스를 사용
  }
}

// Kakao Maps API의 타입 선언
declare namespace kakao.maps {
  class LatLng {
      constructor(lat: number, lng: number);
      getLat(): number;
      getLng(): number;
  }

  class Map {
      constructor(container: HTMLElement, options: MapOptions);
      setCenter(latlng: LatLng): void;
  }

  class Marker {
      constructor(options: MarkerOptions);
      setMap(map: Map | null): void;
      getPosition(): LatLng;
  }

  class Geocoder {
      coord2Address(x: number, y: number, callback: Function): void;
      addressSearch(address: string, callback: Function): void;
  }

  namespace services {
      class Status {
          static OK: string;
      }

      class Places {
          keywordSearch(query: string, callback: Function): void;
      }
  }

  interface MapOptions {
      center: LatLng;
      level: number;
  }

  interface MarkerOptions {
      position: LatLng;
      map?: Map;
  }
}

export {}; // 파일을 모듈로 인식되도록 설정 (필수)
