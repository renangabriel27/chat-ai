'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useChat } from 'ai/react'
import { ScrollArea } from "./ui/scroll-area";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat'
  })

  return (
    <div className="flex min-h-screen bg-slate-50 items-center justify-center">
      <Card className="w-[440px]">
        <CardHeader>
          <CardTitle>Chat AI</CardTitle>
          <CardDescription>Using Vercel SDK to create a chatbot</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <ScrollArea className="h-[600px] w-full pr-4">
            { messages.map(message => {
              return (
                <div key={message.id} className="flex gap-3 text-slate-600 text-sm mb-4">
                  {message.role === 'user' && (
                    <Avatar>
                      <AvatarFallback>RG</AvatarFallback>
                      <AvatarImage src="https://github.com/renangabriel27.png" alt="User" />
                    </Avatar>
                  )}

                  {message.role === 'assistant' && (
                    <Avatar>
                      <AvatarFallback>VC</AvatarFallback>
                      <AvatarImage src="https://github.com/openai.png" alt="AI" />
                    </Avatar>
                  )}

                  <p className="leading-relaxed">
                    <span className="block font-bold text-slate-800">
                      {message.role == 'user' ? 'Usuário': 'AI'}
                    </span>
                    { message.content}
                  </p>
                </div>
              )
            }) }
          </ScrollArea>
        </CardContent>

        <CardFooter>
          <form onSubmit={handleSubmit} className="w-full flex gap-2">
            <Input
              placeholder="How can I help you?"
              value={input}
              onChange={handleInputChange}
            />

            <Button type="submit">Send</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
