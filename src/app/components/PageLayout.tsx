"use client";
import { CssVarsProvider, Sheet } from "@mui/joy";
import Head from "next/head";
import { useRouter } from "next/navigation";

export default function PageLayout({
    children,
    title="Home"
}: Readonly<{
    children: React.ReactNode;
    title?: string;
}>) {
    var router = useRouter();

    function showSearch() {
        router.push('/search');
    }
    return (
        <>
            <CssVarsProvider defaultMode="dark">
                <Sheet variant={'outlined'} sx={{height: '95vh', width: '95vw', padding: '10px', boxSizing: 'border-box', borderRadius: '12px'}} className={"flex flex-col align"}>
                    <Sheet sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', px: '10px', gap: '10px', width: 'calc(100% - 20px)', height: '50px', borderRadius: '12px'}} className={"nav"} variant="outlined">
                        <div className="nav-section hide-on-mobile">
                            <b>Movieslay</b> {title ? `| ${title}` : ""}
                        </div>
                        <div className="nav-section media-options">
                            <a onClick={()=>{router.push("/movie")}}><i className="fa-solid fa-camera-movie"></i> Movies</a>
                            <a onClick={()=>{router.push("/series")}}><i className="fa-solid fa-clapperboard"></i> Shows</a>
                            <a onClick={()=>{router.push("/search")}}><i className="fa-solid fa-magnifying-glass"></i> Search</a>
                        </div>
                        <div className="nav-section hide-on-mobile mini-options">
                            <a onClick={()=>{router.push("/")}}><i className="fa-solid fa-home"></i></a>
                        </div>
                    </Sheet>
                    <Sheet sx={{px: '10px', display: 'flex', flexDirection:'column', width: 'calc(100% - 20px)', height: 'calc(100% - 60px)', mt: '10px', borderRadius: '12px', overflowY: 'auto', scrollbarWidth: 'none'}} className={"content"} variant="outlined">
                        {children}
                    </Sheet>
                </Sheet>
            </CssVarsProvider>
        </>
    );
}