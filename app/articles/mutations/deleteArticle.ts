import { Ctx } from "blitz"
import db, { ArticleDeleteArgs } from "db"

type DeleteArticleInput = Pick<ArticleDeleteArgs, "where">

export default async function deleteArticle({ where }: DeleteArticleInput, ctx: Ctx) {
  ctx.session.authorize()

  const article = await db.article.delete({ where })

  return article
}
