const dbUrl = 'https://localhost:7273';

const getTasks = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/task`, {
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

const getSingleTask = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/task/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createTask = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/task`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateTask = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/task/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response)
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteSingleTask = (id) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/task/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getTasks,
  getSingleTask,
  updateTask,
  createTask,
  deleteSingleTask,
};
