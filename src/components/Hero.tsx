
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="px-6 py-20 md:py-32 flex flex-col items-center text-center max-w-5xl mx-auto">
      <div className="inline-block mb-6 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
        <Sparkles className="inline-block w-4 h-4 mr-2" />
        AI-Powered Student Projects
      </div>
      
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
        Transform your ideas into <span className="tech-gradient-text">working projects</span> instantly
      </h1>
      
      <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-10">
        SparkAI Lab generates complete tech projects from your ideas. Get structured abstracts, 
        source code, and automated dependency setup — all powered by advanced AI.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
        <Button size="lg" className="gap-2 px-8">
          Build a project
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button size="lg" variant="outline">
          View examples
        </Button>
      </div>
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full text-center">
        {[
          { title: "800+", description: "Projects Generated" },
          { title: "15+", description: "Supported Technologies" },
          { title: "2,500+", description: "Happy Students" }
        ].map((stat, index) => (
          <div key={index} className="p-6 rounded-lg border bg-card">
            <h3 className="text-3xl font-bold tech-gradient-text mb-2">{stat.title}</h3>
            <p className="text-muted-foreground">{stat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
