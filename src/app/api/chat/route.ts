// import {
//   streamText, convertToCoreMessages,
//   type UIMessage,
// } from 'ai';
// import {createAzure} from '@ai-sdk/azure';
//
// // Allow streaming responses up to 30 seconds
// export const maxDuration = 30;
//
// // TODO Sort out mcp here
// // TODO sort out native tools here
//
// export async function POST(req: Request) {
//   const { messages }: { messages: UIMessage[] } = await req.json();
//
//   const azure = createAzure({
//     resourceName: process.env.AZURE_OPENAI_RESOURCE_NAME, // Azure resource name
//     apiKey: process.env.AZURE_OPENAI_API_KEY,
//   });
//
//   // const mcpClient = await createMCPClient({
//   //   transport: new StreamableHTTPClientTransport(new URL(process.env.MCP_ENDPOINT || "http://localhost:8080"), {
//   //   }),
//   // });
//   // const tools = await mcpClient.tools();
//   // for (const message of messages) {
//   //   console.debug(message.content)
//   // }
//
//   const result = streamText({
//     model: azure(process.env.AZURE_OPENAI_DEPLOYMENT_NAME || "gpt-4.1"),
//     messages: messages,
//     onError: async (error) => {
//       if (error !== undefined)
//         console.error(error)
//     }
//   });
//
// return result.toDataStreamResponse()
// }
