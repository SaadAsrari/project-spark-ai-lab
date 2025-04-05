
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MessageCircle, Send, X, MinusIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "👋 Hi there! I'm your AI assistant. How can I help with your tech project today?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (messagesEndRef.current && isOpen && !isMinimized) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isMinimized]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isMinimized) {
      setIsMinimized(false);
    }
  };

  const minimizeChat = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message
    const newUserMessage: Message = {
      id: messages.length + 1,
      content: message,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages([...messages, newUserMessage]);
    setMessage('');
    
    // Simulate AI reply (in a real app, this would be an API call)
    setTimeout(() => {
      const aiResponses = [
        "I can help you build that project! Let's start by breaking it down into steps.",
        "That's an interesting project idea. What technologies are you familiar with?", 
        "Great question! The best approach would be to start with the core functionality.",
        "I can generate some sample code for that. What language would you prefer?",
        "Let me suggest some dependencies you might need for this project."
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const newAiMessage: Message = {
        id: messages.length + 2,
        content: randomResponse,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, newAiMessage]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className={`fixed bottom-24 right-6 w-80 md:w-96 shadow-xl transition-all duration-300 ease-in-out ${isMinimized ? 'h-14' : 'h-96'}`}>
          <CardHeader className="p-3 border-b flex flex-row items-center justify-between">
            <div className="font-medium">SparkAI Assistant</div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" onClick={minimizeChat} className="h-8 w-8">
                <MinusIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleChat} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          {!isMinimized && (
            <>
              <CardContent className="p-0">
                <ScrollArea className="h-64 p-4">
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                            msg.isUser
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          {msg.content}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>
              
              <CardFooter className="p-3 border-t">
                <form onSubmit={handleSendMessage} className="flex w-full space-x-2">
                  <Input
                    ref={inputRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button type="submit" size="sm" className="px-3">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </>
          )}
        </Card>
      )}
    </>
  );
};

export default ChatBox;
