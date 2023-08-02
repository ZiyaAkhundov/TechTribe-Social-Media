// utils/request.js
export const request = async (url, data = false, method = 'GET', withCredentials = false) => {
  console.log(url, data,method,withCredentials);
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: withCredentials ? 'include' : 'omit' // This sets the 'credentials' option for the fetch request
  };

  if (data && method === 'POST') {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(import.meta.env.VITE_API_URL + '/' + url, options);
    const result = await response.json();
    if (response.ok && response.status === 200) {
      return result;
    } else {
      throw result;
    }
  } catch (error) {
    throw error;
  }
};

export const post = (url, data, withCredentials = false) => request(url, data, 'POST', withCredentials);
export const get = (url, withCredentials = false) => request(url, false, 'GET', withCredentials);
