import customFetch from "../helpers/customFetch";
import BASE_URL from "../constants/api";

const getUser = async() => {
    try {
        const response = await customFetch(`${BASE_URL}/user`, {method: "GET"});
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
