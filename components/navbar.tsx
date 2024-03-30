import React from "react";
import { Github } from "lucide-react";
import Image from "next/image";
export default function Navbar() {
    return (
        <div className="absolute w-[80%] mx-[10%] px-5 my-10 rounded-[10vw]  bg-gray-950 h-24 flex items-center justify-between text-2xl text-white ">
            <div>
                <Image src="/log2.png" width={150} height={150} alt="logo" />
            </div>
            <div>
                <Github size={40} color="white"> </Github>
            </div>
        </div>
    
        )}