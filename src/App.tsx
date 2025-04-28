// App.tsx
import React, { useEffect, useRef } from 'react';

import Groq from 'groq-sdk';

import Chat from './components/Chat';
import { useState } from 'react';
import { MainWrapper } from './components/MainWrapper';
import HeadingWrapper from './components/HeadingWrapper';
import FooterWrapper from './components/FooterWrapper';
import InputContainer from './components/InputContainer';
import { ChatboxTextarea } from './components/ChatboxTextarea';
import ContentWrapper from './components/ContentWrapper';
import ReactMarkdown from 'react-markdown';
import { ThemeBtn } from './components/ThemeBtn';
import Timestamp from './components/Timestamp';

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

interface ChatMessage {
  prompt: string;
  response: string;
  timestamp: Date;
}

interface AppState {
  inputValue: string;
  chatMessages: ChatMessage[];
}

const App = () => {
  const [state, setState] = useState<AppState>(() => {
    const localValue = localStorage.getItem('appState');
    if (localValue === null) {
      return {
        inputValue: '',
        chatMessages: [],
      };
    }
    return JSON.parse(localValue);
  });
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom when messages change
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state]);

  useEffect(() => {
    localStorage.setItem('appState', JSON.stringify(state));
  }, [state]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState((prevState) => ({
      ...prevState,
      inputValue: event.target.value,
    }));
  };

  const handleClearChat = () => {
    setState((prevState) => ({
      ...prevState,
      chatMessages: [],
      inputValue: '',
    }));

    // Remove chat history from localStorage
    localStorage.removeItem('appState');
  };

  const handleSend = async () => {
    if (state.inputValue.trim() === '') return;

    const chatPrompt = `You: ${state.inputValue}`;

    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: state.inputValue,
          },
        ],
        model: 'llama3-8b-8192',
      });

      const responseContent =
        chatCompletion.choices[0]?.message?.content || 'No response';

      const newChatMessage: ChatMessage = {
        prompt: chatPrompt,
        response: responseContent,
        timestamp: new Date(),
      };

      setState((prevState) => ({
        ...prevState,
        chatMessages: [...prevState.chatMessages, newChatMessage],
        inputValue: '',
      }));
    } catch (error) {
      console.error('Error fetching chat completion:', error);
      const errorMessage = 'Error fetching chat completion';
      const newChatMessage: ChatMessage = {
        prompt: chatPrompt,
        response: errorMessage,
        timestamp: new Date(),
      };
      setState((prevState) => ({
        ...prevState,
        chatMessages: [...prevState.chatMessages, newChatMessage],
        inputValue: '',
      }));
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent the default action (newline)
      handleSend();
    }
  };

  return (
    <MainWrapper>
      <HeadingWrapper>
        <div className="text-3xl font-heading">
          <span>Lux</span>ChatBot
        </div>
      </HeadingWrapper>

      {/* CHAT CONTAINER */}
      <ContentWrapper>
        <Chat>
          {state.chatMessages.map((message, index) => (
            <div key={index} className="gap-10">
              <Timestamp timestamp={message.timestamp} />
              <div className="flex justify-end w-full mb-3">
                <div className="chat-bubble bg-neutral-900 text-neutral-300 rounded-[99px] p-3 max-w-[70%]">
                  {message.prompt.substring(5)}
                </div>
              </div>
              <div className="flex justify-start w-full text-neutral-300">
                <div className="chat-bubble">
                  <ReactMarkdown>{message.response}</ReactMarkdown>
                </div>
              </div>
              <div ref={bottomRef} />
            </div>
          ))}
        </Chat>
      </ContentWrapper>

      {/* SEARCH BAR CONTAINER */}
      <FooterWrapper>
        <ChatboxTextarea
          placeholder="Enter your text"
          value={state.inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onClear={handleClearChat}
        ></ChatboxTextarea>
      </FooterWrapper>
    </MainWrapper>
  );
};

export default App;
