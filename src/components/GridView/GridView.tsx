import { useNewsstand } from '../../context/NewsstandContext'
import { getOutletsByPage, getSubscribedOutlets, getOutletsByCategory } from '../../data/outlets'
import { getArticleByOutletId } from '../../data/articles'
import OutletCell from './OutletCell'
import GridChevron from './GridChevron'
import styles from './GridView.module.css'

export default function GridView() {
  const {
    activeTab, currentPage, setCurrentPage, subscribed, totalPages,
    setActiveCategory, setCurrentOutletIndex, setViewMode,
  } = useNewsstand()

  const displayOutlets =
    activeTab === 'subscribed'
      ? getSubscribedOutlets(subscribed)
      : getOutletsByPage(currentPage)

  const showPagination = activeTab === 'all'

  function handleOutletClick(outletId: string) {
    const article = getArticleByOutletId(outletId)
    if (!article) return
    const outlet = displayOutlets.find(o => o.id === outletId)
    if (!outlet) return
    const categoryOutlets = getOutletsByCategory(outlet.category)
    const index = categoryOutlets.findIndex(o => o.id === outletId)
    setActiveCategory(outlet.category)
    setCurrentOutletIndex(index >= 0 ? index : 0)
    setViewMode('list')
  }

  return (
    <div className={styles.wrapper}>
      {showPagination && (
        <GridChevron
          direction="left"
          disabled={currentPage <= 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        />
      )}
      <div className={styles.grid}>
        {displayOutlets.length === 0 ? (
          <div className={styles.empty}>구독한 언론사가 없습니다.</div>
        ) : (
          displayOutlets.map(outlet => (
            <OutletCell
              key={outlet.id}
              outlet={outlet}
              onClick={getArticleByOutletId(outlet.id) ? () => handleOutletClick(outlet.id) : undefined}
            />
          ))
        )}
      </div>
      {showPagination && (
        <GridChevron
          direction="right"
          disabled={currentPage >= totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        />
      )}
    </div>
  )
}
