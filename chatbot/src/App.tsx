import './App.css'
import ZephyrInfo from "./chatbot_page/chatbotinfo.tsx"
import { ChatMinimal } from './chatbot_page/ChatMinimal.tsx'

function App() {

  return (
   <main style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
      <h1>🤖 Chatbot UI (React + TS + Vite)</h1>
      <ZephyrInfo/>
      <p>Served via Docker (Nginx in prod, Vite in dev).</p>
      <ChatMinimal/>
    </main>
  )
}



export default App
