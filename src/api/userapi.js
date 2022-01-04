import axiosadmin from "./axiosadmin";
const userapi = {
    getAll: (params) => {
        const url = `users`;
        return axiosadmin.get(url, { params });
    },
    getUserByUsername: (username) => {
        const url = `users/${username}`;
        return axiosadmin.get(url);
    },
    updateUserByUsername: (username, data, successCallback, errorCallback) => {
        const url = `users/${username}`;
        return axiosadmin.patch(url, data).then(successCallback).catch(errorCallback);
    },
    addUser: async (data, successCallback, failedCallback) => {
        return await axiosadmin.post('users', data)
            .then(successCallback)
            .catch(failedCallback);
    },
    deleteUser: async (username, successCallback, errorCallback) => {
        return await axiosadmin.delete(`users/${username}`)
            .then(successCallback)
            .catch(errorCallback)
    },
    restoreUser: async (username, successCallback, errorCallback) => {
        return await axiosadmin.post(`/users/restore/${username}`)
            .then(successCallback)
            .catch(errorCallback)
    },
    changeCurrentUserPassword: (data, successCallback, errorCallback) => {
        return axiosadmin.post(`/users/change-password`, data)
            .then(successCallback)
            .catch(errorCallback)
    }
}



export default userapi;
