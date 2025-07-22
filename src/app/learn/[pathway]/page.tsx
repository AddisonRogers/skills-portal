"use client"

import {checkPathwayValid, getRoadmap, getSkillsOnRoadmap} from "@/db/repositories/roadmap";
import {getSkillsForRoadmapForUser} from "@/db/repositories/skills";
import {useUserInfo} from "@/hooks/useUserInfo";
import {getSkillNodes} from "@/app/learn/[pathway]/serverFunctions";
import {use} from "react";

export type PathwayPageProps = {
  pathway: string;
}

export default function pathwayPage({
                                      params,
                                    }: {
  params: Promise<PathwayPageProps>;
}) {
  const {loggedIn, user, userEmail, isAdmin} = useUserInfo()

  if (!loggedIn || !user || userEmail === null) {
    return null // TODO redirect to login
  }

  const pathway = use(params).pathway

  const roadmapInfo = getRoadmap(pathway);
  const data = getSkillsForRoadmapForUser(pathway, userEmail);


  console.debug("data: ", data)

  return (
    <RoadmapInfo pathway={pathway} roadmapInfoData={roadmapInfo} skillNodesData={data}/>
  )
}

function RoadmapInfo({
                       pathway,
                       roadmapInfoData,
                       skillNodesData,
                     }: {
  pathway: string;
  roadmapInfoData: Promise<any>;
  skillNodesData: Promise<any>;
}) {

  const skillNodes = use(skillNodesData)
  const roadmapInfo = use(roadmapInfoData)
  const valid = checkPathwayValid(pathway)

  if (!valid) {
    return null
  }

  return (
    <>
      <div>{pathway} Page</div>
      <div>{roadmapInfo}</div>
      <div>{skillNodes}</div>
    </>
  );
}