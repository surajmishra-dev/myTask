import { API } from "../API.js";

export const signUpApi = (user) => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: user,
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const signInApi = (user) => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
export const signOutApi = () => {
  window.localStorage.removeItem("auth");
  return fetch(`${API}/signout`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
