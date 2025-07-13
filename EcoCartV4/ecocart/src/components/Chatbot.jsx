import React, { useState } from 'react'
import axios from 'axios'

const Chatbot = () => {
  const [question, setQuestion] = useState("")
  const [messages, setMessages] = useState([])

  const API_KEY = import.meta.env.VITE_API_KEY

  const allowedKeywords = [
    'eco', 'green', 'recycle', 'sustainability', 'carbon',
    'environment', 'pollution', 'plastic', 'organic',
    'biodegradable', 'climate', 'footprint', 'save earth',
    'save water', 'save energy','thank you','bamboo brush'
  ];
  
  function isEcoFriendly (question){
    const LowerQ=question.toLowerCase();
    return allowedKeywords.some(keyword => LowerQ.includes(keyword));
  }

  
  

  async function generateAnswer() {
    if (!question.trim()) {
        return;
    }

    if (!isEcoFriendly(question)) {
        setMessages((prev) => [...prev, { type: 'bot', text: "Please ask questions related to eco-friendly or sustainable topics 🌿" }]);
        return;
      }

    const userMsg = { type: "user", text: question }
    setMessages((prev) => [...prev, userMsg])

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCiqB0TdX01BHRUQLurw_qqA_I-PPcxbHI`,
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
          },
        data: {
          contents: [{
            parts: [{ text: question }]
          }]
        }
      })

      const botReply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I didn't get that."

      const botMsg = { type: 'bot', text: botReply }
      setMessages((prev) => [...prev, botMsg])
    } catch (error) {
        console.log(error.response.data)
        console.log("Error",error.messages)
      setMessages((prev) => [...prev, { type: 'bot', text: "Error getting response!" }])
    }

    setQuestion('')
  }

  return (
    <div className='w-full max-w-sm h-[500px] mx-auto border rounded-2xl shadow-lg flex flex-col overflow-hidden'>
      <div className='bg-green-600 text-white text-center py-3 font-semibold text-lg'>
        Chat with us
      </div>

      <div className='flex-1 bg-gray-100 p-4 space-y-3 overflow-y-auto'>
        {messages.length === 0 && (
          <div className='bg-white max-w-[75%] px-4 py-2 rounded-lg text-sm'>
            Hello! How can I help you?
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[75%] px-4 py-2 rounded-lg text-sm ${
              msg.type === 'bot'
                ? 'bg-white text-left'
                : 'bg-green-200 self-end ml-auto text-right'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className='flex p-3 border-t bg-white'>
        <input
          type="text"
          placeholder='Enter your message'
          className='flex-1 px-3 py-2 border rounded-lg outline-none text-sm'
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button
          className='ml-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700'
          onClick={generateAnswer}
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default Chatbot
