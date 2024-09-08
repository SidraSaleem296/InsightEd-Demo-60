// import * as fal from "@fal-ai/serverless-client";

// export async function falAiStableDiffusion3Medium(mentionTool: string, userMessage: string, streamable: any): Promise<string | undefined> {
//     const result = await fal.subscribe("fal-ai/stable-diffusion-v3-medium", {
//         input: {
//             prompt: userMessage,
//             sync_mode: true
//         },
//         logs: true,
//         onQueueUpdate: (update) => {
//             if (update.status === "IN_PROGRESS" && update.logs) {
//                 update.logs.map((log) => log.message).forEach(console.log);
//             }
//         },
//     });

//     if ((result as any).images && (result as any).images.length > 0) {
//         const imageUrl = (result as any).images[0].url;
//         const response = await fetch(imageUrl);
//         const buffer = await response.arrayBuffer();
//         let base64data = Buffer.from(buffer).toString('base64');
//         base64data = `data:image/png;base64,${base64data}`;
//         streamable.done({ 'falBase64Image': base64data });
//         return undefined;
//     } else {
//         streamable.done({ 'llmResponseEnd': true });
//         return undefined;
//     }
// }

import * as fal from "@fal-ai/serverless-client";

export async function falAiStableDiffusion3Medium(
    mentionTool: string,
    userMessage: string,
    streamable: any
): Promise<string | undefined> {
    try {
        // Subscribing to the FAL AI Stable Diffusion V3 Medium model
        const result = await fal.subscribe("fal-ai/stable-diffusion-v3-medium", {
            input: {
                prompt: userMessage, // User message serves as the prompt for the image generation
                sync_mode: true // Ensures synchronous mode for immediate result
            },
            logs: true, // Enable logging for process updates
            onQueueUpdate: (update) => {
                if (update.status === "IN_PROGRESS" && update.logs) {
                    // Log the process updates for debugging or tracking
                    update.logs.map((log) => log.message).forEach(console.log);
                }
            },
        });

        // Check if images were generated and process the first image
        if ((result as any).images && (result as any).images.length > 0) {
            const imageUrl = (result as any).images[0].url; // Get the URL of the generated image
            const response = await fetch(imageUrl); // Fetch the image
            const buffer = await response.arrayBuffer(); // Convert the image to an array buffer
            let base64data = Buffer.from(buffer).toString('base64'); // Convert the buffer to a base64 string
            base64data = `data:image/png;base64,${base64data}`; // Format the base64 string for use in a data URL

            // Send the base64 image data to the streamable output
            streamable.done({ 'falBase64Image': base64data });
            return undefined;
        } else {
            // If no images were generated, end the stream with no content
            streamable.done({ 'llmResponseEnd': true });
            return undefined;
        }
    } catch (error) {
        // Error handling
        console.error('Error in falAiStableDiffusion3Medium:', error);
        streamable.done({ 'llmResponseEnd': true });
        return undefined;
    }
}
