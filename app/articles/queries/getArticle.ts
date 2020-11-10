import { Ctx, NotFoundError } from "blitz"
import db, { FindFirstArticleArgs } from "db"

type GetArticleInput = Pick<FindFirstArticleArgs, "where">

export default async function getArticle({ where }: GetArticleInput, ctx: Ctx) {
  ctx.session.authorize()

  const article = await db.article.findFirst({ where })

  if (!article) throw new NotFoundError()

  return article
}
