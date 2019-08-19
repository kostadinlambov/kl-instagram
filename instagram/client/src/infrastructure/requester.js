import Vue from "vue";

export default {
  get: endPoint => {
    return Vue.http
      .get(endPoint)
      .then(res => Promise.resolve(res))
      .catch(error => Promise.reject(error));
  },
  post: (endPoint, data) => {
    return Vue.http
      .post(endPoint, data)
      .then(res => Promise.resolve(res))
      .catch(error => Promise.reject(error));
  },

  put: (endPoint, data) => {
    return Vue.http
      .put(endPoint, data)
      .then(res => Promise.resolve(res))
      .catch(error => Promise.reject(error));
  },

  delete: (endPoint, data) => {
    return Vue.http
      .delete(endPoint, data)
      .then(res => Promise.resolve(res))
      .catch(error => Promise.reject(error));
  }
};
