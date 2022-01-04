import axiosadmin from "./axiosadmin";
import { Redirect } from "react-router-dom";

const authApi = {
    logIn: async (credential, successCallback, failedCallback) => {
        return await axiosadmin.post('auth/sign-in', {
            username: credential.username,
            password: credential.password
        }).then(successCallback)
            .catch(failedCallback)
    },
    logOut: (successCallback) => {
        axiosadmin.post('auth/sign-out').then(successCallback);
    }
}


authApi.logIn({
     username: "quadaland",
     password: "admin123"
})


export default authApi;
