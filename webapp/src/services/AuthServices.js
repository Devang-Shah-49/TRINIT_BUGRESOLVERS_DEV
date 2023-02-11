import httpCommon from "../http-common";

const login = (data) => {
    return httpCommon.post(`/api/auth/signin`, data);
};

const signup = (data) => {
    return httpCommon.post(`/api/auth/signup`, data);
};

export default {
    login,
    signup
}