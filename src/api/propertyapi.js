import axiosadmin from "./axiosadmin";
const propertyapi = {
    getAll: (params) => {
        const url = `properties`;
        return axiosadmin.get(url, { params });
    },
    getPropertyBySlug: (slug) => {
        const url = `properties/${slug}`;
        return axiosadmin.get(url);
    },
    updatePropertyBySlug: (slug, data, successCallback, errorCallback) => {
        const url = `properties/${slug}`;
        return axiosadmin.patch(url, data).then(successCallback).catch(errorCallback);
    },
    addProperty: async (data, successCallback, failedCallback) => {
        console.log(data);
        return await axiosadmin.post('properties', data)
            .then(successCallback)
            .catch(failedCallback);
    },
    deleteProperty: async (slug, successCallback, errorCallback) => {
        return await axiosadmin.delete(`properties/${slug}`)
            .then(successCallback)
            .catch(errorCallback)
    },
    restoreProperty: async (slug, successCallback, errorCallback) => {
        return await axiosadmin.post(`/properties/restore/${slug}`)
            .then(successCallback)
            .catch(errorCallback)
    }
}



export default propertyapi;
