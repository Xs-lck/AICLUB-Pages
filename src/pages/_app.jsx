/*
 * @Description: 请补充模块描述
 *
 * @Author: liaoxiangsui
 * @Date: 2024-03-12 11:28:40
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */
import Header from '@/components/Header';
import '@/styles/globals.css';

export default function App({ Component, ...props }) {
  const { router } = props;
  const detailAuth = router?.query?.session_id;
  return (
    <div>
      {detailAuth ? null : <Header />}
      <Component {...props} />
    </div>
  );
}
