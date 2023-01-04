import styles from 'styles/posts.module.css'
import Link from 'next/link'
import Image from 'next/image'

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
type Posts = Post[]
type prop = {
  posts: Posts
}
export default function Posts({ posts }: prop) {
  return (
    <div className={styles.gridContainer}>
      {posts.map(({ title, slug, eyecatch }: Post) => (
        <article className={styles.post} key={slug}>
          <Link href={`/blog/${slug}`}>
            <figure>
              <Image
                src={eyecatch.url}
                alt=""
                fill
                sizes="(min-width: 1152px) 576px, 50vw"
                placeholder="blur"
                blurDataURL={eyecatch.blurDataURL}
              />
            </figure>
            <h2>{title}</h2>
          </Link>
        </article>
      ))}
    </div>
  )
}
