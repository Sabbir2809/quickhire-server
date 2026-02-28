import jwt from "jsonwebtoken";

export const generateJWT = (
  payload: object,
  secret: string,
  expiresIn: string = "7d"
) => {
  return jwt.sign(payload, secret, { expiresIn } as any);
};

export const verifyJWT = (token: string, secret: string) => {
  return jwt.verify(token, secret) as any;
};
