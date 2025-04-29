// App.tsx
import React, { useEffect, useRef } from 'react';

import Groq from 'groq-sdk';

import Chat from './components/Chat';
import { useState } from 'react';
import { MainWrapper } from './components/MainWrapper';
import HeadingWrapper from './components/HeadingWrapper';
import FooterWrapper from './components/FooterWrapper';
import { ChatboxTextarea } from './components/ChatboxTextarea';
import ContentWrapper from './components/ContentWrapper';
import ReactMarkdown from 'react-markdown';
import Timestamp from './components/Timestamp';
import { Dropdown } from './components/Dropdown';
import { ModelListResponse } from 'groq-sdk/resources.mjs';
import { FloatingLabelContainer } from './components/FloatingLabelContainer';

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});
const getModels = async () => {
  return await groq.models.list();
};
const DEFAULT_MODEL = 'llama3-8b-8192';

interface ChatMessage {
  prompt: string;
  response: string;
  timestamp: Date;
  model: string;
  error: string;
}

interface AppState {
  inputValue: string;
  chatMessages: ChatMessage[];
}

const App = () => {
  const bottomRef = useRef<HTMLDivElement>(null);

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
  const [models, setModels] = useState<ModelListResponse>();
  const [selectedModel, setSelectedModel] = useState(DEFAULT_MODEL);
  const [loading, setLoading] = useState(false);

  // Fetch all available Groq models
  useEffect(() => {
    getModels().then((res) => setModels(res));
  }, []);

  // Scroll to the bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state]);

  // Save the current app state to localstorage
  useEffect(() => {
    localStorage.setItem('appState', JSON.stringify(state));
  }, [state]);

  // On Esc Press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClearChat();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
      setLoading(true);
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: state.inputValue,
          },
        ],
        model: selectedModel,
      });

      const responseContent =
        chatCompletion.choices[0]?.message?.content || 'No response';

      const newChatMessage: ChatMessage = {
        prompt: chatPrompt,
        response: responseContent,
        timestamp: new Date(),
        model: selectedModel,
        error: '',
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
        response: '',
        timestamp: new Date(),
        model: selectedModel,
        error: errorMessage,
      };
      setState((prevState) => ({
        ...prevState,
        chatMessages: [...prevState.chatMessages, newChatMessage],
        inputValue: '',
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <MainWrapper>
      <HeadingWrapper>
        <div className="flex flex-col text-center font-tarrget">
          <span className="font-[TyphoonItalic] text-5xl md:text-7xl">
            LuxChatBot{'>>>'}
          </span>
          {state.chatMessages.length > 0 ? (
            <button
              className="rounded-full border border-solid border-neutral-900 hover:bg-neutral-600 cursor-pointer"
              onClick={handleClearChat}
            >
              clear chat
            </button>
          ) : null}
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
              <FloatingLabelContainer
                label={message.model}
                isError={!!message.error}
              >
                <div className="flex justify-start w-full text-neutral-300">
                  <div className="chat-bubble">
                    <ReactMarkdown>
                      {message.response ? message.response : message.error}
                    </ReactMarkdown>
                  </div>
                </div>
              </FloatingLabelContainer>
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
          handleSend={handleSend}
          loading={loading}
        ></ChatboxTextarea>
        <div className="w-full">
          <Dropdown
            defaultOption={selectedModel}
            options={models}
            onSelect={(option) => setSelectedModel(option)}
          />
        </div>
      </FooterWrapper>
    </MainWrapper>
  );
};

export default App;
