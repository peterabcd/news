import { useState, useEffect, useRef } from 'react'
import { tickerItems } from '../../data/articles'
import styles from './NewsTicker.module.css'

export default function NewsTicker() {
  const [offset, setOffset] = useState(0)
  const [animating, setAnimating] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const n = tickerItems.length

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setAnimating(true)
      setTimeout(() => {
        setOffset(prev => prev + 1)
        setAnimating(false)
      }, 300)
    }, 3500)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const leftItem = tickerItems[offset % n]
  const rightItem = tickerItems[(offset + Math.ceil(n / 2)) % n]

  return (
    <div className={styles.ticker}>
      <div className={`${styles.column} ${animating ? styles.animating : ''}`}>
        <span className={styles.outletName}>{leftItem.outletName}</span>
        <span className={styles.headline}>{leftItem.headline}</span>
      </div>
      <div className={`${styles.column} ${animating ? styles.animating : ''}`}>
        <span className={styles.outletName}>{rightItem.outletName}</span>
        <span className={styles.headline}>{rightItem.headline}</span>
      </div>
    </div>
  )
}
