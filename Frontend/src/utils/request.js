// utils/request.js
export const request = async (url, data = false, method = 'GET') => {
  console.log(url, data,method);
  const options = {
    method,
    credentials: "include",
    headers: {
      'Content-Type': 'application/json'
    }
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

export const post = (url, data) => request(url, data, 'POST');
export const get = (url) => request(url, false, 'GET');
