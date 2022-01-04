import axiosadmin from "./axiosadmin";
const propertysalemethodsapi = {
    getAll: (successCallback, failedCallback) => {
        const url = `property-sale-methods`;
        return axiosadmin.get(url).then(successCallback).catch(failedCallback);
    }
}



export default propertysalemethodsapi;