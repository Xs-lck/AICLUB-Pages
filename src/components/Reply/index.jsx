/*
 * @Description: 请补充模块描述
 *
 * @Author: liaoxiangsui
 * @Date: 2024-03-06 15:28:30
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */
import { memo } from 'react';
import Image from 'next/image';
import MdRender from '../markdown/MdRender';
import styles from './index.module.scss';

function Reply(props) {
  const { source, msg } = props;
  return (
    <div className={styles.replyWrapper}>
      <div className={styles.avater}>
        <Image
          className="h-8 w-auto"
          src={source === 'me' ? '/congkuo.png' : '/gpt.svg'}
          width={24}
          height={24}
          alt="aiclub.com"
        />
      </div>
      <div className={styles.content}>
        <div className={styles.name}>{source === 'me' ? '你' : 'GPT'}</div>
        <div>
          <MdRender
            cursor={source === 'gpt'}
            markdown={`${msg.replace(/\\n/g, '\n').replace(/\\`/g, '`')}`}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(Reply);
