"use server"

import SkillProgressionSwitch from "@/components/SkillProgressionSwitch/SkillProgressionSwitch";

export default async function TripleToggleExample() {

  const skillName = "React";

  return (
    <SkillProgressionSwitch skillName={skillName}/>
  )
}