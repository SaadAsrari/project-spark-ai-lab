
import React from 'react';
import { FileCode, FileText, Terminal, Download } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <FileText className="h-6 w-6 text-primary" />,
      title: "AI-Generated Abstracts",
      description: "Get structured project abstracts explaining the concept, objectives, and key components."
    },
    {
      icon: <FileCode className="h-6 w-6 text-primary" />,
      title: "Complete Source Code",
      description: "Receive fully-functional source code with comprehensive documentation and comments."
    },
    {
      icon: <Terminal className="h-6 w-6 text-primary" />,
      title: "Automated Setup",
      description: "Our system handles dependency installation and environment configuration automatically."
    },
    {
      icon: <Download className="h-6 w-6 text-primary" />,
      title: "Ready-to-Run Projects",
      description: "Download and run projects immediately with detailed execution instructions."
    }
  ];

  return (
    <section id="features" className="py-16 px-6 bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How SparkAI Lab Helps Students</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform streamlines the process of creating technical projects, letting you focus on learning and innovation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 rounded-lg border bg-card hover:shadow-md transition-shadow"
            >
              <div className="mb-4 p-3 rounded-full bg-primary/10 inline-block">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
