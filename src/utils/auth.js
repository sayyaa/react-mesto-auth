export const BASE_URL = "https://auth.nomoreparties.co";

  export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password }),
    }).then((response) => {
      console.log(response);
      try {
        if (response.status === 201 || response.status === 200){
          return response.json();
        }
      } catch(err) {
          return(err)
      }
    }).then(res => res).catch(err => console.log('Ошибочка вышла:', err));
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      console.log(response);
      return response.json()})
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        return data;
      } else {
        return
      }
    })
    .catch((err) => console.log(err));
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
    }
  }).then(res => res.json()).then(data => data)
}
