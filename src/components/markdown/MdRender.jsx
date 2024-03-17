/*
 * @Description: 请补充模块描述
 *
 * @Author: liaoxiangsui
 * @Date: 2024-03-11 13:20:06
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */
import React, { useEffect, useLayoutEffect, useRef, memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeColorChips from 'rehype-color-chips';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import styles from './index.module.scss';
// import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function MarkdownRenderer({ markdown, cursor }) {
  const markdownRef = useRef(null);
  // useLayoutEffect(() => {
  //   // 清空ref中的所有元素，重新渲染
  //   if (cursor) {
  //     const container = markdownRef.current;
  //     if (container) {
  //       console.log('contaner', container.firstChild);
  //       // 清除容器中的所有子节点
  //       while (container.firstChild) {
  //         container.removeChild(container.firstChild);
  //       }
  //     }
  //   }
  // }, []);
  const copyText = (text) => {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  };

  // // 找到最后一个文本节点
  // const getLastTextNode = (node) => {
  //   if (!node) return null;
  //   if (node.nodeType === Node.TEXT_NODE) {
  //     return node;
  //   }
  //   let children = node.childNodes;
  //   for (let i = children.length - 1; i >= 0; i--) {
  //     const result = getLastTextNode(children[i]);
  //     if (result) {
  //       return result;
  //     }
  //   }
  //   return null;
  // };

  // const updateCursor = () => {
  //   // 找到最后一个文本节点
  //   const lastTextNode = getLastTextNode(markdownRef.current);
  //   // 加文字
  //   const textNodeTemp = document.createTextNode('廖');
  //   console.log('markdownRef', markdownRef.current);
  //   if (!lastTextNode) {
  //     markdownRef.current.appendChild(textNodeTemp);
  //     return;
  //   }
  //   lastTextNode.parentNode.appendChild(textNodeTemp);
  // };

  // useEffect(() => {
  //   // console.log('cursor', cursor);
  //   // console.log('markdown', markdown);
  //   console.log('渲染之后执行');
  //   // 更新光标
  //   cursor && updateCursor();
  // }, [markdown, cursor]);
  return (
    <div ref={markdownRef}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeColorChips]}
        components={{
          code(props) {
            const { children, className, node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <div className={styles.codeWrapper}>
                <div className={styles.lang}>
                  <span>{match[1]}</span>
                  <span className={styles.mglr4}>|</span>
                  <span
                    className={styles.copy}
                    onClick={() => copyText(children)}
                  >
                    复制
                  </span>
                </div>
                <SyntaxHighlighter
                  {...rest}
                  PreTag="div"
                  // eslint-disable-next-line react/no-children-prop
                  children={String(children).replace(/\n$/, '')}
                  language={match[1]}
                  // style={dark}
                />
              </div>
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}

export default memo(MarkdownRenderer);
