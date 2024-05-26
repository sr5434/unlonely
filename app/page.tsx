"use client";
import { useState, useEffect } from "react";
import Message  from "./components/message"
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline"

interface Response {
  response: string;
}

export default function Home() {
  const [messages, setMessages] = useState<{role: string, message: string}[]>([
    {role: "assistant", message: "Hey, what's up?"},
  ]);
  const [newMessage, setNewMessage] = useState<string>("");
  //useEffect(() => {alert(JSON.stringify(messages))}, [messages])
  const handleInput = async (e: any) => {
    const fieldValue = e.target.value;

    await setNewMessage(fieldValue);
  }
  const submitHandler = async (e: any) => {
    e.preventDefault();
    setMessages([...messages, {
      "role": "user",
      "message": newMessage
    }]);
    setNewMessage("");
    const response: any = await fetch('/api/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      },
      body: JSON.stringify({
        "message": newMessage
      })
    });
    const resJson: Response = await response.json();
    setMessages((msgs) => [...msgs, {
      "role": "assistant",
      "message": resJson.response
    }]);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center">Unlonely: Your Virtual Friend</h1>
      {messages.map((message, index) => (
        <Message key={index} role={message.role} message={message.message} />
      ))}
      <form onSubmit={submitHandler} className="flex flex-row items-center">
        <textarea
          value={newMessage}
          onChange={handleInput}
          className="p-1.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-11/12"
        />
        <button 
          type="submit"
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-3.5 text-center mt-2"
        >
          <ArrowUpCircleIcon className="h-6 w-6 inline-block"/>
        </button>
      </form>
    </div>
  );
}
