"use server"

// server wrapper to fetch data
import SkillProgressionSwitch from "@/components/SkillProgressionSwitch/SkillProgressionSwitch";
import {getSkillProgression} from "@/components/SkillProgressionSwitch/serverFunctions";
import { Suspense } from "react";

export default async function SkillProgressionSwitchWrapper({
                                                              skillName,
                                                            }: {
  skillName: string;
}) {

  const skillProgression = getSkillProgression(skillName);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SkillProgressionSwitch skillName={skillName} skillProgressionProp={skillProgression}/>
    </Suspense>
  )
}
