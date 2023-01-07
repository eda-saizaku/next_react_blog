import { useState, useRef } from 'react'
import styles from 'styles/accordion.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronDown } from '@fortawesome/free-solid-svg-icons'
import { ReactNode } from 'react'

type props = {
  heading: string
  children: ReactNode
}
export default function Accordion({ heading, children }: props) {
  const [textIsOpen, setTextIsOpen] = useState(false)

  const toggleText = () => {
    setTextIsOpen((prev) => !prev)
  }

  const refText = useRef<HTMLDivElement>(null)
  const scrollHeight = `${refText?.current?.scrollHeight || '0px'}px`
  return (
    <div className={textIsOpen ? styles.open : styles.close}>
      <h3 className={styles.heading}>
        <button onClick={toggleText}>
          {heading}
          <FontAwesomeIcon icon={faCircleChevronDown} className={styles.icon} />
        </button>
      </h3>
      <div
        className={styles.text}
        ref={refText}
        style={{ '--text-height': scrollHeight } as { [key: string]: string }}
      >
        <div className={styles.textInner}>{children}</div>
      </div>
    </div>
  )
}
