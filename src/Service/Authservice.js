import Helpers from '../Utils/Helpers';

// Initialize the Helpers module
const apiHelper = Helpers();

async function login(data) {
  const endpoint = 'login';
  return apiHelper?.post(endpoint, data);
}

export default {
  login,
};
