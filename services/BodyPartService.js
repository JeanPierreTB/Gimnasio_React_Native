import { BASE_URL } from '../configs/constants';
import axios from 'axios';

export const fetchAll = () => {
  const url = BASE_URL + 'body_part/list';
  console.log(url);
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error.stack);
        reject(error);
      });
  });
}
