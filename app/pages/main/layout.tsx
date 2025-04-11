'use client'
import { Grid } from "@chakra-ui/react"
import Navbar from "@/app/components/navbar/Navbar";
import AuthGuard from "@/app/components/AuthGuard";


export default function MainPageLayout ({children}: {children: React.ReactNode}) {
    return (
        <AuthGuard>
            <Grid gap={2}>
                <Navbar />
                {children}
            </Grid>
        </AuthGuard>
    )
}