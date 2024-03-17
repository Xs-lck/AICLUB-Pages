/*
 * @Description: 请补充模块描述
 *
 * @Author: liaoxiangsui
 * @Date: 2024-03-12 14:37:31
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */
import { useEffect, useState, useRef } from 'react';
import { login } from '@/api/login';
import styles from './index.module.scss';
import { request } from '@/utils/request';
import cx from 'classnames';
import Reply from '@/components/Reply';
import { test_base_url } from '@/configs/testApiConfig';
import { getSessionHistory } from '@/api/session';
export default function Page(props) {
  const {
    pageProps: { sessionList },
    router,
  } = props;
  const wrapperRef = useRef();
  const inputConRef = useRef();
  const textareaRef = useRef();
  const session_id = router?.query?.session_id;
  const [msg, setMsg] = useState('');
  const [replys, setReplys] = useState([]);

  const getLoginData = async () => {
    const loginData = await login();
    console.log('loginData', loginData);
  };

  const getChatHistory = async () => {
    const list = await getSessionHistory(session_id);
    const initReplys = list?.map((item) => [
      {
        source: 'me',
        msg: item.chat.prompt,
      },
      {
        source: 'gpt',
        msg: item.chat.completion,
      },
    ]);
    setReplys(initReplys.flat());
  };

  useEffect(() => {
    // getLoginData();
    getChatHistory();
  }, [session_id]);

  useEffect(() => {
    wrapperRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  }, [replys]);

  const getChatSession = async (prompt) => {
    const channel = await request.post(
      `/api/ai/session/${session_id}/chat?apifoxApiId=150640034`,
      {
        prompt,
        mode: 'chat',
        session_id,
      }
    );
    if (channel && channel.data) {
      const channel_id = channel.data.channel_id;
      const msg_id = channel.data.msg_id;
      const resp = await fetch(
        `${test_base_url}/api/ai/session/${session_id}/msg/${msg_id}/channel/${channel_id}`,
        {
          method: 'GET',
        }
      );
      const reader = resp.body?.getReader();
      const decoder = new TextDecoder();
      while (1) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value);
        console.log('流式获取', done, JSON.parse(text).data.chat?.completion);
        const gptReply = JSON.parse(text).data.chat?.completion;
        setReplys((replys) =>
          replys.slice(0, replys.length - 1).concat({
            ...replys[replys.length - 1],
            msg: gptReply,
          })
        );
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.column}>Left Top</div>
        <div className={styles['scrollable-content']}>
          {sessionList?.map((item, index) => {
            return (
              <div
                key={index}
                className={cx(
                  session_id === item.session_id && styles.active,
                  styles.session
                )}
                onClick={() => {
                  router.push(`/gpt/[session_id]`, `/gpt/${item.session_id}`);
                }}
              >
                {item.session_name}
              </div>
            );
          })}
        </div>
        <div className={styles.column}>Left Bottom</div>
      </div>
      <div className={styles.right}>
        {/* <div className={styles.column}>Right Top</div> */}
        <div className={cx(styles['scrollable-content'], styles.replyContent)}>
          <div className={styles['mx-auto']} style={{ maxWidth: '40rem' }}>
            {replys.map((reply, index) => (
              <div key={index} className={styles.mgb20}>
                <Reply {...reply} />
              </div>
            ))}
            <div ref={wrapperRef}></div>
          </div>
        </div>
        <div className={styles.inputContainer} ref={inputConRef}>
          <div className={styles.wrapper}>
            <textarea
              ref={textareaRef}
              rows={1}
              placeholder="发送消息给AICLUB..."
              className={styles.inputWrapper}
              value={msg}
              onChange={(e) => {
                setMsg(e.target.value);
                if (textareaRef.current.scrollHeight > 330) {
                  inputConRef.current.style.height = '330px';
                } else {
                  inputConRef.current.style.height =
                    textareaRef.current.scrollHeight < 55
                      ? '55px'
                      : `${textareaRef.current.scrollHeight}px`;
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  // 定位到对应的锚点位置
                  wrapperRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'end',
                    inline: 'nearest',
                  });
                  setReplys((replys) => [
                    ...replys,
                    { source: 'me', msg },
                    // 初始默认给一个空内容
                    { source: 'gpt', msg: '' },
                  ]);
                  // 请求对话数据
                  getChatSession(msg);
                  setMsg('');
                  // 清空内容 恢复成初始高度
                  const height = getComputedStyle(
                    inputConRef.current
                  )?.getPropertyValue('--custom-height');
                  inputConRef.current.style.height = height;
                }
              }}
            />
          </div>
        </div>
        <div className={styles.bottom}>
          <span>AICLUB可能会犯错误。请考虑核实重要信息。</span>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const resp = await request.get('/api/ai/sessions', {
    query: {
      scene: 'room',
      page_size: 10,
      page_no: 1,
    },
  });
  if (resp && resp.data) {
    return {
      props: {
        sessionList: resp.data,
      },
    };
  }
}

// export async function getStaticPaths() {
//   return { paths: [], fallback: false };
// }
