'use client'
import { Grid } from "@chakra-ui/react";
import Navbar from "./navbar/page";
import { SessionProvider } from "next-auth/react";
// import AuthGuard from "../components/AuthGuard";


export default function MainPageLayout ({ children} : {children: React.ReactNode}) {
    return (
        <SessionProvider>
            {/* <AuthGuard> */}
                <Grid templateColumns="auto, 1fr" color='text-primary'>
                    <Navbar />
                    {children}
                </Grid>
            {/* </AuthGuard> */}
        </SessionProvider>
    );
};
