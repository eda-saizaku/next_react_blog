import styles from 'styles/container.module.css'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode,
  large?: boolean,
}
export default function Container({ children, large=false }:Props) {
    return (
        <div className={large ? styles.large : styles.default}>
            {children}
        </div>
    )
}