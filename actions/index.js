import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

const ROOT_URL = `https://91eaf18a.ngrok.io/`;

export const CREATE_USER = 'CREATE_USER';
export const LOGIN_USER = 'LOGIN_USER';

export function createUser(firstName, lastName, username, email, password, confirmPassword) {
  const url = `${ROOT_URL}api/v1/users/create`;
  const request = axios.post(url, {
    first_name: firstName,
    last_name: lastName,
    username: username,
    email: email,
    password: password,
    confirm_password: confirmPassword,
    is_staff: false,
    is_superuser: false
  });

  return {
    type: CREATE_USER,
    payload: request
  };
}

export function loginUser(username, password) {
  const url = `${ROOT_URL}api/v1/login/`;
  const request = axios.post(url, {
    username: username,
    password: password
  });

  return {
    type: LOGIN_USER,
    payload: request
  };
}
