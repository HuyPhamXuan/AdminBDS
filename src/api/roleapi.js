import axiosadmin from "./axiosadmin";
const roleapi = {
    getAll: (successCallback, failedCallback) => {
        const url = `roles`;
        return axiosadmin.get(url).then(successCallback).catch(failedCallback);
    }
}



export default roleapi;
