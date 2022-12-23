import styles from 'styles/post-body.module.css'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode,
}

export default function PostBody({ children }:Props) {
    return (
        <div className={styles.stack}>
            {children}
        </div>
    )
}