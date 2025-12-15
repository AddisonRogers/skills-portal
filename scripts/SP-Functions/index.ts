import {readdir} from "node:fs/promises";
import {s3, write, S3Client} from "bun";
import {loadConfig} from "./config.ts";
import {error} from "effect/Brand";
import {skill} from "../../src/db/schema.ts";


async function main() {
    // const config = loadConfig();
    // const s3Client = new S3Client({
    //     accessKeyId: config.s3AccessKeyId,
    //     secretAccessKey: config.s3SecretAccessKey,
    //     bucket: config.s3Bucket,
    //     region: config.s3Region
    // });
    //await listNodes();

    // uploadAllContent to s3
    // addAllSkillsToPostgres
    // addRoadmap


    const skills: skill[] = []


    try {
        const roadmapContent = await readdir(`/home/dotracc/Downloads/developer-roadmap/src/data/roadmaps/ai-agents/content/`);

        // I want to count all resources and group by domain
        for (const node of roadmapContent) {
            console.log(`Processing: ${node}`);

            const text = await Bun.file(`/home/dotracc/Downloads/developer-roadmap/src/data/roadmaps/ai-agents/content/${node}`).text()
            const parsed = parseSkill(text)

            console.log(parsed);

        }
    } catch (error) {
        console.error(error)
    }

    throw new Error("Not implemented yet")
    await Bun.sql.transaction(async () => {
        for (const skill of skills) {
            await addSkill(skill)
        }
    })

}


type Parsed = {
    name: string;
    description: string;
    links: string[];
};

function parseSkill(input: string): Parsed {
    const text = input.replace(/\r\n/g, "\n").trim();

    // 1) Tool name: first H1
    const nameMatch = text.match(/^#\s+(.+)\s*$/m);
    const toolName = nameMatch?.[1]?.trim() ?? "";

    // 2) Description: from after the heading to before "Visit the following resources..."
    const afterHeading = toolName
        ? text.slice(text.indexOf(nameMatch![0]) + nameMatch![0].length).trimStart()
        : text;

    const visitMarker = "Visit the following resources to learn more:";
    const visitIdx = afterHeading.indexOf(visitMarker);

    const descriptionBlock =
        visitIdx >= 0 ? afterHeading.slice(0, visitIdx).trim() : afterHeading.trim();

    // Collapse internal whitespace/newlines so description is one nice paragraph
    const description = descriptionBlock.replace(/\s*\n\s*/g, " ").trim();


    const linkRegex = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/g;
    const urls = Array.from(text.matchAll(linkRegex), (m) => m[0]);

    return {name: toolName, description, links: urls};
}

async function handleSkill(fileUrl: string, s3Client: S3Client) {
    Bun.file(fileUrl).text().then(async (data) => {
        // data is a markdown file

        const parsed = parseSkill(data)
        // upload to d1 s3 bucket
        const json = JSON.stringify({
            name: parsed.name,
            content: parsed.description,
            resources: parsed.links
        })
        const url = await uploadContentToS3({s3Client, title: parsed.name, content: json})

        // upload to postgres
        // add skill to postgres
        console.log(json);
    })
}

type addRoadmapParams = {
    roadmapName: string,
    description: string,
    relatedRoadmaps: string[],
}

async function addRoadmap(props: addRoadmapParams) {
    // add the roadmap to the "topic" table.
    // Bun sql
    /*
    name, description, related_roadmaps, viewable
     */
    Bun.sql(`INSERT INTO topic
                 (name, description, related_roadmaps, viewable)
             VALUES ('${props.roadmapName}', '${props.description}',
                     '${props.relatedRoadmaps.join(',')}', true)`)
}

type skill = {
    name: string,
    blobUrl: string,
    description: string,
    machineName: string
}

type uploadAllContentParams = {
    s3Client: S3Client,
    title: string,
    content: string,
}

async function uploadContentToS3(props: uploadAllContentParams): Promise<string> {
    const { s3Client, title, content } = props;
    await s3Client.write(`skills/${title}.json`, content);
}

async function addSkill(props: skill) {
    // This will upload the node as a skill into postgres + the respective
    /*
    name, blob_url, description, machine_name
     */
    Bun.sql(`INSERT INTO skill (name, blob_url, description, machine_name)
             VALUES ('${props.name}', '${props.blobUrl}', '${props.description}',
                     '${props.machineName}')`)
}

async function listAllResources() {
    try {
        const roadmapContent = await readdir(`./developer-roadmap/src/data/roadmaps/ai-agents/content/`);

        // I want to count all resources and group by domain

        const linksByDomain: Record<string, Set<string>> = {};
        const linkCounts: Record<string, number> = {};
        for (const node of roadmapContent) {
            console.log(`Processing: ${node}`);
            const nodeContent = Bun.file(`./developer-roadmap/src/data/roadmaps/ai-agents/content/${node}`);
            const nodeData = await nodeContent.text();


            const linkRegex = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/g;
            const urls = Array.from(nodeData.matchAll(linkRegex), (m) => m[0]);

            for (const url of urls) {
                // match[1] is URL from [@article@...](url), match[0] is plain URL
                try {
                    const urlObj = new URL(url);
                    const domain = urlObj.hostname;

                    if (!linksByDomain[domain]) {
                        linksByDomain[domain] = new Set();
                    }

                    linksByDomain[domain].add(url);
                    linkCounts[domain] = (linkCounts[domain] || 0) + 1;
                } catch (e) {
                    console.warn(`Invalid URL: ${url}`);
                }

            }
        }

        // Sort by count (descending)
        const sorted = Object.entries(linkCounts)
            .sort(([, a], [, b]) => b - a);

        console.log("\n=== Link Summary ===");
        console.log(`Total unique domains: ${Object.keys(linksByDomain).length}`);
        console.log("\nDomain breakdown:");

        for (const [domain, count] of sorted) {
            console.log(`${domain}: ${count} occurrences`);
        }

        // Optional: Find most common domains
        console.log("\n=== Most Common Domains ===");
        for (const [domain, count] of sorted.slice(0, 10)) {
            console.log(`${domain}: ${count}`);
        }

    } catch (error) {
        console.error("Error reading roadmap content:", error);
    }
}

async function listNodes() {
    try {
        const roadmapContent = await readdir(`./developer-roadmap/src/data/roadmaps/ai-agents/content/`);
        console.log(`There is ${roadmapContent.length} nodes in ai-agents roadmap`);

        for (const node of roadmapContent) {
            console.log(node);
        }
        console.log();
    } catch (error) {
        console.error("Error reading roadmap content:", error);
    }
}

async function listAllContentTypes() {
    try {
        const roadmaps = await readdir("./developer-roadmap/src/data/roadmaps/");
        for (const roadmap of roadmaps) {
            const roadmapContent = await readdir(`./developer-roadmap/src/data/roadmaps/${roadmap}/content/`);
            console.log(roadmapContent.length);
        }
    } catch (error) {
        console.error("Error reading roadmap content:", error);
    }
}

async function testingStuff() {
    // Open ./developer-roadmap/src/data/roadmaps/ai-agents
    // List through all json files names
    const foo = Bun.file("foo.txt"); // relative to cwd
    foo.size; // number of bytes
    foo.type; // MIME type


// read all the files in the current directory
    const files = await readdir(import.meta.dir);


// read all the files in the current directory, recursively
    const _files = await readdir("../", {recursive: true});


// Bun.s3 reads environment variables for credentials
// file() returns a lazy reference to a file on S3
    const metadata = s3.file("123.json");

// Download from S3 as JSON
    const data = await metadata.json();

// Upload to S3
    await write(metadata, JSON.stringify({name: "John", age: 30}));

// Presign a URL (synchronous - no network request needed)
    const url = metadata.presign({
        acl: "public-read",
        expiresIn: 60 * 60 * 24, // 1 day
    });


// Delete the file
    await metadata.delete();

}


main();