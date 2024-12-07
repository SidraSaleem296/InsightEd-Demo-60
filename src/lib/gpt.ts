// import { Configuration, OpenAI } from "openai";

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAI(configuration);

// interface OutputFormat {
//   [key: string]: string | string[] | OutputFormat;
// }

// export async function strict_output(
//   system_prompt: string,
//   user_prompt: string | string[],
//   output_format: OutputFormat,
//   default_category: string = "",
//   output_value_only: boolean = false,
//   model: string = "gpt-3.5-turbo",
//   temperature: number = 1,
//   num_tries: number = 3,
//   verbose: boolean = false
// ) {
//   // if the user input is in a list, we also process the output as a list of json
//   const list_input: boolean = Array.isArray(user_prompt);
//   // if the output format contains dynamic elements of < or >, then add to the prompt to handle dynamic elements
//   const dynamic_elements: boolean = /<.*?>/.test(JSON.stringify(output_format));
//   // if the output format contains list elements of [ or ], then we add to the prompt to handle lists
//   const list_output: boolean = /\[.*?\]/.test(JSON.stringify(output_format));

//   // start off with no error message
//   let error_msg: string = "";

//   for (let i = 0; i < num_tries; i++) {
//     let output_format_prompt: string = `\nYou are to output ${
//       list_output && "an array of objects in"
//     } the following in json format: ${JSON.stringify(
//       output_format
//     )}. \nDo not put quotation marks or escape character \\ in the output fields.`;

//     if (list_output) {
//       output_format_prompt += `\nIf output field is a list, classify output into the best element of the list.`;
//     }

//     // if output_format contains dynamic elements, process it accordingly
//     if (dynamic_elements) {
//       output_format_prompt += `\nAny text enclosed by < and > indicates you must generate content to replace it. Example input: Go to <location>, Example output: Go to the garden\nAny output key containing < and > indicates you must generate the key name to replace it. Example input: {'<location>': 'description of location'}, Example output: {school: a place for education}`;
//     }

//     // if input is in a list format, ask it to generate json in a list
//     if (list_input) {
//       output_format_prompt += `\nGenerate an array of json, one json for each input element.`;
//     }

//     // Use OpenAI to get a response
//     const response = await openai.createChatCompletion({
//       temperature: temperature,
//       model: model,
//       messages: [
//         {
//           role: "system",
//           content: system_prompt + output_format_prompt + error_msg,
//         },
//         { role: "user", content: user_prompt.toString() },
//       ],
//     });

//     let res: string =
//       response.data.choices[0].message?.content?.replace(/'/g, '"') ?? "";

//     // ensure that we don't replace away apostrophes in text
//     res = res.replace(/(\w)"(\w)/g, "$1'$2");

//     if (verbose) {
//       console.log(
//         "System prompt:",
//         system_prompt + output_format_prompt + error_msg
//       );
//       console.log("\nUser prompt:", user_prompt);
//       console.log("\nGPT response:", res);
//     }

//     // try-catch block to ensure output format is adhered to
//     try {
//       let output: any = JSON.parse(res);

//       if (list_input) {
//         if (!Array.isArray(output)) {
//           throw new Error("Output format not in an array of json");
//         }
//       } else {
//         output = [output];
//       }

//       // check for each element in the output_list, the format is correctly adhered to
//       for (let index = 0; index < output.length; index++) {
//         for (const key in output_format) {
//           // unable to ensure accuracy of dynamic output header, so skip it
//           if (/<.*?>/.test(key)) {
//             continue;
//           }

//           // if output field missing, raise an error
//           if (!(key in output[index])) {
//             throw new Error(`${key} not in json output`);
//           }

//           // check that one of the choices given for the list of words is an unknown
//           if (Array.isArray(output_format[key])) {
//             const choices = output_format[key] as string[];
//             // ensure output is not a list
//             if (Array.isArray(output[index][key])) {
//               output[index][key] = output[index][key][0];
//             }
//             // output the default category (if any) if GPT is unable to identify the category
//             if (!choices.includes(output[index][key]) && default_category) {
//               output[index][key] = default_category;
//             }
//             // if the output is a description format, get only the label
//             if (output[index][key].includes(":")) {
//               output[index][key] = output[index][key].split(":")[0];
//             }
//           }
//         }

//         // if we just want the values for the outputs
//         if (output_value_only) {
//           output[index] = Object.values(output[index]);
//           // just output without the list if there is only one element
//           if (output[index].length === 1) {
//             output[index] = output[index][0];
//           }
//         }
//       }

//       return list_input ? output : output[0];
//     } catch (e) {
//       error_msg = `\n\nResult: ${res}\n\nError message: ${e}`;
//       console.log("An exception occurred:", e);
//       console.log("Current invalid json format ", res);
//     }
//   }

//   return [];
// }

// import OpenAI from "openai";

// // Initialize OpenAI with API key
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY as string,
// });

// interface OutputFormat {
//   [key: string]: string | string[] | OutputFormat;
// }

// export async function strict_output(
//   system_prompt: string,
//   user_prompt: string | string[],
//   output_format: OutputFormat,
//   default_category: string = "",
//   output_value_only: boolean = false,
//   model: string = "gpt-3.5-turbo",
//   temperature: number = 1,
//   num_tries: number = 3,
//   verbose: boolean = false
// ) {
//   const list_input = Array.isArray(user_prompt);
//   const dynamic_elements = /<.*?>/.test(JSON.stringify(output_format));
//   const list_output = /\[.*?\]/.test(JSON.stringify(output_format));

//   let error_msg = "";

//   for (let i = 0; i < num_tries; i++) {
//     let output_format_prompt = `\nYou are to output ${
//       list_output ? "an array of objects in" : ""
//     } the following in json format: ${JSON.stringify(output_format)}. \nDo not put quotation marks or escape character \\ in the output fields.`;

//     if (list_output) {
//       output_format_prompt += `\nIf output field is a list, classify output into the best element of the list.`;
//     }

//     if (dynamic_elements) {
//       output_format_prompt += `\nAny text enclosed by < and > indicates you must generate content to replace it. Example input: Go to <location>, Example output: Go to the garden\nAny output key containing < and > indicates you must generate the key name to replace it. Example input: {'<location>': 'description of location'}, Example output: {school: a place for education}`;
//     }

//     if (list_input) {
//       output_format_prompt += `\nGenerate an array of json, one json for each input element.`;
//     }

//     // Use OpenAI to get a response
//     const response = await openai.completions.create({
//       model: model,
//       prompt: system_prompt + output_format_prompt + error_msg + "\n" + user_prompt.toString(),
//       temperature: temperature,
//       max_tokens: 150, // Adjust max_tokens based on your needs
//     });

//     let res = response.choices[0]?.text?.replace(/'/g, '"') ?? "";

//     res = res.replace(/(\w)"(\w)/g, "$1'$2");

//     if (verbose) {
//       console.log("System prompt:", system_prompt + output_format_prompt + error_msg);
//       console.log("\nUser prompt:", user_prompt);
//       console.log("\nGPT response:", res);
//     }

//     try {
//       let output: any = JSON.parse(res);

//       if (list_input) {
//         if (!Array.isArray(output)) {
//           throw new Error("Output format not in an array of json");
//         }
//       } else {
//         output = [output];
//       }

//       for (let index = 0; index < output.length; index++) {
//         for (const key in output_format) {
//           if (/<.*?>/.test(key)) {
//             continue;
//           }

//           if (!(key in output[index])) {
//             throw new Error(`${key} not in json output`);
//           }

//           if (Array.isArray(output_format[key])) {
//             const choices = output_format[key] as string[];
//             if (Array.isArray(output[index][key])) {
//               output[index][key] = output[index][key][0];
//             }
//             if (!choices.includes(output[index][key]) && default_category) {
//               output[index][key] = default_category;
//             }
//             if (output[index][key].includes(":")) {
//               output[index][key] = output[index][key].split(":")[0];
//             }
//           }
//         }

//         if (output_value_only) {
//           output[index] = Object.values(output[index]);
//           if (output[index].length === 1) {
//             output[index] = output[index][0];
//           }
//         }
//       }

//       return list_input ? output : output[0];
//     } catch (e) {
//       error_msg = `\n\nResult: ${res}\n\nError message: ${e}`;
//       console.log("An exception occurred:", e);
//       console.log("Current invalid json format ", res);
//     }
//   }

//   return [];
// }


// 2 sep night

import { s } from "node_modules/@upstash/redis/zmscore-uDFFyCiZ.mjs";
import { OpenAI } from "openai";

// Initialize OpenAI with your API key
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY as string });

interface OutputFormat {
  [key: string]: string | string[] | OutputFormat;
}

// First version of strict_output
export async function strict_output(
  system_prompt: string,
  user_prompt: string | string[],
  output_format: OutputFormat,
  default_category: string = "",
  output_value_only: boolean = false,
  model: string = "gpt-3.5-turbo",
  temperature: number = 1,
  num_tries: number = 3,
  verbose: boolean = false
): Promise<
  {
    question: string;
    answer: string;
  }[]
> {
  const list_input: boolean = Array.isArray(user_prompt);
  const dynamic_elements: boolean = /<.*?>/.test(JSON.stringify(output_format));
  const list_output: boolean = /\[.*?\]/.test(JSON.stringify(output_format));

  let error_msg: string = "";

  for (let i = 0; i < num_tries; i++) {
    let output_format_prompt: string = `\nYou are to output the following in json format: ${JSON.stringify(
      output_format
    )}. \nDo not put quotation marks or escape character \\ in the output fields.`;

    if (list_output) {
      output_format_prompt += `\nIf output field is a list, classify output into the best element of the list.`;
    }

    if (dynamic_elements) {
      output_format_prompt += `\nAny text enclosed by < and > indicates you must generate content to replace it. Example input: Go to <location>, Example output: Go to the garden\nAny output key containing < and > indicates you must generate the key name to replace it. Example input: {'<location>': 'description of location'}, Example output: {school: a place for education}`;
    }

    if (list_input) {
      output_format_prompt += `\nGenerate a list of json, one json for each input element.`;
    }

    // Use OpenAI to get a response
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: system_prompt + output_format_prompt + error_msg,
        },
        { role: "user", content: user_prompt.toString() },
      ],
      model: model,
      temperature: temperature,
    });

    let res: string =
      response.choices[0].message?.content?.replace(/'/g, '"') ?? "";

    res = res.replace(/(\w)"(\w)/g, "$1'$2");

    if (verbose) {
      console.log(
        "System prompt:",
        system_prompt + output_format_prompt + error_msg
      );
      console.log("\nUser prompt:", user_prompt);
      console.log("\nGPT response:", res);
    }

    try {
      let output: any = JSON.parse(res);

      if (list_input) {
        if (!Array.isArray(output)) {
          throw new Error("Output format not in a list of json");
        }
      } else {
        output = [output];
      }

      for (let index = 0; index < output.length; index++) {
        for (const key in output_format) {
          if (/<.*?>/.test(key)) {
            continue;
          }

          if (!(key in output[index])) {
            throw new Error(`${key} not in json output`);
          }

          if (Array.isArray(output_format[key])) {
            const choices = output_format[key] as string[];
            if (Array.isArray(output[index][key])) {
              output[index][key] = output[index][key][0];
            }
            if (!choices.includes(output[index][key]) && default_category) {
              output[index][key] = default_category;
            }
            if (output[index][key].includes(":")) {
              output[index][key] = output[index][key].split(":")[0];
            }
          }
        }

        if (output_value_only) {
          output[index] = Object.values(output[index]);
          if (output[index].length === 1) {
            output[index] = output[index][0];
          }
        }
      }

      return list_input ? output : output[0];
    } catch (e) {
      error_msg = `\n\nResult: ${res}\n\nError message: ${e}`;
      console.log("An exception occurred:", e);
      console.log("Current invalid json format:", res);
    }
  }

  return [];
}

// Second version of strict_output

export async function strict_output_v2(
  system_prompt: string,
  user_prompt: string | string[],
  output_format: OutputFormat,
  default_category: string = "",
  output_value_only: boolean = false,
  model: string = "gpt-3.5-turbo",
  temperature: number = 1,
  num_tries: number = 3,
  verbose: boolean = true
) {
  // if the user input is in a list, we also process the output as a list of json
  const list_input: boolean = Array.isArray(user_prompt);
  // if the output format contains dynamic elements of < or >, then add to the prompt to handle dynamic elements
  const dynamic_elements: boolean = /<.*?>/.test(JSON.stringify(output_format));
  // if the output format contains list elements of [ or ], then we add to the prompt to handle lists
  const list_output: boolean = /\[.*?\]/.test(JSON.stringify(output_format));

  // start off with no error message
  let error_msg: string = "";

  for (let i = 0; i < num_tries; i++) {
    let output_format_prompt: string = `\nYou are to output ${
      list_output ? "an array of objects in" : ""
    } the following in JSON format: ${JSON.stringify(
      output_format
    )}. Ensure that all keys and string values are enclosed in double quotes. Do not put escape characters (\\) in the output fields.`;

    if (list_output) {
      output_format_prompt += `\nIf output field is a list, classify output into the best element of the list.`;
    }

    // if output_format contains dynamic elements, process it accordingly
    if (dynamic_elements) {
      output_format_prompt += `\nAny text enclosed by < and > indicates you must generate content to replace it. Example input: Go to <location>, Example output: Go to the garden\nAny output key containing < and > indicates you must generate the key name to replace it. Example input: {'<location>': 'description of location'}, Example output: {school: a place for education}`;
    }

    // if input is in a list format, ask it to generate JSON in a list
    if (list_input) {
      output_format_prompt += `\nGenerate an array of JSON, one JSON for each input element.`;
    }

    // Use OpenAI to get a response
    const response = await openai.chat.completions.create({
      temperature: temperature,
      model: model,
      messages: [
        {
          role: "system",
          content: system_prompt + output_format_prompt + error_msg,
        },
        { role: "user", content: user_prompt.toString() },
      ],
    });

    let res: string =
      response.choices[0].message?.content?.replace(/'/g, '"') ?? "";

    // ensure that we don't replace away apostrophes in text
    res = res.replace(/(\w)"(\w)/g, "$1'$2");

    if (verbose) {
      console.log(
        "System prompt:",
        system_prompt + output_format_prompt + error_msg
      );
      console.log("\nUser prompt:", user_prompt);
      console.log("\nGPT response:", res);
    }

    // try-catch block to ensure output format is adhered to
    try {
      let output: any = JSON.parse(res);

      if (list_input) {
        if (!Array.isArray(output)) {
          throw new Error("Output format not in an array of JSON");
        }
      } else {
        output = [output];
      }

      // check for each element in the output_list, the format is correctly adhered to
      for (let index = 0; index < output.length; index++) {
        for (const key in output_format) {
          // unable to ensure accuracy of dynamic output header, so skip it
          if (/<.*?>/.test(key)) {
            continue;
          }

          // if output field missing, raise an error
          if (!(key in output[index])) {
            throw new Error(`${key} not in JSON output`);
          }

          // check that one of the choices given for the list of words is an unknown
          if (Array.isArray(output_format[key])) {
            const choices = output_format[key] as string[];
            // ensure output is not a list
            if (Array.isArray(output[index][key])) {
              output[index][key] = output[index][key][0];
            }
            // output the default category (if any) if GPT is unable to identify the category
            if (!choices.includes(output[index][key]) && default_category) {
              output[index][key] = default_category;
            }
            // if the output is a description format, get only the label
            if (output[index][key].includes(":")) {
              output[index][key] = output[index][key].split(":")[0];
            }
          }
        }

        // if we just want the values for the outputs
        if (output_value_only) {
          output[index] = Object.values(output[index]);
          // just output without the list if there is only one element
          if (output[index].length === 1) {
            output[index] = output[index][0];
          }
        }
      }

      return list_input ? output : output[0];
    } catch (e) {
      error_msg = `\n\nResult: ${res}\n\nError message: ${e}`;
      console.log("An exception occurred:", e);
      console.log("Current invalid JSON format:", res);
    }
  }

  return [];
}

// export async function strict_output_v3(
//   system_prompt: string,
//   user_prompt: string | string[],
//   output_format: OutputFormat,
//   course_keywords: string[],  // Keywords related to the course
//   default_category: string = "",
//   output_value_only: boolean = false,
//   model: string = "gpt-3.5-turbo",
//   temperature: number = 1,
//   num_tries: number = 3,
//   verbose: boolean = false
// ) {
//   // Check if the user prompt is related to the course content
//   const isCourseRelated = (prompt: string) => {
//     return course_keywords.some(keyword => prompt.toLowerCase().includes(keyword.toLowerCase()));
//   };

//   const list_input: boolean = Array.isArray(user_prompt);
//   const dynamic_elements: boolean = /<.*?>/.test(JSON.stringify(output_format));
//   const list_output: boolean = /\[.*?\]/.test(JSON.stringify(output_format));

//   let error_msg: string = "";

//   for (let i = 0; i < num_tries; i++) {
//     let output_format_prompt: string = `\nYou are to output the following in JSON format: ${JSON.stringify(
//       output_format
//     )}. \nDo not put quotation marks or escape character \\ in the output fields.`;

//     if (list_output) {
//       output_format_prompt += `\nIf output field is a list, classify output into the best element of the list.`;
//     }

//     if (dynamic_elements) {
//       output_format_prompt += `\nAny text enclosed by < and > indicates you must generate content to replace it. Example input: Go to <location>, Example output: Go to the garden\nAny output key containing < and > indicates you must generate the key name to replace it. Example input: {'<location>': 'description of location'}, Example output: {school: a place for education}`;
//     }

//     if (list_input) {
//       output_format_prompt += `\nGenerate a list of json, one json for each input element.`;
//     }

//     // Check if the user's prompt is related to the course
//     const userPromptString = Array.isArray(user_prompt) ? user_prompt.join(" ") : user_prompt;
//     if (!isCourseRelated(userPromptString)) {
//       return {
//         question: userPromptString,
//         answer: "Sorry, that question is out of my domain. Please ask questions related to the course."
//       };
//     }

//     // Use OpenAI to get a response
//     const response = await openai.chat.completions.create({
//       messages: [
//         {
//           role: "system",
//           content: system_prompt + output_format_prompt + error_msg,
//         },
//         { role: "user", content: user_prompt.toString() },
//       ],
//       model: model,
//       temperature: temperature,
//     });

//     let res: string =
//       response.choices[0].message?.content?.replace(/'/g, '"') ?? "";

//     res = res.replace(/(\w)"(\w)/g, "$1'$2");

//     if (verbose) {
//       console.log(
//         "System prompt:",
//         system_prompt + output_format_prompt + error_msg
//       );
//       console.log("\nUser prompt:", user_prompt);
//       console.log("\nGPT response:", res);
//     }

//     try {
//       let output: any = JSON.parse(res);

//       if (list_input) {
//         if (!Array.isArray(output)) {
//           throw new Error("Output format not in a list of json");
//         }
//       } else {
//         output = [output];
//       }

//       for (let index = 0; index < output.length; index++) {
//         for (const key in output_format) {
//           if (/<.*?>/.test(key)) {
//             continue;
//           }

//           if (!(key in output[index])) {
//             throw new Error(`${key} not in json output`);
//           }

//           if (Array.isArray(output_format[key])) {
//             const choices = output_format[key] as string[];
//             if (Array.isArray(output[index][key])) {
//               output[index][key] = output[index][key][0];
//             }
//             if (!choices.includes(output[index][key]) && default_category) {
//               output[index][key] = default_category;
//             }
//             if (output[index][key].includes(":")) {
//               output[index][key] = output[index][key].split(":")[0];
//             }
//           }
//         }

//         if (output_value_only) {
//           output[index] = Object.values(output[index]);
//           if (output[index].length === 1) {
//             output[index] = output[index][0];
//           }
//         }
//       }

//       return list_input ? output : output[0];
//     } catch (e) {
//       error_msg = `\n\nResult: ${res}\n\nError message: ${e}`;
//       console.log("An exception occurred:", e);
//       console.log("Current invalid json format:", res);
//     }
//   }

//   return [];
// }

// export async function strict_output_v3(
//   system_prompt: string,
//   user_prompt: string | string[],
//   output_format: OutputFormat,
//   courseName: string,  // The course name to guide the domain-specific response
//   default_category: string = "",
//   output_value_only: boolean = false,
//   model: string = "gpt-3.5-turbo",
//   temperature: number = 1,
//   num_tries: number = 3,
//   verbose: boolean = false
// ) {
//   const list_input: boolean = Array.isArray(user_prompt);
//   const dynamic_elements: boolean = /<.*?>/.test(JSON.stringify(output_format));
//   const list_output: boolean = /\[.*?\]/.test(JSON.stringify(output_format));

//   let error_msg: string = "";

//   // Join user prompt if it is an array
//   const userPromptString = Array.isArray(user_prompt) ? user_prompt.join(" ") : user_prompt;

//   // Create the prompt for OpenAI to decide if the question is related to the course
//   const fullPrompt = `
//     You are a chatbot trained on the course content of "${courseName}". 
//     You are required to answer questions only related to the content of this course. 
//     If the question is related to this course, provide the relevant answer. 
//     If the question is unrelated to the course, respond with: "Sorry, that question is out of the domain of ${courseName}. Please ask questions related to the course content."
    
//     Question: ${userPromptString}
//   `;

//   // Request response from OpenAI
//   for (let i = 0; i < num_tries; i++) {
//     try {
//       // Call OpenAI with the full prompt
//       const response = await openai.chat.completions.create({
//         model: model,
//         messages: [
//           { role: "system", content: system_prompt + ` You are a chatbot for the course: ${courseName}. Answer questions only related to this course's content.` },
//           { role: "user", content: fullPrompt },
//         ],
//         temperature: temperature,
//       });

//       let res: string = response.choices[0].message?.content?.replace(/'/g, '"') ?? "";

//       // Clean and format the response
//       res = formatResponse(res);

//       if (verbose) {
//         console.log("System prompt:", system_prompt);
//         console.log("\nUser prompt:", user_prompt);
//         console.log("\nGPT response:", res);
//       }

//       // Return the result to the user, with "Response:" prepended
//       return {
//         question: userPromptString,
//         answer: `Response:\n<p>${res}</p>`,
//       };

//     } catch (e) {
//       error_msg = `\n\nError occurred during OpenAI API request: ${e}`;
//       console.log("An exception occurred:", e);
//     }
//   }

//   return {
//     question: userPromptString,
//     answer: `Error: Failed to generate a valid response after ${num_tries} attempts. ${error_msg}`,
//   };
// }

// function formatResponse(response: string): string {
//   // Bold formatting: **bold**
//   response = response.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
  
//   // Italics formatting: *italic*
//   response = response.replace(/\*(.*?)\*/g, "<i>$1</i>");
  
//   // Code formatting: `code`
//   response = response.replace(/`(.*?)`/g, "<code>$1</code>");
  
//   // Strikethrough formatting: ~~strikethrough~~
//   response = response.replace(/~~(.*?)~~/g, "<del>$1</del>");
  
//   // Links: [text](url)
//   response = response.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
  
//   // Lists: ordered and unordered
//   // Unordered list: - item or * item
//   response = response.replace(/^[\*\-\+]\s+(.+)/gm, "<ul><li>$1</li></ul>");
  
//   // Ordered list: 1. item
//   response = response.replace(/^\d+\.\s+(.+)/gm, "<ol><li>$1</li></ol>");
  
//   // Blockquotes: > text
//   response = response.replace(/^>\s*(.+)/gm, "<blockquote>$1</blockquote>");
  
//   // Headers: # Header1, ## Header2, ### Header3, etc.
//   response = response.replace(/^#{1,6}\s*(.+)/gm, (match, p1) => {
//     const level = match.indexOf(p1);
//     return `<h${level + 1}>${p1}</h${level + 1}>`;
//   });

//   // Paragraphs
//   response = response.replace(/\n{2,}/g, "</p><p>");
  
//   return response;
// }


export async function strict_output_v3(
  system_prompt: string,
  user_prompt: string | string[],
  output_format: OutputFormat,
  courseName: string,  // The course name to guide the domain-specific response
  default_category: string = "",
  output_value_only: boolean = false,
  model: string = "gpt-3.5-turbo",
  temperature: number = 1,
  num_tries: number = 3,
  verbose: boolean = false
) {
  const list_input: boolean = Array.isArray(user_prompt);
  const dynamic_elements: boolean = /<.*?>/.test(JSON.stringify(output_format));
  const list_output: boolean = /\[.*?\]/.test(JSON.stringify(output_format));

  let error_msg: string = "";

  // Join user prompt if it is an array
  const userPromptString = Array.isArray(user_prompt) ? user_prompt.join(" ") : user_prompt;

  // Create the prompt for OpenAI to decide if the question is related to the course
  const fullPrompt = `
    You are a chatbot trained on the course content of "${courseName}". 
    You are required to answer questions only related to the content of this course. 
    If the question is related to this course, provide the relevant answer. 
    If the question is unrelated to the course, respond with: "Sorry, that question is out of the domain of ${courseName}. Please ask questions related to the course content."
    
    Question: ${userPromptString}
  `;

  // Request response from OpenAI
  for (let i = 0; i < num_tries; i++) {
    try {
      // Call OpenAI with the full prompt
      const response = await openai.chat.completions.create({
        model: model,
        messages: [
          { role: "system", content: system_prompt + ` You are a chatbot for the course: ${courseName}. Answer questions only related to this course's content.` },
          { role: "user", content: fullPrompt },
        ],
        temperature: temperature,
      });

      let res: string = response.choices[0].message?.content?.replace(/'/g, '"') ?? "";

      // Clean and format the response
      res = formatResponse(res);

      if (verbose) {
        console.log("System prompt:", system_prompt);
        console.log("\nUser prompt:", user_prompt);
        console.log("\nGPT response:", res);
      }

      // Return the result to the user, with "Response:" prepended only once
      return {
        question: userPromptString,
        answer: `Response:\n${res}`, // Directly appending without extra <p> tags
      };

    } catch (e) {
      error_msg = `\n\nError occurred during OpenAI API request: ${e}`;
      console.log("An exception occurred:", e);
    }
  }

  return {
    question: userPromptString,
    answer: `Error: Failed to generate a valid response after ${num_tries} attempts. ${error_msg}`,
  };
}

function formatResponse(response: string): string {
  // Bold formatting: **bold**
  response = response.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
  
  // Italics formatting: *italic*
  response = response.replace(/\*(.*?)\*/g, "<i>$1</i>");
  
  // Code formatting: `code`
  response = response.replace(/`(.*?)`/g, "<code>$1</code>");
  
  // Strikethrough formatting: ~~strikethrough~~
  response = response.replace(/~~(.*?)~~/g, "<del>$1</del>");
  
  // Links: [text](url)
  response = response.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
  
  // Lists: ordered and unordered
  // Unordered list: - item or * item
  response = response.replace(/^[\*\-\+]\s+(.+)/gm, "<ul><li>$1</li></ul>");
  
  // Ordered list: 1. item
  response = response.replace(/^\d+\.\s+(.+)/gm, "<ol><li>$1</li></ol>");
  
  // Blockquotes: > text
  response = response.replace(/^>\s*(.+)/gm, "<blockquote>$1</blockquote>");
  
  // Headers: # Header1, ## Header2, ### Header3, etc.
  response = response.replace(/^#{1,6}\s*(.+)/gm, (match, p1) => {
    const level = match.indexOf(p1);
    return `<h${level + 1}>${p1}</h${level + 1}>`;
  });

  // Paragraphs
  response = response.replace(/\n{2,}/g, "</p><p>");
  
  return response;
}
