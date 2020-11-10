import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getArticles from "app/articles/queries/getArticles"

const ITEMS_PER_PAGE = 100

export const ArticlesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ articles, hasMore }] = usePaginatedQuery(getArticles, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <Link href="/articles/[articleId]" as={`/articles/${article.id}`}>
              <a>{article.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const ArticlesPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/articles/new">
          <a>Create Article</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <ArticlesList />
      </Suspense>
    </div>
  )
}

ArticlesPage.getLayout = (page) => <Layout title={"Articles"}>{page}</Layout>

export default ArticlesPage
