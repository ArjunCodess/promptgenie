# PromptGenie: System Prompt Generator

A web application for generating effective system prompts for your AI applications.  This tool allows you to specify various parameters to fine-tune the generated prompt, ensuring it aligns perfectly with your AI application's needs.

## Features

* **Customizable Prompt Generation:**  Generate system prompts tailored to your specific requirements.
* **Parameter Control:** Adjust parameters such as tone, complexity, format, number of examples, and constraints to refine the output.
* **User-Friendly Interface:**  An intuitive web interface simplifies the prompt generation process.
* **Real-time Feedback:**  Immediate feedback on prompt generation status.
* **Clipboard Integration:** Easily copy the generated prompt to your clipboard.
* **Error Handling:** Robust error handling ensures a smooth user experience.

## Usage

1. **Input Prompt:** Enter a description of the task you want your AI system to perform in the provided text area.
2. **Parameter Selection:** Choose desired parameters (tone, complexity, format, examples, constraints) from the dropdown menus.
3. **Generate Prompt:** Click the "Generate Prompt" button to initiate the prompt generation process.
4. **Copy to Clipboard:** Use the copy icon to copy the generated prompt.
5. **Regenerate Prompt:** Use the refresh icon to regenerate the prompt with the current parameters.

## Installation

This project is a Next.js application and requires Node.js and npm (or yarn) to run.

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```
2. Navigate to the project directory:
   ```bash
   cd system-prompt-generator
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:  Create a `.env.local` file in the root directory and add your `GEMINI_AI_API` key:
   ```
   GEMINI_AI_API=<your_api_key>
   ```
5. Run the development server:
   ```bash
   npm run dev
   ```

## Technologies Used

* **Next.js:**  A React framework for building user interfaces. Used for the front-end development.
* **React:** A JavaScript library for building user interfaces. Used for building the UI components.
* **Tailwind CSS:**  A utility-first CSS framework for rapid UI development.  Used for styling the application.
* **@google/generative-ai:** Google's client library for interacting with Generative AI models. Used to communicate with the Gemini AI model.
* **TypeScript:**  A superset of JavaScript that adds static typing. Improves code maintainability and reduces runtime errors.
* **Lucide-React:** A collection of React icons. Used for visual elements in the UI.
* **Sonner:**  A toast notification library. Provides feedback to the user.


## API Documentation

**Endpoint:** `/api/generate`

**Method:** `POST`

**Request Body:**

```json
{
  "prompt": "Summarize the plot of Hamlet.",
  "parameters": {
    "tone": "professional",
    "complexity": "intermediate",
    "format": "concise",
    "examples": "few",
    "constraints": "moderate"
  }
}
```

**Response Body (Success):**

```json
{
  "completion": "Generated system prompt for summarizing Hamlet..."
}
```

**Response Body (Error):**

```json
{
  "error": "Error message",
  "status": 500 
}
```


## Dependencies

The project's dependencies are listed in the `package.json` file.  They include libraries for UI development, AI interaction, and utility functions.


## Contributing

Contributions are welcome! Please open an issue or submit a pull request.


## Testing

No dedicated testing framework is included in this example.  Adding tests would enhance the robustness of the application.



*README.md was made with [Etchr](https://etchr.dev)*