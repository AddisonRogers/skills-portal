import { generateText, type ToolSet } from "ai";
import { createAzure } from "@ai-sdk/azure";
import { experimental_createMCPClient as createMCPClient } from "ai";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const azure = createAzure({
	resourceName: process.env.NEXT_PUBLIC_AZURE_RESOURCE_NAME, // Azure resource name from env
	apiKey: process.env.NEXT_PUBLIC_AZURE_API_KEY, // Azure API key from env
});

const model = azure(<string>process.env.NEXT_PUBLIC_AZURE_MODEL_NAME);

export type GenerateTextWithAzureOptions = {
	prompt: string;
	handleError: (message: string) => void;
	mcpEndpoint?: string;
};

/**
 * Generates text using the Azure AI SDK.
 * @returns The generated text.
 * @param props
 */
export async function generateTextWithAzure(
	props: GenerateTextWithAzureOptions,
): Promise<string> {
	const { prompt, handleError, mcpEndpoint } = props;

	const url = new URL(
		mcpEndpoint || process.env.NEXT_PUBLIC_AZURE_MCP_ENDPOINT || "",
	);
	let mcpAvailable: boolean = false;

	try {
		await fetch(url);
		mcpAvailable = true;
		console.debug("MCP endpoint available");
	} catch {
		const errorMessage = "Error fetching MCP endpoint.";
		console.error(errorMessage);
		handleError(errorMessage);
	}

	try {
		let tools: ToolSet | undefined;
		let mcpClient: any; // Ignore Need to import the type MCPClient

		if (mcpAvailable) {
			console.debug("MCP endpoint available so using the tools");

			mcpClient = await createMCPClient({
				transport: new StreamableHTTPClientTransport(url, {
					sessionId: "",
				}),
			});

			tools = await mcpClient.tools();
		}

		const { text } = await generateText({
			model,
			tools,
			prompt,
		});
		console.log("Azure AI Response:", text); // Log the response

		if (mcpAvailable && mcpClient) {
			mcpClient.close();
		}

		return text;
	} catch (error) {
		const errorMessage = `Error generating text with Azure AI: ${error}`;
		console.error(errorMessage);
		handleError(errorMessage);
		throw error;
	}
}
