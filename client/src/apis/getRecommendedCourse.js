import customFetch from "../helpers/customFetch";

const getRecommendedCourse = async() => {
    const url = "http://localhost:8000/api/course/recommended";
    try {
        const response = await customFetch(url, {method: "GET"});
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
