"use server"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {getAllSkills} from "@/db/repositories/skills";

export default async function SkillsManagement() {
  const skills = await getAllSkills()

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Skills Management</h2>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>All Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of all skills in the system</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Machine Name</TableHead>
                <TableHead>Big Skill</TableHead>
                <TableHead>XP Amount</TableHead>
                <TableHead>Made By</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {skills.map((skill) => (
                <TableRow key={skill.id}>
                  <TableCell>{skill.id}</TableCell>
                  <TableCell className="font-medium">{skill.name}</TableCell>
                  <TableCell>{skill.machineName || "-"}</TableCell>
                  <TableCell>{skill.bigSkill ? "Yes" : "No"}</TableCell>
                  <TableCell>{skill.xpAmount}</TableCell>
                  <TableCell>{skill.madeBy}</TableCell>
                  <TableCell>{skill.createdAt.toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
              {skills.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">No skills found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-4">Skill Details</h3>
        <p className="text-gray-500">Select a skill from the table to view its details</p>
        
        {/* In a future enhancement, we could add a form here to view and edit skill details */}
      </div>
    </div>
  );
}