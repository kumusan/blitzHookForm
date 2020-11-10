import { Ctx } from "blitz"
import db, { FindManyArticleArgs } from "db"

type GetArticlesInput = Pick<FindManyArticleArgs, "where" | "orderBy" | "skip" | "take">

export default async function getArticles(
  { where, orderBy, skip = 0, take }: GetArticlesInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const articles = await db.article.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.article.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    articles,
    nextPage,
    hasMore,
    count,
  }
}
