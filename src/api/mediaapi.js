import axiosadmin from "./axiosadmin";
const mediaapi = {
    getAll: (params) => {
        const url = `media`;
        return axiosadmin.get(url, { params });
    },
    getMediaBySlug: (slug, successCallback, failedCallback) => {
        const url = `media/${slug}`;
        return axiosadmin
        .get(url, {
            responseType: 'arraybuffer'
        })
        .then(successCallback)
        .catch(failedCallback);
    },
    addMedia: async (data, successCallback, failedCallback) => {
        return await axiosadmin.post('media', data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        }).then(successCallback).catch(failedCallback);
    },
    deleteMedia: async (slug, successCallback, errorCallback) => {
        return await axiosadmin.delete(`media/${slug}`)
            .then(successCallback)
            .catch(errorCallback)
    }
}



export default mediaapi;