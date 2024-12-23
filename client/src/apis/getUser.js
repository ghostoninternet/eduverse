import customFetch from "../helpers/customFetch";

const BASE_URL = "http://localhost:8000/api/user";
const getUser = async() => {
    try {
        const response = await customFetch(BASE_URL, {method: "GET"});
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData;  
    } catch (error) {
        console.error(error.message);
    }
} 

export default getUser;
