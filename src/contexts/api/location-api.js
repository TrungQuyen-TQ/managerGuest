import { useEffect, useState } from "react";
import LotusClient from "./lotus-api";

//Để sử dụng lúc chọn rồi add
const useFetchLocation = (cityId, districtId) => {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  //fetch City
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await LotusClient.get("/Location/getCities");
        setCities(response.data.map((city) => ({ value: city.id, label: city.name })));
      } catch (error) {
        setCities([]);
      }
    };
    fetchCities();
  }, []);

  //fetch district
  useEffect(() => {
    const fetchDistricts = async (cityId) => {
      try {
        const response = await LotusClient.get(
          `/Location/getDistricts?cityId=${cityId}`
        );
        setDistricts(
          response.data.map((district) => ({
            cityId: district.cityId,
            value: district.id,
            label: district.name,
          }))
        );
      } catch (error) {
        setDistricts([]);
      }
    };
    if (cityId) {
      fetchDistricts(cityId);
    }
  }, [cityId]);

  //fetch ward
  useEffect(() => {
    const fetchWards = async (districtId) => {
      try {
        const response = await LotusClient.get(
          `/Location/getWards?districtId=${districtId}`
        );
        setWards(
          response.data.map((ward) => ({
            districtId: ward.districtId,
            value: ward.id,
            label: ward.name,
          }))
        );
      } catch (error) {
        setWards([]);
      }
    };
    if (districtId) {
      fetchWards(districtId);
    }
  }, [districtId]);

  return {
    cities,
    districts,
    wards,
  };
};

//Để list ra table
const fetchCities = async () => {
  try {
    const response = await LotusClient.get("/Location/getCities");
    return response.data.map((city) => ({ value: city.id, label: city.name }));
  } catch (error) {
    return [];
  }
};
const fetchDistricts = async (cityId) => {
  try {
    const response = await LotusClient.get(`/Location/getDistricts?cityId=${cityId}`);
    return response.data.map((district) => ({
      cityId: district.cityId,
      value: district.id,
      label: district.name,
    }));
  } catch (error) {
    return [];
  }
};
const fetchWards = async (districtId) => {
  try {
    const response = await LotusClient.get(`/Location/getWards?districtId=${districtId}`);
    return response.data.map((ward) => ({
      districtId: ward.districtId,
      value: ward.id,
      label: ward.name,
    }));
  } catch (error) {
    return [];
  }
};

//Để sử dụng lúc chọn rồi add
export default useFetchLocation;

//Để list ra table
export { fetchCities, fetchDistricts, fetchWards };
