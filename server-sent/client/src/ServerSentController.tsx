import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { server, points } from 'config/index';
import Socials from 'components/Socials';
import type { MessageDto } from 'interfaces/message-dto';

const ServerSentController = () => {
  const messagesRef = useRef<HTMLDivElement>(null);
  const [username, setUsername] = useState<null | string>(null);
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState('');
  const [messagesList, setMessagesList] = useState<MessageDto[]>([]);

  const scrollToBottom = () => {
    messagesRef.current?.scrollTo({ top: messagesRef.current?.scrollHeight });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messagesList]);

  const subscribe = async() => {
    const eventSource = new EventSource(`${server}${points.CONNECT}`);

    eventSource.onopen = () => setConnected(true);

    eventSource.onmessage = ({ data }) => setMessagesList(current => [...current, JSON.parse(data)]);
  };

  const add = async() => {
    if (message.trim() === '') {
      return;
    }

    const data = {
      message,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
      username,
    };

    await axios.post(`${server}${points.ADD}`, data);

    setMessage(() => '');
  };

  function handleKeyPress(e: React.KeyboardEvent, isLogin: Boolean = false) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();

      if (isLogin && username && username.trim() !== '') {
        return subscribe();
      }

      add();
    }
  }

  if (!connected) {
    return (
      <React.Fragment>
        <Socials />

        <div className="wrapper login">
          <div className="form">
            <h1>Sign in to App</h1>

            <div className="textarea-wrapper">
              <input
                type="text"
                className="input"
                placeholder="Enter your username..."
                onChange={e => setUsername(e.target.value)}
                onKeyDown={e => handleKeyPress(e, true)} />
            </div>

            <div className="actions">
              <button
                type="button"
                className="button"
                disabled={!username || username?.trim() === ''}
                onClick={subscribe}>
              Enter
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Socials />

      <div className="wrapper">
        <div
          ref={messagesRef}
          className="messages">
          <div className="message-list">
            {messagesList.map((item, index) =>
              <div
                key={index}
                className={`message ${username === item.username ? 'self' : ''}`}>
                <div className="message-header">
                  <span className="username">{item.username}</span>

                  <span className="time">{item.time}</span>
                </div>

                {item.message}
              </div>)}
          </div>
        </div>

        <div className="form">
          <div className="textarea-wrapper">
            <textarea
              className="textarea"
              placeholder="Write a message..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={handleKeyPress} />
          </div>

          <div className="actions">
            <button
              type="button"
              className="button"
              disabled={message.trim() === ''}
              onClick={add}>
            Send
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ServerSentController;
