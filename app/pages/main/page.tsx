'use client'
import { Box, Container, Grid, Text, VStack } from "@chakra-ui/react"
import Navbar from "@/app/components/navbar/Navbar";
import AuthGuard from "@/app/components/AuthGuard";


const MainPage = () => {
    
    return (
        <AuthGuard>
            <Grid gap={2}>
                <Navbar />
            </Grid>
        </AuthGuard>

    )
}

export default MainPage
