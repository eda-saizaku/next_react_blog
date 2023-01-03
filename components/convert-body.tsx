import parse, { Element } from 'html-react-parser'
import Image from 'next/image'

type prop = {
  contentHTML: string
}
export default function ConvertBody({ contentHTML }: prop) {
  const contentReact = parse(contentHTML, {
    replace: (node) => {
      const n_elm = node as Element
      if (n_elm.name === 'img') {
        const { src, alt, width, height } = n_elm.attribs as any
        return (
          <Image
            src={src}
            width={width}
            height={height}
            alt={alt}
            style={{
              width: '100%',
              height: 'auto',
            }}
            sizes="(min-width: 768px) 768px, 100vw"
          />
        )
      }
    },
  })
  return <>{contentReact}</>
}
