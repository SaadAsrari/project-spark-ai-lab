
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for beginners",
      features: [
        "5 project generations per month",
        "Basic project abstracts",
        "Standard code generation",
        "Community support"
      ],
      buttonText: "Get Started",
      buttonVariant: "outline",
      popular: false
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "per month",
      description: "For regular students",
      features: [
        "50 project generations per month",
        "Detailed project abstracts",
        "Advanced code generation",
        "Automated dependency setup",
        "Email support",
      ],
      buttonText: "Subscribe",
      buttonVariant: "default",
      popular: true
    },
    {
      name: "Team",
      price: "$24.99",
      period: "per month",
      description: "For student groups",
      features: [
        "Unlimited project generations",
        "Comprehensive project abstracts",
        "Premium code quality",
        "Advanced dependency management",
        "Priority email support",
        "Team collaboration features"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-16 px-6 bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that works best for your educational needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`rounded-lg border ${
                plan.popular ? 'border-primary shadow-lg' : ''
              } bg-card overflow-hidden`}
            >
              {plan.popular && (
                <div className="bg-primary py-1.5 text-center text-xs font-semibold text-white">
                  MOST POPULAR
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-2xl font-semibold">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="ml-1 text-sm text-muted-foreground">{plan.period}</span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={plan.buttonVariant as "outline" | "default"} 
                  className={`mt-8 w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                >
                  {plan.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
