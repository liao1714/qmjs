import { Tag } from 'antd'
import React from 'react'
import { connect, SelectLang } from 'umi'
import styles from './index.less'
import { history } from 'umi'

const GlobalHeaderRight = (props) => {
  const { theme, layout } = props
  let className = styles.right

  if (theme === 'dark' && layout === 'top') {
    className = `${styles.right}  ${styles.dark}`
  }

  return (
    <div className={className}>
      {/*<SelectLang className={styles.action} />*/}
    </div>
  )
}

export default connect(({ settings }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight)
