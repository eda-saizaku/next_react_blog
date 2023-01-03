import { getPostBySlug } from 'lib/api'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Container from 'components/container'
import PostHeader from 'components/post-header'
import Image from 'next/image'
import ConvertBody from 'components/convert-body'
import PostBody from 'components/post-body'
import PostCategories from 'components/post-categories'
import {
  TwoColumn,
  TwoColumnMain,
  TwoColumnSidebar,
} from 'components/two-column'

type Props = InferGetServerSidePropsType<typeof getStaticProps>

const Page = ({ title, publish, content, eyecatch, categories }: Props) => {
  return (
    <Container>
      <article>
        <PostHeader title={title} subtitle="Blog Article" publish={publish} />

        <figure>
          <Image
            src={eyecatch.url}
            alt=""
            width={eyecatch.width}
            height={eyecatch.height}
            sizes="(min-width: 1152px) 1152px, 100vw"
            priority
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </figure>

        <TwoColumn>
          <TwoColumnMain>
            <PostBody>
              <ConvertBody contentHTML={content} />
            </PostBody>
          </TwoColumnMain>
          <TwoColumnSidebar>
            <PostCategories categories={categories} />
          </TwoColumnSidebar>
        </TwoColumn>
      </article>
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
