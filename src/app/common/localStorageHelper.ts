import Cookies from "js-cookie";

export const setToken = (token: string) => {
    Cookies.set("token", token, { expires: 7 });
};

export const getToken = (): string | undefined => {
    return Cookies.get("token");
};

export const deleteToken = () => {
    Cookies.remove("token");
};
