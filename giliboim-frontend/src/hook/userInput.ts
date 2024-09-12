// 인풋값을 확인해서 검색하기
import { ChangeEvent, useState } from "react";

const useInput = <T>(init: any) => {
    let [obj, setObj] = useState<T>(init);

    const handleInputChange = (e: ChangeEvent) => {
        let { name, value } = e.target as HTMLInputElement;
        setObj({
            ...obj,
            [name]: value
        }); 
    }

    return [obj, setObj, handleInputChange] as const; 
}


export default useInput;