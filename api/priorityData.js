const dbUrl = 'https://localhost:7273';

const getPriorities = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/priority`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

export default getPriorities;
