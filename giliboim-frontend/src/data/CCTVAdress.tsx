import data from "./safeFacility.json";

interface item {
  point_wkt: string;
  faci_id: string;
  sgg_name: string;
  asg_id: string;
  remark: string;
  asg_nm: string;
  instl_cnt: string;
  image: string;
  faci_code: string;
  deloc: string;
  inst_nm: string;
  emd_code: string;
  emd_nm: string;
  asg_date: string;
  refdate: string;
  chck_date: string | null;
  sgg_code: string;
  inst_telno: string;
}

interface SafeFacilityData {
  DATA: item[];
}

const getCctvAdress = (): string => {
  const filteredUsers = (data as SafeFacilityData).DATA.filter(
    (item: item) => item.faci_code === "302"
  ).map((item: item) => {
    const pointWkt = item.point_wkt;
    if (pointWkt.includes("POINT") && pointWkt.includes(")")) {
      // "POINT(x y)" 형식일 경우
      const coordinates = pointWkt
        .replace("POINT(", "")
        .replace("POINT (", "")
        .replace(")", "")
        .split(" ");
      const x = parseFloat(coordinates[0]).toFixed(7);
      const y = parseFloat(coordinates[1]).toFixed(7);
      return {
        point_wkt: `${x} ${y}`,
      };
    }
    return { point_wkt: pointWkt };
  });

  return JSON.stringify(filteredUsers, null, 2);
};

export default getCctvAdress;
