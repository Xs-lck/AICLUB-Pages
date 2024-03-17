/*
 * @Description: 请补充模块描述
 *
 * @Author: liaoxiangsui
 * @Date: 2024-03-12 14:51:54
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */
import Link from 'next/link';
import styles from './index.module.scss';
import cx from 'classnames';
export default function Header() {
  return (
    <div className={styles.header}>
      <ul>
        <li>
          <Link href="/">首页</Link>
        </li>
        <li>
          <Link href="/gpt">GPT</Link>
        </li>
      </ul>
      <div className={cx(styles.white, styles.right, styles.loginBtn)}>
        登录
      </div>
    </div>
  );
}
