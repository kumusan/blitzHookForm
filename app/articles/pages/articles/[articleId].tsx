import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getArticle from "app/articles/queries/getArticle"
import deleteArticle from "app/articles/mutations/deleteArticle"

export const Article = () => {
  const router = useRouter()
  const articleId = useParam("articleId", "number")
  const [article] = useQuery(getArticle, { where: { id: articleId } })
  const [deleteArticleMutation] = useMutation(deleteArticle)

  return (
    <div>
      <h1>Article {article.id}</h1>
      <pre>{JSON.stringify(article, null, 2)}</pre>

      <Link href="/articles/[articleId]/edit" as={`/articles/${article.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteArticleMutation({ where: { id: article.id } })
            router.push("/articles")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowArticlePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/articles">
          <a>Articles</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Article />
      </Suspense>
    </div>
  )
}

ShowArticlePage.getLayout = (page) => <Layout title={"Article"}>{page}</Layout>

export default ShowArticlePage
