import { BlobClient, BlobServiceClient } from "@azure/storage-blob";

export function parseAzureBlobUrl(url: string): {
	containerName: string;
	blobName: string;
} {
	const urlObj = new URL(url);
	// e.g. path = "/skills/skills/basic-backend-development%3AVPI89s-m885r2YrXjYxdd.json"
	const parts = urlObj.pathname.replace(/^\/+/, "").split("/");
	const containerName = parts.shift()!; // "skills" (container)
	const blobName = decodeURIComponent(parts.join("/")); // "skills/basic-backend-development:VPI89s-m885r2YrXjYxdd.json"

	return { containerName, blobName };
}

/**
 * Fetch the data from a blob URL (SAS or public URL).
 * Returns the blob as a string.
 */
export async function fetchBlobFromUrl(url: string): Promise<string> {
	const blobClient = new BlobClient(url);
	const downloadBlockBlobResponse = await blobClient.download();
	const downloaded = await streamToString(
		downloadBlockBlobResponse.readableStreamBody,
	);
	return downloaded;
}

// Helper: ReadableStream to string
function streamToString(
	readableStream: NodeJS.ReadableStream | null,
): Promise<string> {
	if (!readableStream) return Promise.resolve("");
	return new Promise((resolve, reject) => {
		const chunks: Buffer[] = [];
		readableStream.on("data", (data) => chunks.push(Buffer.from(data)));
		readableStream.on("end", () =>
			resolve(Buffer.concat(chunks).toString("utf8")),
		);
		readableStream.on("error", reject);
	});
}

/**
 * Fetch blob content as a string using credentials.
 * @param blobUrl
 */
export async function fetchBlob(blobUrl: string): Promise<string> {
	console.debug(`Fetching blob ${blobUrl}`);

	const { containerName, blobName } = parseAzureBlobUrl(blobUrl);

	const serviceClient = BlobServiceClient.fromConnectionString(
		process.env.AZURE_STORAGE_CONNECTION_STRING!,
	);

	console.debug(`Blob ${blobName}`);
	const containerClient = serviceClient.getContainerClient("skills");
	const blobClient = containerClient.getBlobClient(blobName);

	const downloadBlockBlobResponse = await blobClient.download();

	return streamToString(downloadBlockBlobResponse.readableStreamBody);
}
