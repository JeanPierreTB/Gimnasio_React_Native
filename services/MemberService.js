import { BASE_URL } from '../configs/constants';
import axios from 'axios';

export const fetchBodyParts = (memberId = null) => {
  const url = BASE_URL + 'member/body_parts' + (memberId != null ? '?member_id=' + memberId : '');
  // console.log(url);
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

export const fetchExercisesBodyPartsCount = (memberId = null) => {
  const url = BASE_URL + 'member/exercises_body_parts' + (memberId != null ? '?member_id=' + memberId : '');
  // console.log(url);
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

export const fetchExercises = (memberId = null, bodyPartId = null) => {
  const url = BASE_URL + 'member/exercises' + (memberId != null ? '?member_id=' + memberId : '') + (bodyPartId != null ? '&body_part_id=' + bodyPartId : '');
  // console.log(url);
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

export const findExerciseMember = (memberId, exerciseId) => {
  const url = BASE_URL + 'exercise/find?exercise_id=' + exerciseId + '&member_id=' + memberId;
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
