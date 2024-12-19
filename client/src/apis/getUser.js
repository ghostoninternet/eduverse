import customFetch from "../helpers/customFetch";

const getUser = async() => {
    const url = "http://localhost:8000/api/user";
    try {
        const response = await customFetch(url, {method: "GET"});
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
