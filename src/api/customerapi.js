import axiosadmin from "./axiosadmin";
const customerapi = {
    getAll: (params) => {
        const url = `customers`;
        return axiosadmin.get(url, { params });
    },
    getCustomerByUsername: (username) => {
        const url = `customers/${username}`;
        return axiosadmin.get(url);
    },
    updateCustomerByUsername: (username, data, successCallback, errorCallback) => {
        const url = `customers/${username}`;
        return axiosadmin.patch(url, data).then(successCallback).catch(errorCallback);
    },
    addCustomer: (data, successCallback, failedCallback) => {
        return axiosadmin.post('customers', data)
        .then(successCallback)
        .catch(failedCallback);
    },
    deleteCustomer: async(username, successCallback, errorCallback) => {
        return await axiosadmin.delete(`customers/${username}`)
        .then(successCallback)
        .catch(errorCallback)
    },
}



export default customerapi;
