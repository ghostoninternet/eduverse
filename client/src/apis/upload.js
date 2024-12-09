import customFetch from "../helpers/customFetch";

const uploadImage = async(formData) => {
    const url = "http://localhost:8000/api/upload/image";
    try {
        const response = await customFetch(url, {
          method: "POST",
          body: formData,
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        return json;  
    } catch (error) {
        console.error(error.message);
    }
} 

export default uploadImage;
