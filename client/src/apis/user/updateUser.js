import customFetch from "../../helpers/customFetch";

const updateUser = async ({updatedUser, userId}) => {
  const url = `http://localhost:8000/api/user/${userId}`;
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
