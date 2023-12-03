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

export const login=(user,password)=>{
  const url=BASE_URL + 'user/validate';
  console.log(url);
  const data={user:user,password:password}
  console.log("Datos para el usuario:",data);
  return new Promise((resolve,reject)=>{
    axios.post(url,data)
      .then(response=>{
        resolve(response.data);
      })
      .catch(error=>{
        console.error(error.stack);
        reject(error);
      })
  })
}
