import { Box, Button, Flex, Grid, Text } from '@chakra-ui/react'
import Link from 'next/link'

const HomePage = () => {
    return (
        <Box
            h="100dvh"
            backgroundImage="url('/bg-image.jpg')"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
        >
            <Flex
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection='column'
            >
                <Box pt='13rem' gap='2rem' color='bg-secondary' textAlign='center'>
                    <Text fontWeight='bold' fontSize='2.2rem' pb='1.5rem'>Welcome to Budgetly App</Text>
                    <Text
                        w='29rem'
                        fontWeight='medium'
                        fontSize='text-xl'
                        letterSpacing='wide'
                        lineHeight='40px'
                    >
                        Take control of your finances with ease! Track your income, manage expenses, stay on top of your savings
                    </Text>
                </Box>
                <Link href='/pages/auth/login'>
                    <Button
                        mt='1.5rem'
                        px='1.563rem'
                        py='1rem'
                        fontWeight='bold'
                        fontSize='1rem'
                        color='white'
                        bgColor='btn-bg-primary'
                        colorPalette='btn-bg-primary'
                        rounded='4px'
                    >
                        Let's get started
                    </Button>
                </Link>
            </Flex>
        </Box>
    )
}

export default HomePage
