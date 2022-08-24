import { MutationResolvers } from './../generated/graphql';
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const Mutation: MutationResolvers<{ prisma: PrismaClient, userId: number | undefined }> = {
  post: async (parent, args, context) => {
    const newLink = await context.prisma.link.create({
      data: {
        description: args.description,
        url: args.url,
        postedBy: { connect: { id: context.userId } }
      },
    });
    return newLink
  },

  signup: async (parent, args, context) => {
    // パスワード設定
    const password = await bcrypt.hash(args.password, 10)

    // ユーザー新規作成
    const user = await context.prisma.user.create({ data: { name: args.name, email: args.email, password } })

    const jwtSecret = process.env.APP_SECRET
    console.log(jwtSecret)
    if (!jwtSecret) throw new Error('secret key not found')
    const token = jwt.sign({ userId: user.id }, jwtSecret)

    return { token, user }
  },

  login: async (parent, args, context) => {
    // ユーザー検索
    const user = await context.prisma.user.findUnique({ where: { email: args.email } })
    if (!user) throw new Error('user not found')

    // パスワード比較
    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) throw new Error('無効なパスワード')

    const jwtSecret = process.env.APP_SECRET
    if (!jwtSecret) throw new Error('secret key not found')

    const token = jwt.sign({ userId: user.id }, jwtSecret)

    return { token, user }
  }
}