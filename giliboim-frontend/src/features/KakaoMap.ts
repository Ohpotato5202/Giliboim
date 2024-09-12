import { useDispatch } from "react-redux";
import { Position } from "../type/route";
import { useEffect, useState } from "react";
import { setPosition } from "./positionSlice";

// 사용자의 현재 위치를 반환받을 수 있는 함수 
export const getCurrentPosition = (): Promise<Position> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser."));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          console.log(position.coords);
        },
        (error) => {
          reject(error);
        }
      );
    }
  });
};

// 사용자의 위치 변화를 감지할 수 있는 함수
export const useWatchPosition = (isGuided: boolean) => {
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    let watchId: number | undefined;

    if (isGuided) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          dispatch(setPosition(currentPosition));
        },
        (error) => {
          setError(error.message);
        }
      );
    }

    return () => {
      if (watchId !== undefined) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [isGuided, dispatch]);

  return { error };
};