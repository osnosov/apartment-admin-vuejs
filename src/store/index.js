import Vue from 'vue';
import Vuex from 'vuex';

import router from '@/router';
import Auth from '@/services/Auth';
import User from '@/services/User';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('user-token') || '',
    status: '',
    error: null,
    profile: {},
  },
  getters: {
    isAuthenticated: state => !!state.token,
    isProfileLoaded: state => !!state.profile.id,
    getProfile: state => state.profile,
    loading: state => state.status === 'loading',
    error: state => state.status === 'error',
    errMessage: state => state.error,
  },
  actions: {
    AUTH_REQUEST: ({ commit, dispatch }, user) => {
      commit('AUTH_REQUEST');
      Auth.login(user)
        .then(resp => {
          localStorage.setItem('user-token', resp.data.token);
          commit('AUTH_SUCCESS', resp);
          dispatch('USER_REQUEST');
          router.push({ name: 'profile' });
        })
        .catch(err => {
          commit('AUTH_ERROR', err);
          localStorage.removeItem('user-token');
        });
    },
    AUTH_LOGOUT: ({ commit }) => {
      commit('AUTH_LOGOUT');
      localStorage.removeItem('user-token');
      router.push({ name: 'login' });
    },
    USER_REQUEST: ({ commit, dispatch }) => {
      commit('USER_REQUEST');
      User.profile()
        .then(resp => {
          commit('USER_SUCCESS', resp);
        })
        .catch(err => {
          commit('USER_ERROR', err);
          dispatch('AUTH_LOGOUT');
        });
    },
  },
  mutations: {
    AUTH_REQUEST: state => {
      state.status = 'loading';
    },
    AUTH_SUCCESS: (state, resp) => {
      state.status = 'success';
      state.token = resp.data.token;
      state.error = null;
    },
    AUTH_ERROR: (state, resp) => {
      state.status = 'error';
      state.error =
        typeof resp.response === 'undefined'
          ? resp.message
          : resp.response.data.message;
    },
    AUTH_LOGOUT: state => {
      state.token = '';
      state.profile = {};
    },
    AUTH_CLEAR_ERROR: state => {
      state.error = null;
      state.status = '';
    },
    USER_REQUEST: state => {
      state.status = 'loading';
    },
    USER_SUCCESS: (state, resp) => {
      state.status = 'success';
      Vue.set(state, 'profile', resp.data.data);
    },
    USER_ERROR: (state, resp) => {
      state.status = 'error';
      // state.error =
      //   typeof resp.response === 'undefined'
      //     ? resp.message
      //     : resp.response.data.message;
      state.error = resp.message;
    },
  },
});
