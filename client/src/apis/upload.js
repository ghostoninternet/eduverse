import customFetch from "../helpers/customFetch";
import BASE_URL from "../constants/api";

export const uploadImage = async(formData) => {
    try {
        const response = await customFetch(`${BASE_URL}/upload/image`, {
          method: "POST",
          body: formData,
        });
        const json = await response.json();
        return json;  
    } catch (error) {
        console.error(error.message);
        throw new Error(error)
    }
}

export const uploadVideo = async (formData) => {
    try {
        const response = await customFetch(`${BASE_URL}/upload/video`, {
            method: "POST",
            body: formData
        })
        const responseData = await response.json()
        return responseData
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}
