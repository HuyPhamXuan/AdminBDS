import axiosadmin from "./axiosadmin";
const companyapi = {
    getAll: (params) => {
        const url = `companies`;
        return axiosadmin.get(url, { params });
    },
    getCompanyByUsername: (username) => {
        const url = `companies/${username}`;
        return axiosadmin.get(url);
    },
    updateCompanyByUsername: (username, data, successCallback, errorCallback) => {
        const url = `companies/${username}`;
        return axiosadmin.patch(url, data).then(successCallback).catch(errorCallback);
    },
    addCompany: async (data, successCallback, failedCallback) => {
        return await axiosadmin.post('companies', data)
            .then(successCallback)
            .catch(failedCallback);
    },
    deleteCompany: async (username, successCallback, errorCallback) => {
        return await axiosadmin.delete(`companies/${username}`)
            .then(successCallback)
            .catch(errorCallback)
    }
}



export default companyapi;
