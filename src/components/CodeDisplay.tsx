
import React from 'react';
import { Card } from "@/components/ui/card";

interface CodeDisplayProps {
  code: string;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ code }) => {
  return (
    <Card className="bg-darkCharcoal rounded-md overflow-hidden">
      <pre className="p-4 text-sm font-mono text-white overflow-x-auto">
        <code>{code}</code>
      </pre>
    </Card>
  );
};

export default CodeDisplay;
