import React from "react"
import Layout from "../components/layout"
import Title from "../components/title"
import ArticleList from "../components/article-list"

export default () => (
  <Layout>
    <Title text="Welcome" />
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
      voluptates earum et autem facilis aliquam? Architecto, quibusdam
      dignissimos repellendus harum ipsum eius facilis, necessitatibus
      aspernatur, recusandae non labore magnam tempora?
    </p>
    <ArticleList />
  </Layout>
)
