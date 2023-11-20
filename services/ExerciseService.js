import { BASE_URL } from '../configs/constants';
import axios from 'axios';

export const fetchAll = (bodyPartId = null) => {
  const url = BASE_URL + 'exercise/list' + (bodyPartId != null ? '?body_part_id=' + bodyPartId : '');
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
