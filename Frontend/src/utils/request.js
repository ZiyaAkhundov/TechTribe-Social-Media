// utils/request.js
export const request = async (url, data = false, method = 'GET', token) => {
  const options = {
    method,
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': token,
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

export const post = (url, data, token) => request(url, data, 'POST', token);
export const put = (url, data, token) => request(url, data, 'PUT', token);
export const del = (url, data, token) => request(url, data, 'DELETE', token);
export const get = (url) => request(url, false, 'GET');
