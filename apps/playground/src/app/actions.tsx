import { createAI, getMutableAIState, render } from "ai/rsc";
import {
  GenerativeImage,
  GenerativeImageSkeleton,
} from "generative-components";
import { OpenAI } from "openai";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ImageGenerationResponse {
  created: number;
  data: [
    {
      url: string;
      revised_prompt?: string;
    },
  ];
}

async function generateImage(prompt: string, model = "dall-e-3", count = 1) {
  const response = await openai.images
    .generate({
      model,
      prompt,
      n: count,
    })
    .catch((error) => console.log(error))
    .then((response) => response as ImageGenerationResponse);

  const images = response.data;

  return {
    model,
    prompt,
    images,
  };
}

async function submitUserMessage(userInput: string): Promise<object> {
  "use server";

  const aiState = getMutableAIState<typeof AI>();

  // Update the AI state with the new user message.
  aiState.update([
    ...aiState.get(),
    {
      role: "user",
      name: "user",
      content: userInput,
    },
  ]);

  // The `render()` creates a generated, streamable UI.
  const ui = render({
    model: "gpt-4-0125-preview",
    provider: openai,
    messages: [
      {
        role: "system",
        name: "system",
        content:
          "You are a helpful ai assistant that can respond with text and images",
      },
      ...aiState.get(),
    ],
    // `text` is called when an AI returns a text response (as opposed to a tool call).
    // Its content is streamed from the LLM, so this function will be called
    // multiple times with `content` being incremental.
    text: ({ content, done }) => {
      // When it's the final content, mark the state as done and ready for the client to access.
      if (done) {
        aiState.done([
          ...aiState.get(),
          {
            role: "assistant",
            name: "assistant",
            content,
          },
        ]);
      }

      return <p>{content}</p>;
    },
    tools: {
      generate_image: {
        description: "Generate an image based on a description",
        parameters: z
          .object({
            prompt: z
              .string()
              .describe("Description of the image to be generated"),
            model: z
              .string()
              .describe(
                "The model to use for image generation (dall-e-2, dall-e-3)",
              )
              .default("dall-e-3"),
            count: z
              .number()
              .describe("Number of images to generate")
              .default(1),
          })
          .required(),
        render: async function* ({ prompt, count, model }) {
          yield <GenerativeImageSkeleton />;

          const images = (await generateImage(prompt, model, count)).images;

          // Update the final AI state.
          aiState.done([
            ...aiState.get(),
            {
              role: "function",
              name: "generate_image",
              content: JSON.stringify({ prompt, images, count, model }),
            },
          ]);

          return (
            <div>
              {Array.isArray(images) &&
                images.map((image, index) => (
                  <GenerativeImage
                    key={index}
                    src={image.url}
                    alt={prompt}
                    model={model}
                  />
                ))}
            </div>
          );
        },
      },
    },
  });

  return {
    id: Date.now(),
    display: ui,
  };
}

// Define the initial state of the AI. It can be any JSON object.
const initialAIState: {
  role: "user" | "assistant" | "system" | "function";
  content: string;
  name: string;
  id?: string;
}[] = [];

// The initial UI state that the client will keep track of, which contains the message IDs and their UI nodes.
const initialUIState: {
  id: number;
  display: React.ReactNode;
}[] = [];

// AI is a provider you wrap your application with so you can access AI and UI state in your components.
export const AI = createAI({
  actions: {
    submitUserMessage,
  },
  // Each state can be any shape of object, but for chat applications
  // it makes sense to have an array of messages. Or you may prefer something like { id: number, messages: Message[] }
  initialUIState,
  initialAIState,
});
