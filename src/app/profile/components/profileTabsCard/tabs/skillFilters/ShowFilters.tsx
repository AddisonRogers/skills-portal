"using client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export type ShowFilterOption = "All" | "Frontend" | "Backend" | "DevOps" | "Soft Skill";

type Props = {
    showFilter: ShowFilterOption;
    setShowFilter: (s: ShowFilterOption) => void;
};


export default function ShowFilters({showFilter, setShowFilter}: Props) {
    const toggle = () => {
        const next: ShowFilterOption = showFilter === "All" ? "Frontend" : showFilter === "Frontend" ? "Backend" : showFilter === "Backend" ? "DevOps" : showFilter === "DevOps" ? "Soft Skill" : "All";
        setShowFilter(next);
    };

    return(
        <Button
            onClick={toggle}
            className="gap-1 px-2 rounded-2xl mt-3 mb-1 ml-3 font-medium"
        >
            Show:<a className="font-bold">{showFilter}</a>
        </Button>
    );
}

export { ShowFilters };