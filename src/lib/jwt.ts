import jwt from "jsonwebtoken";

const { PRIVATE_KEY } = process.env;

export const signJWT = (payload: string | object | Buffer): string => {
    const token = jwt.sign(payload, PRIVATE_KEY);
    return token;
};

export const verifyJWT = (token: string): any => {
    const data = jwt.verify(token, PRIVATE_KEY);
    return data;
};
