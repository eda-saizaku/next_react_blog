import styles from 'styles/hero.module.css'
import Image from 'next/image'
import cube from 'images/cube.jpg'

type Props = {
    title: string,
    subtitle: string,
    imageOn?: boolean,
}

export default function Hero({ title, subtitle, imageOn = false }: Props) {
    return (
        <div className={styles.flexContainer}>
            <div className={styles.text}>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.subtitle}>{subtitle}</p>
            </div>
            {imageOn && (
                <figure className={styles.image}>
                    <Image
                        src={cube}
                        alt=""
                        placeholder="blur"
                        priority
                        sizes="(min-width: 1152px) 576px, (min-width: 768px) 50vw, 100vw"
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                    />
                </figure>
            )}
        </div>
    )
}