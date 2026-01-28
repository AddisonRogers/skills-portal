import { useQuery } from "@tanstack/react-query";
import { fetchYourProjects } from "./project.api";

export function useYourProjects() {
    return useQuery({
        queryKey: ["projects", "your"],
        queryFn: fetchYourProjects,
    });
}