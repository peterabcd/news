import { CATEGORIES } from '../../types';
import type { Category } from '../../types';
import styles from './CategoryTabBar.module.css';

interface Props {
  activeCategory: Category;
  onCategoryChange: (cat: Category) => void;
  progress: number;
}

export default function CategoryTabBar({ activeCategory, onCategoryChange, progress }: Props) {
  return (
    <div className={styles.tabBar}>
      {CATEGORIES.map(cat => (
        <button
          key={cat}
          className={`${styles.tab} ${cat === activeCategory ? styles.active : ''}`}
          onClick={() => onCategoryChange(cat)}
        >
          {cat}
          {cat === activeCategory && (
            <span
              className={styles.progressBar}
              style={{
                width: `${progress}%`,
                transition: progress === 0 ? 'none' : 'width 0.1s linear',
              }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
