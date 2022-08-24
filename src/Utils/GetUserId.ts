import jwt from 'jsonwebtoken'
import { ExpressContext } from 'apollo-server-express';

type JwtPayload = {
  userId: string;
} & jwt.JwtPayload

const getTokenPayload = (token: string) => {
  const jwtSecret = process.env.APP_SECRET
  if (!jwtSecret) throw new Error('secret key not found')
  return jwt.verify(token, jwtSecret) as JwtPayload
}

export const GetUserId = (req: ExpressContext["req"], authToken?: string) => {
  if (req) {
    // ヘッダーから、認証権限を確認する。
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.replace("Bearer", "")
      if (!token) throw new Error('トークンが見つかりませんでした')

      const { userId } = getTokenPayload(token)
      return Number(userId)
    }
  } else if (authToken) {
    const { userId } = getTokenPayload(authToken)
    return Number(userId)
  }
  throw new Error('認証できませんでした')
}