'use client'
import { Grid, Stack } from "@chakra-ui/react"
import AuthGuard from "@/app/components/AuthGuard";
import { CategoryFilterProvider } from "@/app/context/CategoryFilter";
import { SalaryCurrencyProvider } from "@/app/context/SalaryCurrency";
import Navbar from "./navbar/page";


export default function MainPageLayout ({children}: {children: React.ReactNode}) {
    return (
        <AuthGuard>
            <Grid templateRows='auto 1fr' color='text-primary'>
                <Navbar />
                <CategoryFilterProvider>
                    <SalaryCurrencyProvider>
                        {children}
                    </SalaryCurrencyProvider>
                </CategoryFilterProvider>
            </Grid>
        </AuthGuard>
    )
}