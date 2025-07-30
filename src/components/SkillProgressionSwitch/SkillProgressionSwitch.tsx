"use client"

import {TripleToggle} from "@/components/ui/tripleToggleSwitch";
import {useState} from "react";
import {useUserInfo} from "@/hooks/useUserInfo";
import {changeSkillProgression} from "@/components/SkillProgressionSwitch/serverFunctions";


export default function SkillProgressionSwitch({skillName}: {skillName: string}) {
  const [value, setValue] = useState("NotStarted")
  const {loggedIn} = useUserInfo()

  console.debug(skillName)

  if (!loggedIn) {
    return null
  }

  const options =
    [
      {value: "NotStarted", label: "Not Started"},
      {value: "Learning", label: "Learning"},
      {value: "Learned", label: "Learned"}
    ]

  const onValueChange = (value: string) => {
    setValue(value)
    changeSkillProgression(value)
  }

  return (
    <TripleToggle
      value={value}
      onValueChange={onValueChange}
      options={options}
    />
  )
}