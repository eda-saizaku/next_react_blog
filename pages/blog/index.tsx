import Hero from 'components/hero'
import Container from 'components/container'
import Meta from 'components/meta'
export default function Blog() {
    return (
        <Container>
            <Meta pageTitle='ブログ' pageDesc='ブログの記事一覧' />
            <Hero title="Blog" subtitle="Recent Posts" />
        </Container>
    )
}