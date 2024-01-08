const { test, expect } = require("@playwright/test");

// const getToken = async (request, username, password) => {
//   console.log("inside getToken");
//   const baseUrl = "https://demo.spreecommerce.org";
//   let temp = async (request) => {
//     const response = await request.post(`${baseUrl}/spree_oauth/token`, {
//       data: {
//         grant_type: "password",
//         username: username,
//         password: password,
//       },
//     });
//     const responseBody = JSON.parse(await response.text());
//     expect(response.status()).toBe(200);
//     expect(responseBody.access_token).toBeTruthy();
//     const token = responseBody.access_token;
//     console.log(token);
//     return token;
//   };
//   return await temp(request);
// };
// export default getToken;

const getToken = async (un, pw) => {
  console.log("inside gettoken");
  const baseUrl = "https://demo.spreecommerce.org";
  const url = `${baseUrl}/spree_oauth/token`;
const options = {
  method: 'POST',
  headers: {'Content-Type': 'application/json', Accept: 'application/json'},
  body: `{"grant_type":"password","username":"${un}","password":"${pw}"}`
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  return data.access_token;

} catch (error) {
  console.error(error);
}
};

export default getToken;

// async function getToken(request, un, pw) {
//     test.setTimeout(120000)
//     console.log("Getting token....")
//     let token;
//     const response = await request.post("https://demo.spreecommerce.org/spree_oauth/token", {
//         data: {
//             "grant_type": "password",
//             "username": un,
//             "password": pw
//         },
//     })

//     let resptext = await response.text()
//     if (resptext[0] == '<') {
//         console.log(resptext.split('title')[1])
//         return null
//     }
//     const responseBody = JSON.parse(await response.text())
//     expect(response.status()).toBe(200)
//     expect(responseBody.access_token).toBeTruthy()
//     token = responseBody.access_token
//     console.log("Created token -> ", token)
//     return token
// }

// export default getToken;
