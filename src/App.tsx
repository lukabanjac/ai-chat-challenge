// App.tsx
import React from 'react';

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

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const handleSend = async () => {
    if (inputValue.trim() === '') return;

    const chatPrompt = `You: ${inputValue}`;

    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: inputValue,
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

      setChatMessages([...chatMessages, newChatMessage]);
    } catch (error) {
      console.error('Error fetching chat completion:', error);
      const errorMessage = 'Error fetching chat completion';
      const newChatMessage: ChatMessage = {
        prompt: chatPrompt,
        response: errorMessage,
      };
      setChatMessages([...chatMessages, newChatMessage]);
    } finally {
      setInputValue('');
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
      <div className="chat-container">
        <Chat>
          {/* Render chat messages */}
          {chatMessages.map((message, index) => (
            <div key={index} className="chat-message">
              <div className="chat-prompt">{message.prompt}</div>
              <div className="chat-response">{message.response}</div>
            </div>
          ))}
        </Chat>
      </div>
      <div className="searchBar-container">
        <SearchBar>
          <textarea
            className="search-input"
            placeholder="Enter your text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <Button textContent="Send" handleClick={handleSend} />
        </SearchBar>
      </div>
    </>
  );
};

export default App;
