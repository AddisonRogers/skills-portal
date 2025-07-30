"use client";

import {TripleToggle} from "@/components/ui/tripleToggleSwitch";
import {use, useState} from "react";
import {useUserInfo} from "@/hooks/useUserInfo";
import {changeSkillProgression, getSkillProgression} from "@/components/SkillProgressionSwitch/serverFunctions";
import {getSkillForUserEmailResult} from "@/db/repositories/skills";

export default function SkillProgressionSwitch({
                                                 skillName,
                                               }: {
  skillName: string;
}) {
  const options = [
    {value: "NotStarted", label: "Not Started"},
    {value: "Learning", label: "Learning"},
    {value: "Learned", label: "Learned"},
  ];

  let initalValue = "NotStarted";
  const skillProgression = use<getSkillForUserEmailResult[] | null>(getSkillProgression(skillName))
  if (skillProgression !== null && skillProgression.length > 0) {
    initalValue = options[skillProgression[0].level ?? 0].value;
  }

  const [value, setValue] = useState(initalValue);
  const {loggedIn} = useUserInfo();

  if (!loggedIn) {
    return null;
  }

  const onValueChange = (value: string) => {
    setValue(value);
    const numericalValue = options.findIndex((option) => option.value === value);
    changeSkillProgression(skillName, numericalValue);
  };

  return (
    <TripleToggle
      value={value}
      onValueChange={onValueChange}
      options={options}
    />
  );
}
