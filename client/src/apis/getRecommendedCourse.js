import customFetch from "../helpers/customFetch";

const BASE_URL = "http://localhost:8000/api/course/recommended";
const getRecommendedCourse = async() => {
    try {
        const response = await customFetch(BASE_URL, {method: "GET"});
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
