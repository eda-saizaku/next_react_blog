import { getAllCategories, getAllPostsByCategory } from 'lib/api'
import Container from 'components/container'
import PostHeader from 'components/post-header'
import Posts from 'components/posts'
import { getPlaiceholder } from 'plaiceholder'
import { eyecatchLocal } from 'lib/constants'
import Meta from 'components/meta'

type Context = {
  params: {
    slug: string
  }
}
type Cate = {
  slug: string
  name: string
  id: string
}
type Cats = Cate[]
type Post = {
  title: string
  slug: string
  eyecatch: {
    url: string
    width: any
    height: any
    blurDataURL: string
  }
}
type prop = {
  name: string
  posts: Post[]
}
type Slug = {
  name: string
  id: string
  slug: string
}
type Slugs = Slug[]
export default function Category({ name, posts }: prop) {
  return (
    <Container>
      <Meta pageTitle={name} pageDesc={`${name}に関する記事`} />
      <PostHeader title={name} subtitle="Blog Category" />
      <Posts posts={posts} />
    </Container>
  )
}
export async function getStaticPaths() {
  const allCats = (await getAllCategories()) as Slugs
  return {
    paths: allCats.map(({ slug }) => `/blog/category/${slug}`),
    fallback: false,
  }
}
export async function getStaticProps(context: Context) {
  const catSlug = context.params.slug
  const allCats = (await getAllCategories()) as Cats
  const cat = allCats.find(({ slug }) => slug === catSlug)

  const posts = cat?.id ? await getAllPostsByCategory(cat.id) : []

  for (const post of posts) {
    if (!post.hasOwnProperty('eyecatch')) {
      post.eyecatch = eyecatchLocal
    }
    const { base64 } = await getPlaiceholder(post.eyecatch.url)
    post.eyecatch.blurDataURL = base64
  }
  return {
    props: {
      name: cat?.name || '',
      posts: posts,
    },
  }
}
