'use client'
import { Grid, VStack } from "@chakra-ui/react"
import Navbar from "@/app/components/navbar/Navbar";
import AuthGuard from "@/app/components/AuthGuard";
import { CategoryFilterProvider } from "@/app/context/CategoryFilter";


export default function MainPageLayout ({children}: {children: React.ReactNode}) {
    return (
        <AuthGuard>
            <Grid gap={2} h='100vh' templateRows='auto 1fr'>
                <Navbar />
                <VStack bgColor='white' color='text-primary'>
                    <CategoryFilterProvider>
                        {children}
                    </CategoryFilterProvider>
                </VStack>
            </Grid>
        </AuthGuard>
    )
}