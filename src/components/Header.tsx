
import React from 'react';
import { Button } from "@/components/ui/button";
import { Github, Code } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const isMobile = useIsMobile();

  return (
    <header className="w-full py-4 px-6 flex items-center justify-between border-b">
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 rounded-md bg-tech-gradient flex items-center justify-center">
          <Code className="h-5 w-5 text-white" />
        </div>
        <h1 className="text-xl font-bold">SparkAI Lab</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        {!isMobile && (
          <nav className="flex items-center space-x-6 mr-4">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">How it works</a>
            <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</a>
          </nav>
        )}
        
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Github className="h-4 w-4" />
          <span className={isMobile ? "sr-only" : ""}>GitHub</span>
        </Button>
        
        <Button size="sm">Get Started</Button>
      </div>
    </header>
  );
};

export default Header;
