import { jwtVerify, SignJWT } from "jose";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || 'default_secrete');

export async function generateToken(payload: { uuid: string; email: string }) {
  const token = await new SignJWT({
    uuid: payload.uuid,
    email: payload.email,
  })
    .setProtectedHeader({
      alg: 'HS256'
    })
    .setIssuedAt()
    .setIssuer(process.env.JWT_ISSUER || 'lifted')
    .setExpirationTime(process.env.JWT_EXPIRATION_TIME || "1 day")
    .sign(secretKey);
  return token;
}

export async function verifyToken(token: string) {
  try {
    const { payload, protectedHeader } = await jwtVerify(token, secretKey, {
      issuer: process.env.JWT_ISSUER || 'lifted',
    });
    return payload;
  } catch (e) {
    return null;
  }
};