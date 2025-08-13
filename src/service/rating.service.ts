import { axiosInstance } from "./axios";

export const rateVideo = (payload) => {
  try {
    return axiosInstance.post("/rating/rate", payload);
  } catch (err) {
    throw {
      success: false,
      message: err,
    };
  }
};

export const getRating = (videoId) => {
  try {
    return axiosInstance.get(`rating/${videoId}/average`);
  } catch (err) {
    throw {
      success: false,
      message: err,
    };
  }
};
