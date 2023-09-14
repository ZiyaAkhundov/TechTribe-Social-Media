import Cookies from 'js-cookie';

// utils/request.js


export const request = async (url, data = false, method = 'GET') => {
  function getCookie(name) {
    return Cookies.get(name);
}
  const options = {
    method,
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': getCookie('csrf-token'),
    }
  };

  if (data && (method === 'POST' || method === 'PUT')) {
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

export const post = (url, data) => request(url, data, 'POST');
export const put = (url, data) => request(url, data, 'PUT');
export const del = (url, data) => request(url, data, 'DELETE');
export const get = (url) => request(url, false, 'GET');
