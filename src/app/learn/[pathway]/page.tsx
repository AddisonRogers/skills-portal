import {checkPathwayValid, getRoadmap} from "@/db/repositories/roadmap";
import RoadmapInfoClient from "@/components/RoadmapInfoClient";
import {
  convertToSkillNodes,
  getSkillNodes,
} from "@/app/learn/[pathway]/serverFunctions";
import {getLinks} from "@/lib/tableClient";
import SkillsFlow from "@/components/skills-flow";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {EditButtons} from "@/app/learn/[pathway]/EditButtons";
import dagre from "@dagrejs/dagre";

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;


const getLayoutedElements = (nodes, edges, direction = "TB") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  if (edges !== undefined && edges.length > 0)
    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const newNode = {
      ...node,
      targetPosition: isHorizontal ? "left" : "top",
      sourcePosition: isHorizontal ? "right" : "bottom",
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };

    return newNode;
  });

  return { nodes: newNodes, edges };
};

// I am essentially using this as the loading page.
export default async function PathwayPage({
                                            params,
                                          }: {
  params: Promise<{ pathway: string }>;
}) {
  const pathway = (await params).pathway;

  // Fetch all needed data at once
  const [valid, skillNodes, links] = await Promise.all([
    //getRoadmap(pathway),
    checkPathwayValid(pathway),
    getSkillNodes(pathway),
    getLinks(pathway),
  ]);

  if (
    !valid ||
    skillNodes === null ||
    skillNodes === undefined ||
    skillNodes.size === 0
  ) {
    // Optionally render 404 or redirect
    return <div>Not found</div>;
  }

  const flowSkillNodes = await convertToSkillNodes(skillNodes);

  // Convert initialLinks to the format expected by ReactFlow
  const convertedEdges = links.map((link) => ({
    id: `${link.source}-${link.target}`,
    source: link.source,
    target: link.target,
    type: "default",
  }));

  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    flowSkillNodes,
    convertedEdges,
  );

  return (
    <div>
      <div className={"px-10 mt-4 flex flex-col gap-4"}>
        <div className={"flex justify-between items-center"}>
          <Breadcrumb className={"font-medium text-2xl"}>
            <BreadcrumbList className={"text-2xl "}>
              <BreadcrumbItem>
                <BreadcrumbLink href="/learn">Learn</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator/>
              <BreadcrumbItem>
                <BreadcrumbLink
                  className={"text-primary"}
                  href={`/learn/${pathway}`}
                >
                  {pathway}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <RoadmapInfoClient
          pathway={pathway}
          initialNodes={layoutedNodes}
          initialEdges={layoutedEdges}
        />
      </div>
    </div>
  );
}
