'use client'
import { useState } from 'react'
import SignInForm from './SignInForm'
import SignupForm from './SignupForm'
import { Button, Text, Grid, VStack, Image } from '@chakra-ui/react'

const AuthPage = () => {
    const [isLoginForm, setIsLoginForm] = useState(true)
    const [showPassword, setShowPassword] = useState(false)

    const handleShowPassword = () => setShowPassword(!showPassword)
    const handleClick = () => setIsLoginForm(!isLoginForm)
    
    return (
        <Grid height='100vh' placeItems='center'>
            <VStack bgColor='bg-primary' w='450px' p={4} alignItems='center' mx='auto' rounded='xl' >
                <VStack alignItems='center' p={4}>
                    <Image src='/logo.png' alt='logo-image' w='70px' />
                    {isLoginForm
                        ?
                        <Text color='text-primary' fontSize='text-xl' fontWeight='bold'>Welcome Back to Budgetly</Text>
                        :
                        <Text color='text-primary' fontSize='text-xl' fontWeight='bold'>Welcome to Budgetly</Text>
                    }
                    <Text color='text-primary' textAlign='center' fontSize='0.9rem'>Plan smarter, spend wiser, unlock new insights, save money, and achieve financial freedom</Text>
                </VStack>
                {isLoginForm ?
                    <SignInForm
                        showPassword={showPassword}
                        handleClick={handleShowPassword}
                    />
                : 
                    <SignupForm 
                        showPassword={showPassword} 
                        handleClick={handleShowPassword} 
                    />
                }
                {isLoginForm ? 
                    <Text color='text-primary'>
                        Don't have an account? 
                        <Button onClick={handleClick} variant='plain' px={2} color='bg-secondary'>
                            Sign Up
                        </Button>
                    </Text> 
                : 
                    <Text color='text-primary'>
                        Already have an account? 
                        <Button onClick={handleClick} variant='plain' px={2} color='bg-secondary'>
                            Sign In
                        </Button>
                    </Text>
                }
            </VStack>
        </Grid>
    )
}

export default AuthPage
