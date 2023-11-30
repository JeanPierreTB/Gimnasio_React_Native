import { BASE_URL } from '../configs/constants';
import axios from 'axios';

export const upload = (uriFile) => {
  const url = BASE_URL + 'file/upload';
  console.log(url);
  const data = new FormData();
  data.append('file', {
    uri: uriFile,
    type: 'image/jpeg', // Ajusta el tipo de archivo según tu imagen
    name: 'photo.jpg', // Nombre del archivo que se enviará al servidor
  });
  data.append('extra', 'XD');
  const headers = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  return new Promise((resolve, reject) => {
    axios.post(url, data, headers)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.error(error.stack);
        reject(error);
      });
  });
}
