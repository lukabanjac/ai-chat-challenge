# AI Chat – Coding Challenge

This project is an **AI-powered chat interface** built as a coding challenge for [Aspect](https://aspect.is/). It features a responsive UI, markdown support in chat responses, and a UI built with Tailwind CSS and React.

### ➡️ [Deployed Version](https://ai-chat-challenge-e3ej.vercel.app/)

## Setup instructions

#### 1. Clone the Repo

#### 2. Install Dependencies

``` npm install ```

#### 3. Run the Dev Server

``` npm run dev ```

## Technical decisions and trade-offs

Here the main tradeoff is using the [Groq](https://groq.com/) on the client side. To save time, I've opted out of configuring back-end service and used Groq on the client-side. The usage on server-side gives us significant security benefits. Also, another downside is that localstorage is used for persisting the chat history.

## Assumptions made

No chat history is preserved upon user sessions.

## Future improvements you'd make

- More readable React code with improved granularity of components
- File upload support
- More streamlined ui with transitions and intuitive design and themes.
- Back-end support with authentication
- DB for persisting user history and 
