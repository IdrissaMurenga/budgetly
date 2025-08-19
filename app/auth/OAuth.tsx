'use client'
import { FC, useState } from "react"
import { signIn } from 'next-auth/react'
import { Flex, Button, Text } from "@chakra-ui/react"
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

type Props ={
    isLoginForm: boolean;
}

const OAuth: FC<Props> = ({ isLoginForm }) => {

    const [loading, setLoading] = useState(false)

    const googleSignIn = async () => {
        setLoading(true)
        await signIn('google', { callbackUrl: '/pages/dashboard' })
        setLoading(false)
    }

    const githubSignIn = async () => {
        setLoading(true)
        await signIn('github', { callbackUrl: '/pages/dashboard' })
        setLoading(false)
    }

    return (
        <Flex gap={2} justifyContent='center' pb={2}>
            <Button
                type='button'
                variant='outline'
                onClick={googleSignIn}
            >
                <FcGoogle />
                {isLoginForm ? 'sign in with Google' : 'sign up with Google'}
            </Button>
            <Button
                type='button'
                variant='outline'
                onClick={githubSignIn}
            >
                <FaGithub />
                {isLoginForm ? 'sign in with Github' : 'sign up with Github'}
            </Button>
        </Flex>
    )
}
export default OAuth
