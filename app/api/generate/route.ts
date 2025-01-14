import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "@/lib/utils";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_AI_API!);

interface PromptParameters {
  tone: 'professional' | 'friendly' | 'technical' | 'casual';
  complexity: 'basic' | 'intermediate' | 'advanced';
  format: 'concise' | 'detailed' | 'comprehensive';
  examples: 'none' | 'few' | 'many';
  constraints: 'minimal' | 'moderate' | 'strict';
}

interface GenerateRequest {
  prompt: string;
  parameters: PromptParameters;
}

interface GenerateResponse {
  completion: string;
}

function generateSystemPrompt(userPrompt: string, parameters: PromptParameters): string {
  const examplesCount = {
    none: 0,
    few: 2,
    many: 4,
  };

  const formatLength = {
    concise: 'Keep the response brief and to the point',
    detailed: 'Provide a balanced level of detail',
    comprehensive: 'Include extensive details and explanations',
  };

  const constraintLevel = {
    minimal: 'with basic safety guidelines',
    moderate: 'with clear boundaries and moderate restrictions',
    strict: 'with strict limitations and comprehensive safety measures',
  };

  return `
    Create a ${parameters.tone} system prompt based on the following requirements:
    ${userPrompt}
    
    Please ensure the system prompt follows these specifications:
    1. Use a ${parameters.tone} tone throughout the prompt
    2. Match ${parameters.complexity} level complexity
    3. ${formatLength[parameters.format]}
    4. Include ${examplesCount[parameters.examples]} relevant examples
    5. Set up ${constraintLevel[parameters.constraints]}
    
    The prompt should:
    1. Be well-structured and clear
    2. Include specific guidelines and constraints
    3. Define the AI's role and behavior clearly
    4. Be optimized for the intended use case
  `;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as GenerateRequest;

    if (!body.prompt) {
      const error: ApiError = {
        error: "Prompt is required",
        status: 400
      };
      return NextResponse.json(error, { status: 400 });
    }

    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Generate system prompt with parameters
    const systemPrompt = generateSystemPrompt(body.prompt, body.parameters);
    const result = await model.generateContent(systemPrompt);

    const response = result.response;
    const text = response.text();

    const data: GenerateResponse = {
      completion: text
    };

    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("Error generating prompt:", error);
    
    const apiError: ApiError = {
      error: error instanceof Error ? error.message : "Failed to generate prompt",
      status: 500
    };
    
    return NextResponse.json(apiError, { status: 500 });
  }
}