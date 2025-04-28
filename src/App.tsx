// App.tsx
import React, { useEffect } from 'react';

import Groq from 'groq-sdk';

import AppName from './components/AppName';
import Button from './components/Button';
import Chat from './components/Chat';
import Headings from './components/Headings';
import SearchBar from './components/SearchBar';
import { useState } from 'react';

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

interface ChatMessage {
  prompt: string;
  response: string;
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
    <>
      <AppName>
        <div>
          <span>Lux</span>ChatBot
        </div>
      </AppName>
      <div>
        <Headings>
          <div>
            <h1>Hi, Welcome.</h1>
          </div>
          <div>
            <h3>How can I help you today?</h3>
          </div>
        </Headings>
      </div>

      {/* CHAT CONTAINER */}
      <div className="chat-container">
        <Chat>
          {state.chatMessages.map((message, index) => (
            <div key={index} className="chatConversations">
              <div className="chat-prompt">{message.prompt}</div>
              <div className="chat-response">{message.response}</div>
            </div>
          ))}
          <Button textContent="Clear Chat" handleClick={handleClearChat} />
        </Chat>
      </div>

      {/* SEARCH BAR CONTAINER */}
      <div className="searchBar-container">
        <SearchBar>
          <textarea
            className="search-input"
            placeholder="Enter your text"
            value={state.inputValue}
            // Use the handleInputChange function
            onChange={handleInputChange}
            // Use the handleKeyDown function
            onKeyDown={handleKeyDown}
          />
          <Button textContent="Send" handleClick={handleSend} />
        </SearchBar>
      </div>
    </>
  );
};

export default App;
