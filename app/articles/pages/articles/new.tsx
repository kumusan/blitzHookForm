import React from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createArticle from "app/articles/mutations/createArticle"
import ArticleForm from "app/articles/components/ArticleForm"

const NewArticlePage: BlitzPage = () => {
  const router = useRouter()
  const [createArticleMutation] = useMutation(createArticle)

  return (
    <div>
      <h1>Create New Article</h1>

      <ArticleForm
        initialValues={{}}
        onSubmit={async () => {
          try {
            const article = await createArticleMutation({
              data: {
                title: "MyName",
                content: "",
              }
            })
            alert("Success!" + JSON.stringify(article))
            router.push("/articles/[articleId]", `/articles/${article.id}`)
          } catch (error) {
            alert("Error creating article " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/articles">
          <a>Articles</a>
        </Link>
      </p>
    </div>
  )
}

NewArticlePage.getLayout = (page) => <Layout title={"Create New Article"}>{page}</Layout>

export default NewArticlePage
