import { getPostBySlug, getAllSlugs } from 'lib/api'
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
import { extractText } from 'lib/extract-text'
import Meta from 'components/meta'
import { eyecatchLocal } from 'lib/constants'
import { getPlaiceholder } from 'plaiceholder'
import prevNextPost from 'lib/prev-next-post'
import Pagination from 'components/pagination'

type Props = InferGetServerSidePropsType<typeof getStaticProps>

export default function Post({
  title,
  publish,
  content,
  eyecatch,
  categories,
  description,
  prevPost,
  nextPost,
}: Props) {
  return (
    <Container>
      <Meta
        pageTitle={title}
        pageDesc={description}
        pageImg={eyecatch.url}
        pageImgW={eyecatch.width}
        pageImgH={eyecatch.height}
      />
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
            placeholder="blur"
            blurDataURL={eyecatch.blurDataURL}
            key={eyecatch.url}
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
        <Pagination
          prevText={prevPost.title}
          prevUrl={`/blog/${prevPost.slug}`}
          nextText={nextPost.title}
          nextUrl={`/blog/${nextPost.slug}`}
        />
      </article>
    </Container>
  )
}

export async function getStaticPaths() {
  const allSlugs = await getAllSlugs()
  type Slug = {
    slug: string
  }
  return {
    paths: allSlugs.map(({ slug }: Slug) => `/blog/${slug}`),
    fallback: false,
  }
}
export async function getStaticProps(context: GetServerSidePropsContext) {
  const slug = context.params?.slug as string
  const post = (await getPostBySlug(slug)) as any //TODO: as anyってどうなんだろう？
  const content = post.content
  const description = extractText(content)
  const eyecatch = post.eyecatch ?? eyecatchLocal
  const { base64 } = await getPlaiceholder(eyecatch.url)
  eyecatch.blurDataURL = base64

  const allSlugs = await getAllSlugs()
  const [prevPost, nextPost] = prevNextPost(allSlugs, slug)
  return {
    props: {
      title: post.title,
      publish: post.publishDate,
      content: post.content,
      eyecatch: eyecatch,
      categories: post.categories,
      description: description,
      prevPost: prevPost,
      nextPost: nextPost,
    },
  }
}
