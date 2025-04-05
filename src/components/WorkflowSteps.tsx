
import React from 'react';
import { Check } from 'lucide-react';

const WorkflowSteps = () => {
  const steps = [
    {
      number: '01',
      title: 'Enter Your Project Idea',
      description: 'Describe your project in natural language. Our AI will understand and refine your request.'
    },
    {
      number: '02',
      title: 'Review the Generated Abstract',
      description: 'Get a comprehensive project abstract with objectives, components, and technical requirements.'
    },
    {
      number: '03',
      title: 'Explore the Source Code',
      description: 'Access complete, well-documented source code that implements your project idea.'
    },
    {
      number: '04',
      title: 'Download and Run',
      description: 'Download the project with setup scripts and follow the instructions to run it in VS Code.'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Simple Four-Step Workflow</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From idea to working project in minutes, not days. Our streamlined process makes tech development accessible to all students.
          </p>
        </div>
        
        <div className="space-y-12">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`flex flex-col md:flex-row items-start gap-6 ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-tech-gradient flex items-center justify-center text-white font-bold text-xl">
                  {step.number}
                </div>
              </div>
              
              <div className="flex-1 bg-card border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground mb-4">{step.description}</p>
                <div className="flex items-center text-sm text-primary">
                  <Check className="h-4 w-4 mr-2" />
                  Simple and intuitive
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowSteps;
