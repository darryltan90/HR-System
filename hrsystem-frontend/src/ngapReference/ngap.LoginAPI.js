
import axios from 'axios';

export const login = (payload) => {
   const formdata = new FormData();
   formdata.append('userEmail', payload.userEmail);
   formdata.append('userPassword', payload.userPassword);

   return axios('/performLogin', {
      method: 'POST',
      data: formdata,
   });
}

export const userIsLoggedIn = async () => {
   return await axios({
      url: '/isLogged',
      method: 'GET',
   });
}

export const logout = async () => {
   return await fetch('/performLogout', {
      method: 'GET'
   });
}