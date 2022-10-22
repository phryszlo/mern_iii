const BASE_URL = "/api/users";

export async function signUp(userData) {
  // Fetch uses an options object as a second arg to make requests
  // other than basic GET requests, include data, headers, etc.
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // Fetch requires data payloads to be stringified
    // and assigned to a body property on the options object
    body: JSON.stringify(userData),
  });

  // Check if request was successful
  if (res.ok) {
    // res.json() will resolve to the JWT
    return res.json();
  } else {
    throw new Error("Invalid Sign Up");
  }
}

export async function getUsers() {
  try {
      const res = await fetch(BASE_URL, {
        method: 'GET',
        headers: {
          'Content-Type' : 'application/json'
        }
      });
    
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(`res not OK. getUsers() failed in users-api (client)`);
      }
  } catch (error) {
    console.log(`getUsers() failed in users-api: ${error}`);
  }
}


export async function logIn() {
  const res = await fetch(`${BASE_URL}/login`, {

  })
}


async function sendRequest(url, method = 'GET', payload = null) {
  // Fetch accepts an options object as the 2nd argument
  // used to include a data payload, set headers, etc.
  const options = { method };
  if (payload) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(payload);
  }
  const token = getToken();
  if (token) {
    // Ensure the headers object exists
    options.headers = options.headers || {};
    // Add token to an Authorization header
    // Prefacing with 'Bearer' is recommended in the HTTP specification
    options.headers.Authorization = `Bearer ${token}`;
  }
  
  const res = await fetch(url, options);
  // res.ok will be false if the status code set to 4xx in the controller action
  if (res.ok) return res.json()
  else if (res.status === 401) {
    return res.json({ unauthorized: true });
  }
  throw new Error('Bad Request');
}


// import { getToken } from './users-service';


// const BASE_URL = "/api/users";

// export function checkToken() {
//   return sendRequest(`${BASE_URL}/check-token`);
// }
// export async function signUp(userData) {
//   return sendRequest(BASE_URL, 'POST', userData);
// }

// export async function logIn(credentials) {
//   return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
// }

// async function sendRequest(url, method = 'GET', payload = null) {
//   // Fetch accepts an options object as the 2nd argument
//   // used to include a data payload, set headers, etc.
// try {
  
//     console.log(`sendRequest: ${url},${JSON.stringify(payload)}`)
//     const options = { method };
//     if (payload) {
//       options.headers = { 'Content-Type': 'application/json' };
//       options.body = JSON.stringify(payload);
//     }
//     const token = getToken();
//     if (token) {
//       console.log(token)
//       // Ensure the headers object exists
//       options.headers = options.headers || {};
//       // Add token to an Authorization header
//       // Prefacing with 'Bearer' is recommended in the HTTP specification
//       options.headers.Authorization = `Bearer ${token}`;
//     }
//     else { console.log ('no token in local storage')}
    
//     const res = await fetch(url, options);
//     console.log(`res=${res}`);
//     // res.ok will be false if the status code set to 4xx in the controller action
//     if (res.ok) return res.json()
//     else if (res.status === 401) {
//       return res.json({ unauthorized: true });
//     }
//     throw new Error('Bad Request');
// } catch (error) {
//   console.log(`sendRequest error: ${error}`)
// }
// }



// // export async function signUp(userData) {

// //   console.log(`api signUp hit`);
// //   // Fetch uses an options object as a second arg to make requests
// //   // other than basic GET requests, include data, headers, etc.
// //   const res = await fetch(BASE_URL, {
// //     method: "POST",
// //     headers: { "Content-Type": "application/json" },
// //     // Fetch requires data payloads to be stringified
// //     // and assigned to a body property on the options object
// //     body: JSON.stringify(userData),
// //   });

// //   console.log(`got past fetch`)

// //   // Check if request was successful
// //   if (res.ok) {
// //     // res.json() will resolve to the JWT
// //     return res.json();
// //   } else {
// //     throw new Error("Invalid Sign Up");
// //   }
// // }
