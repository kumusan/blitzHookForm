import { Ctx } from "blitz"
import db, { ArticleUpdateArgs } from "db"

type UpdateArticleInput = Pick<ArticleUpdateArgs, "where" | "data">

export default async function updateArticle({ where, data }: UpdateArticleInput, ctx: Ctx) {
  ctx.session.authorize()

  const article = await db.article.update({ where, data })

  return article
}
