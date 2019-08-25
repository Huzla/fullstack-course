import axios from "axios";
const baseUrl = "/login";

const login = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials);


    window.localStorage.setItem(
      "loggedBlogAppUser",
      JSON.stringify(response.data)
    );

    return response.data;
  }
  catch (err) {
    throw Error("Incorrect credentials");
  }
};

const logout = () => {
  window.localStorage.removeItem("loggedBlogAppUser");
};

export default { login, logout };
