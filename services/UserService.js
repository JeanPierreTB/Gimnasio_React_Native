import { BASE_URL } from '../configs/constants';
import axios from 'axios';

export const resetPassword = (dni, email) => {
  const url = BASE_URL + 'user/reset_password';
  console.log(url);
  const data = {dni: dni, email: email};
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error.stack);
        reject(error);
      });
  });
}
