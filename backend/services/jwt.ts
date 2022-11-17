import { sign, verify } from "jsonwebtoken";

class Jwt {
  public static generateAccessToken(payload: object) {
    return sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {
      expiresIn: "1h",
    });
  }
  public static generateRefreshToken(payload: object) {
    return sign(payload, process.env.REFRESH_TOKEN_SECRET as string, {
      expiresIn: "1d",
    });
  }
  public static verifyAccessToken(token: string) {
    return new Promise((resolve, reject) => {
      verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string,
        (err, decoded) => {
          if (err) return reject(err);
          resolve(decoded);
        }
      );
    });
  }
}

export default Jwt;
