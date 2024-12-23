import customFetch from "../helpers/customFetch";
import BASE_URL from "../constants/api";

const getRecommendedCourse = async() => {
    try {
        const response = await customFetch(`${BASE_URL}/course/recommended`, {method: "GET"});
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
        return json;  
    } catch (error) {
        console.error(error.message);
    }
} 

export default getRecommendedCourse;
