'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Loader2, Sparkles, Copy, RotateCw } from 'lucide-react';
import { toast } from 'sonner';
import { isApiError } from '@/lib/utils';

interface GenerateResponse {
  completion: string;
}

interface PromptParameters {
  tone: 'professional' | 'friendly' | 'technical' | 'casual';
  complexity: 'basic' | 'intermediate' | 'advanced';
  format: 'concise' | 'detailed' | 'comprehensive';
  examples: 'none' | 'few' | 'many';
  constraints: 'minimal' | 'moderate' | 'strict';
}

export function SystemPromptGenerator() {
  const [prompt, setPrompt] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [parameters, setParameters] = useState<PromptParameters>({
    tone: 'professional',
    complexity: 'intermediate',
    format: 'detailed',
    examples: 'few',
    constraints: 'moderate',
  });

  const generatePrompt = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt,
          parameters 
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to generate prompt');
      }

      const data = (await response.json()) as GenerateResponse;
      setGeneratedPrompt(data.completion);
      toast.success('Prompt generated successfully!');
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else if (isApiError(error)) {
        toast.error(error.error);
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      toast.success('Copied to clipboard!');
    } catch {
      toast.error('Failed to copy to clipboard');
    }
  };

  const updateParameter = (key: keyof PromptParameters, value: PromptParameters[keyof PromptParameters]) => {
    setParameters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black px-4 md:px-8 py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
          PromptGenie: System Prompt Generator
          </h1>
          <p className="text-gray-400">
            Create effective system prompts for your AI applications
          </p>
        </div>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Input Prompt</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Textarea
              placeholder="Describe what you want your AI system to do..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[150px] bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-blue-400">Tone</label>
                <div className="relative">
                  <select
                    value={parameters.tone}
                    onChange={(e) => updateParameter('tone', e.target.value as PromptParameters['tone'])}
                    className="w-full h-10 pl-3 pr-10 bg-gray-900/50 border border-gray-700 text-white rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 hover:border-gray-600"
                  >
                    <option value="professional">Professional</option>
                    <option value="friendly">Friendly</option>
                    <option value="technical">Technical</option>
                    <option value="casual">Casual</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-emerald-400">Complexity</label>
                <div className="relative">
                  <select
                    value={parameters.complexity}
                    onChange={(e) => updateParameter('complexity', e.target.value as PromptParameters['complexity'])}
                    className="w-full h-10 pl-3 pr-10 bg-gray-900/50 border border-gray-700 text-white rounded-lg appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 hover:border-gray-600"
                  >
                    <option value="basic">Basic</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-purple-400">Format</label>
                <div className="relative">
                  <select
                    value={parameters.format}
                    onChange={(e) => updateParameter('format', e.target.value as PromptParameters['format'])}
                    className="w-full h-10 pl-3 pr-10 bg-gray-900/50 border border-gray-700 text-white rounded-lg appearance-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 hover:border-gray-600"
                  >
                    <option value="concise">Concise</option>
                    <option value="detailed">Detailed</option>
                    <option value="comprehensive">Comprehensive</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-amber-400">Examples</label>
                <div className="relative">
                  <select
                    value={parameters.examples}
                    onChange={(e) => updateParameter('examples', e.target.value as PromptParameters['examples'])}
                    className="w-full h-10 pl-3 pr-10 bg-gray-900/50 border border-gray-700 text-white rounded-lg appearance-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors duration-200 hover:border-gray-600"
                  >
                    <option value="none">None</option>
                    <option value="few">Few</option>
                    <option value="many">Many</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-rose-400">Constraints</label>
                <div className="relative">
                  <select
                    value={parameters.constraints}
                    onChange={(e) => updateParameter('constraints', e.target.value as PromptParameters['constraints'])}
                    className="w-full h-10 pl-3 pr-10 bg-gray-900/50 border border-gray-700 text-white rounded-lg appearance-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors duration-200 hover:border-gray-600"
                  >
                    <option value="minimal">Minimal</option>
                    <option value="moderate">Moderate</option>
                    <option value="strict">Strict</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center pt-2">
              <Button
                onClick={generatePrompt}
                disabled={isLoading || !prompt.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Prompt
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {generatedPrompt && (
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white">Generated Prompt</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copyToClipboard}
                    className="text-gray-400 hover:text-white"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={generatePrompt}
                    disabled={isLoading}
                    className="text-gray-400 hover:text-white"
                  >
                    <RotateCw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-900 rounded-lg p-4 text-gray-200 whitespace-pre-wrap overflow-x-auto">
                {generatedPrompt}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 