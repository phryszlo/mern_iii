import * as usersAPI from "./users-api";

export async function signUp(userData) {

  console.log(`signUp hit ${JSON.stringify(userData)}`)
  // Make the network request
  const response = await usersAPI.signUp(userData);

  const data = response.data;

  // sets all the data: user fields AND token
  localStorage.setItem("data", JSON.stringify(data));

  // Baby step by returning whatever is sent back by the server
  return response;
}

// Create a function to retrieve jwt from local storage
export const getToken = () => {
  // look for token in local storage 'data' object
  // '?' specifies that if the key doesn't exist, it will return null instead of error
  const token = JSON.parse(localStorage.getItem("data"))?.token;
  if (!token) return null;

  // If the function reaches this point of the code that mean a token was found
  const payload = JSON.parse(atob(token.split(".")[1]));

  // Verify that the decoded payload is not expired
  if (payload.exp < Number.parseInt(Date.now() / 1000)) {
    // Meaning the jwt has expired
    localStorage.removeItem("data");

    // return early
    return null;
  }

  // Again if the code gets to this line it means that there was a token and the token was valid
  return token;
};


export async function logIn(userData) {
  console.log(`login (users-service) reached`)
  const token = await usersAPI.logIn(userData);
  console.log(`login unauth users-serv: ${JSON.stringify(token)}`)
  if (token.unauthorized) return 401;
  console.log(`token return users-service: ${JSON.stringify(token)}`)
  localStorage.setItem('token', token);
  return getUser();
}

export const getUser = () => {
  const token = getToken();

  return token ? JSON.parse(localStorage.getItem("data")) : null;
};

export const getUsers = async () => {
  const users = await usersAPI.getUsers()
  return users;
}
