// utils/request.js

export const request = async (url, data = false,multipart = false, method = 'GET') => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };
  const headers = multipart ? null : defaultHeaders;
  const options = {
    method,
    credentials: "include",
    headers: headers
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

export const post = (url, data, multipart = false) => request(url, data, multipart, 'POST');
export const put = (url, data, multipart = false) => request(url, data, multipart, 'PUT');
export const del = (url, data, multipart = false) => request(url, data, multipart, 'DELETE');
export const get = (url, multipart = false) => request(url, false, multipart, 'GET');

