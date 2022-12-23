import styles from 'styles/two-column.module.css'
import type { ReactNode } from 'react'

type Props = {
    children: ReactNode,
}

export function TwoColumn({ children }: Props) {
    return (
        <div className={styles.flexContainer}>
            {children}
        </div>
    )
}

export function TwoColumnMain({ children }: Props) {
    return (
        <div className={styles.main}>
            {children}
        </div>
    )
}

export function TwoColumnSidebar({ children }: Props) {
    return (
        <div className={styles.sidebar}>
            {children}
        </div>
    )
}