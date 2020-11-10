import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getArticle from "app/articles/queries/getArticle"
import updateArticle from "app/articles/mutations/updateArticle"
import ArticleForm from "app/articles/components/ArticleForm"

export const EditArticle = () => {
  const router = useRouter()
  const articleId = useParam("articleId", "number")
  const [article, { mutate }] = useQuery(getArticle, { where: { id: articleId } })
  const [updateArticleMutation] = useMutation(updateArticle)

  return (
    <div>
      <h1>Edit Article {article.id}</h1>
      <pre>{JSON.stringify(article)}</pre>

      <ArticleForm
        initialValues={article}
        onSubmit={async () => {
          try {
            const updated = await updateArticleMutation({
              where: { id: article.id },
              data: { name: "MyNewName" },
            })
            await mutate(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push("/articles/[articleId]", `/articles/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error creating article " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditArticlePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditArticle />
      </Suspense>

      <p>
        <Link href="/articles">
          <a>Articles</a>
        </Link>
      </p>
    </div>
  )
}

EditArticlePage.getLayout = (page) => <Layout title={"Edit Article"}>{page}</Layout>

export default EditArticlePage
