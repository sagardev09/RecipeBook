"use client"
import { Montserrat } from "next/font/google";
import "../app/globals.css";
import { usePathname } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalContextProvider } from "@/context/GlobalContext";
import Navbar from "@/app/_components/Navbar";

const inter = Montserrat({ subsets: ["latin"] });

export default function AppWrapper({ children }) {

    const pathname = usePathname()



    const pathsWithoutSidebar = ['/register', '/login'];

    const shouldRenderSidebar = !pathsWithoutSidebar.includes(pathname);




    return (
        <html lang="en">
            <body className={inter.className}>
                <ToastContainer />
                <GlobalContextProvider>
                    <div className=" gap-10 overflow-hidden">
                        {shouldRenderSidebar && (
                            <div>
                                <Navbar />
                            </div>
                        )}
                        <div>
                            {children}
                        </div>
                    </div>
                </GlobalContextProvider>
            </body>
        </html>
    );
}