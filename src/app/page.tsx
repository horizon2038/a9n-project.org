import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className="container mx-auto px-4 py-4 text-center">
            <div className="text-8xl mt-20 font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 from- via-blue-500 via- to-indigo-800 to-">A9N Project</div>
            <div className="text-2xl py-4">
                <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 from- via-blue-500 via- to-indigo-400 to-">Next-generation Microkernel</span><br />
            </div>
            <div className="mt-5 text-xl text-center">
                Welcome to A9N Project Official Page. <br />
            </div>
        </div>

    );
}
