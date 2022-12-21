type Props = {
    title: string,
    subtitle: string,
    imageOn?: boolean,
}

export default function Hero({title, subtitle, imageOn=false}: Props) {
    return (
        <div>
            <h1>{title}</h1>
            <p>{subtitle}</p>
            {imageOn && <figure>[画像]</figure>}
        </div>
    )
}