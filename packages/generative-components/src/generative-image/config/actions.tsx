import {
  GenerativeImage,
  GenerativeImageSkeleton,
  getConfigValue,
} from "generative-components";
import { OpenAI } from "openai";
import { z } from "zod";

interface ImageGenerationResponse {
  created: number;
  data: [
    {
      url: string;
      revised_prompt?: string;
    },
  ];
}

export async function imageGeneration(
  prompt: string,
  model = "dall-e-3",
  count = 1,
) {
  const openai = new OpenAI({
    apiKey: getConfigValue("OPENAI_API_KEY"),
  });

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

export const generativeImage = {
  description: "Generate an image based on a description",
  parameters: z
    .object({
      prompt: z.string().describe("Description of the image to be generated"),
      model: z
        .string()
        .default("dall-e-3")
        .describe(
          "The model to use for image generation. Required. (dall-e-2|dall-e-3)",
        ),
      count: z.number().default(1).describe("Number of images to generate"),
    })
    .required(),
  render: async function* ({
    prompt,
    count,
    model,
  }: {
    prompt: string;
    count: number;
    model: string;
  }) {
    yield <GenerativeImageSkeleton />;

    const images = (await imageGeneration(prompt, model, count)).images;

    return (
      <div>
        {images.map((image, index) => (
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
};
