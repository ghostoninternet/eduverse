import customFetch from "../helpers/customFetch";
import BASE_URL from "../constants/api";

export const getRecommendedCourse = async() => {
    try {
        const response = await customFetch(`${BASE_URL}/courses/recommended`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        return json;  
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
} 

export const getFreeCourses = async () => {
    try {
        const response = await customFetch(`${BASE_URL}/courses/free`)
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        return json;  
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
}

export const getPopularCourses = async () => {
    try {
        const response = await customFetch(`${BASE_URL}/courses/popular`)
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        return json;  
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
}
