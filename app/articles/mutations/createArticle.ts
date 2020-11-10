import { Ctx } from "blitz"
import db, { ArticleCreateArgs } from "db"
import { CreateInput, CreateInputType } from "../validation"

type CreateArticleInput = { data: CreateInputType } 
export default async function createArticle({ data }: CreateArticleInput, ctx: Ctx) {
  ctx.session.authorize()

  const { title, content } = CreateInput.parse(data)

  const article = await db.article.create({ 
    data: {
      title,
      content,
      user: {
        connect: { id: ctx.session.userid },
      }
    }
  })

  return article
}
