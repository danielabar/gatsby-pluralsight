import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"

export default () => (
  <Layout>
    <h1>This is the index page</h1>
    <nav>
      <Link to="/">Home</Link> | <Link to="/about">About Me</Link>
    </nav>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
      voluptates earum et autem facilis aliquam? Architecto, quibusdam
      dignissimos repellendus harum ipsum eius facilis, necessitatibus
      aspernatur, recusandae non labore magnam tempora?
    </p>
  </Layout>
)
