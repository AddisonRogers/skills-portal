"use client";

import { useState, useMemo, useEffect } from "react";
import { PersonWithAccount, searchPeopleBySkill } from "./serverFunctions";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, XCircle, ArrowUpDown, Search, Filter } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type SortField = "name" | "team" | "hasAccount" | "timeRemaining" | "xp";
type SortDirection = "asc" | "desc";

interface PeopleClientProps {
  initialPeople: PersonWithAccount[];
}

export default function PeopleClient({ initialPeople }: PeopleClientProps) {
  const [people, setPeople] = useState<PersonWithAccount[]>(initialPeople);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [skillFilter, setSkillFilter] = useState("");
  const [availableSkills, setAvailableSkills] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch available skills for filtering
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        // This would typically be a server action, but for simplicity we're mocking it
        // In a real implementation, you would fetch this from the server
        setAvailableSkills([
          "JavaScript", 
          "TypeScript", 
          "React", 
          "Next.js", 
          "Node.js", 
          "SQL", 
          "Python"
        ]);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, []);

  // Handle skill filter change
  useEffect(() => {
    const filterBySkill = async () => {
      if (!skillFilter) {
        setPeople(initialPeople);
        return;
      }

      setIsLoading(true);
      try {
        // In a real implementation, this would call the server function
        // For now, we'll simulate filtering by skill
        const filtered = await searchPeopleBySkill(skillFilter);
        setPeople(filtered.length > 0 ? filtered : initialPeople);
      } catch (error) {
        console.error("Error filtering by skill:", error);
        setPeople(initialPeople);
      } finally {
        setIsLoading(false);
      }
    };

    filterBySkill();
  }, [skillFilter, initialPeople]);

  // Filter and sort people
  const filteredAndSortedPeople = useMemo(() => {
    // First filter by search term
    let filtered = people.filter(person => {
      const searchLower = searchTerm.toLowerCase();
      return (
        person.name.toLowerCase().includes(searchLower) ||
        (person.team && person.team.toLowerCase().includes(searchLower)) ||
        person.email.toLowerCase().includes(searchLower)
      );
    });

    // Sort by selected field
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case "name": {
          comparison = a.name.localeCompare(b.name);
          break;
        }
        case "team": {
          const teamA = a.team || "";
          const teamB = b.team || "";
          comparison = teamA.localeCompare(teamB);
          break;
        }
        case "hasAccount": {
          comparison = Number(a.hasAccount) - Number(b.hasAccount);
          break;
        }
        case "timeRemaining": {
          const timeA = a.timeRemaining || 0;
          const timeB = b.timeRemaining || 0;
          comparison = timeA - timeB;
          break;
        }
        case "xp": {
          comparison = a.xp - b.xp;
          break;
        }
      }

      // Reverse if descending
      return sortDirection === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [people, searchTerm, sortField, sortDirection]);

  // Toggle sort direction or change sort field
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Format time remaining to hours and minutes
  const formatTimeRemaining = (hours?: number) => {
    if (hours === undefined) return "N/A";
    
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    
    if (wholeHours === 0) {
      return `${minutes}m`;
    } else if (minutes === 0) {
      return `${wholeHours}h`;
    } else {
      return `${wholeHours}h ${minutes}m`;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>People Directory</CardTitle>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, team, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8"
              />
            </div>
          </div>
          
          <div className="w-full sm:w-48">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {skillFilter || "Filter by Skill"}
                  <Filter className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-0" align="end">
                <div className="p-2">
                  <div className="space-y-2">
                    {availableSkills.map((skill) => (
                      <div key={skill} className="flex items-center">
                        <Button
                          variant={skillFilter === skill ? "default" : "ghost"}
                          className="w-full justify-start"
                          onClick={() => setSkillFilter(skillFilter === skill ? "" : skill)}
                        >
                          {skill}
                        </Button>
                      </div>
                    ))}
                    {skillFilter && (
                      <Button 
                        variant="outline" 
                        className="w-full mt-2"
                        onClick={() => setSkillFilter("")}
                      >
                        Clear Filter
                      </Button>
                    )}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="w-full sm:w-48">
            <Select
              value={sortField}
              onValueChange={(value) => setSortField(value as SortField)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="team">Team</SelectItem>
                <SelectItem value="hasAccount">Has Account</SelectItem>
                <SelectItem value="timeRemaining">Time Remaining</SelectItem>
                <SelectItem value="xp">XP</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button
            variant="outline"
            onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
            className="w-full sm:w-auto"
          >
            {sortDirection === "asc" ? "Ascending" : "Descending"}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px] cursor-pointer" onClick={() => handleSort("name")}>
                      Name {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("team")}>
                      Team {sortField === "team" && (sortDirection === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("hasAccount")}>
                      Has Account {sortField === "hasAccount" && (sortDirection === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("timeRemaining")}>
                      Time Remaining {sortField === "timeRemaining" && (sortDirection === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("xp")}>
                      XP {sortField === "xp" && (sortDirection === "asc" ? "↑" : "↓")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedPeople.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        {skillFilter ? (
                          <>No people found with the skill: <strong>{skillFilter}</strong></>
                        ) : (
                          <>No people found matching your search criteria.</>
                        )}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAndSortedPeople.map((person) => (
                      <TableRow key={person.id}>
                        <TableCell className="font-medium">{person.name}</TableCell>
                        <TableCell>{person.team || "—"}</TableCell>
                        <TableCell>
                          {person.hasAccount ? (
                            <Badge variant="success" className="bg-green-100 text-green-800 flex items-center w-fit">
                              <CheckCircle className="h-4 w-4 mr-1" /> Yes
                            </Badge>
                          ) : (
                            <Badge variant="destructive" className="bg-red-100 text-red-800 flex items-center w-fit">
                              <XCircle className="h-4 w-4 mr-1" /> No
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{formatTimeRemaining(person.timeRemaining)}</TableCell>
                        <TableCell>{person.xp}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Showing {filteredAndSortedPeople.length} of {initialPeople.length} people
              {skillFilter && <span> filtered by skill: <strong>{skillFilter}</strong></span>}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}