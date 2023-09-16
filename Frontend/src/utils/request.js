// utils/request.js

export const request = async (url, data = false,customHeaders = {}, method = 'GET') => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const headers = customHeaders ? customHeaders : defaultHeaders;
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

export const post = (url, data, customHeaders = {}) => request(url, data, customHeaders, 'POST');
export const put = (url, data, customHeaders = {}) => request(url, data, customHeaders, 'PUT');
export const del = (url, data, customHeaders = {}) => request(url, data, customHeaders, 'DELETE');
export const get = (url, customHeaders = {}) => request(url, false, customHeaders, 'GET');

