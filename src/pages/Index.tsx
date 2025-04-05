
import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ProjectGenerator from "@/components/ProjectGenerator";
import WorkflowSteps from "@/components/WorkflowSteps";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <ProjectGenerator />
        <WorkflowSteps />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
