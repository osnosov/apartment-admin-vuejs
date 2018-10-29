import Api from '@/services/Api';

export default {
  register(user) {
    return Api().post('auth/signup', user);
  },
  login(user) {
    return Api().post('auth/login', user);
  },
};
