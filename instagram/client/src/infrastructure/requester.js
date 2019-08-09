import Vue from 'vue';

export default{
    get: (endPoint) =>  {
        // console.log('endPoint: ', endPoint);
        return Vue.http.get(endPoint)
          .then((res) => Promise.resolve(res))
          .catch((error) => Promise.reject(error));
    
    },
    post: (endPoint, data) =>  {
        // console.log('endPoint: ', endPoint);
        // console.log('data: ', data);
        return Vue.http.post(endPoint, data)
          .then((res) => Promise.resolve(res))
          .catch((error) => Promise.reject(error));
    },
}