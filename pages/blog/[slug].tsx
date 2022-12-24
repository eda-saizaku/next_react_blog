import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const Page = ({ slug, page }: Props) => {
  return (
    <div>
      <p>Slug is {slug}.</p>
      {page && <p>Page is {page}.</p>}
    </div>
  )
}

export const getServerSideProps = async ({
  params,
  query,
}: GetServerSidePropsContext<{ slug: string }>) => {

  const slug = params?.slug || null
  const page = query?.page || null

  return {
    props: { slug, page },
  }
}

export default Page