import { getPostBySlug } from 'lib/api'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Container from 'components/container'

type Props = InferGetServerSidePropsType<typeof getStaticProps>

const Page = ({ title, publish, content, eyecatch, categories }: Props) => {
  return (
    <Container>
      <h1>{title}</h1>
      <div>{content}</div>
    </Container>
  )
}
export async function getStaticProps({}: GetServerSidePropsContext) {
  const slug = 'schedule'
  const post = getPostBySlug(slug)
  let res
  try {
    res = await post
  } catch (err) {
    console.log(err)
  }
  return {
    props: {
      title: res.title,
      publish: res.publishDate,
      content: res.content,
      eyecatch: res.eyecatch,
      categories: res.categories,
    },
  }
}

export default Page