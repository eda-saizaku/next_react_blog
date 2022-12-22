import Link from 'next/link'
import styles from 'styles/logo.module.css'

type Props = {
    boxOn?: boolean,
}
export default function Logo({boxOn}:Props) {
    return (
        <Link href="/" className={boxOn ? styles.box : styles.basic}>
            CUBE
        </Link>
    )
}