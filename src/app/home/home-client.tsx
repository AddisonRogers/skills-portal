"use client";
import { useState, useEffect } from "react";

export default function HomePage({ userRole }: { userRole: string }) {

    const [ isTechrole, setisTechrole ] = useState(false) 
    
    
    const techRoles = ["Graduate Engineer", "Junior Developer", "Software Engineer", "Senior Software Engineer", "Tech Lead", "Cloud Engineer", "Senior Cloud Engineer", "Data Engineer", "Senior Data Engineer", "AI Engineer", "Apprentice Cloud Engineer"]

    useEffect(() => {
        setisTechrole(techRoles.includes(userRole));
        console.log("this user is: ", isTechrole)
    }, [userRole, techRoles]);



    // checkUserRole( { userRole } )

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-semibold mb-6 text-primary">Hey, name</h1>
            {/* <h2>{userRole}</h2> */}


            <div className="grid grid-cols-3 gap-16">
                <div className="col-span-2 border border-[#9CA3AF] rounded-md"></div>

                { isTechrole &&
                <div className="flex flex-col col-span-1 border border-[#9CA3AF] min-w-64 h-64 p-5 rounded-md">
                    <h2 className="font-semibold mb-4 whitespace-nowrap">
                        Daily Code Challenge
                    </h2>
                    <div className="border border-[#9CA3AF] h-40 rounded-md mb-4"></div>
                    <input
                        type="text"
                        className="border border-[#9CA3AF] rounded-md px-4 py-1"
                        placeholder="Input your answer"
                    />
                </div> }
            </div>
        </div>
    );
}
