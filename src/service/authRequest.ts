import axios from 'axios';
import { baseURL } from './baseURL';
import getCookie from '../getToken';

const authRequest = () =>
  axios.create({
    baseURL: baseURL,
    headers: {
      Authorization: `Bearer ${getCookie('token')}`,
    },
  });

export default authRequest;
