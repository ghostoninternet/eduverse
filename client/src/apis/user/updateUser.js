import customFetch from "../../helpers/customFetch";

const BASE_URL = "http://localhost:8000/api/user";
const updateUser = async ({updatedUser, userId}) => {
  const url = `${BASE_URL}/${userId}`;
  try {
    const response = await customFetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json)
    return json;
  } catch (error) {
    console.error(error.message);
  }
};

export default updateUser;
