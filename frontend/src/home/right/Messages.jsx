import React, { useEffect, useRef } from 'react';
import { Message } from './Message';
import useGetMessage from '../../context/useGetMessage.js';
import Loading from '../../components/Loading.jsx';
import { useGetSocketMessage } from '../../context/useGetSocketMessage.jsx';

export const Messages = () => {
  const { messages, loading } = useGetMessage();
  useGetSocketMessage();

  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }, [messages]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {messages.length > 0 ? (
            messages.map((message, index) => {
              const isLast = index === messages.length - 1;
              return (
                <div key={message._id || index} ref={isLast ? lastMessageRef : null}>
                  <Message message={message} />
                </div>
              );
            })
          ) : (
            <div
              className="flex items-center justify-center text-gray-500"
              style={{ minHeight: 'calc(88vh - 10vh)' }}
            >
              <p className="text-center text-sm">Say Hi 👋</p>
            </div>
          )}
        </>
      )}
    </>
  );
};
