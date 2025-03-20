import { Box, Flex, Grid, Image, Text } from '@chakra-ui/react'
import SignupForm from './SignupForm'

const SignupPage = () => {
  return (
    <Flex>
        <Grid bgColor='bg-secondary' h='100dvh' w='760px' alignContent='center'>
            <Image src='/safe logo.png' alt='safe logo' w='402px' mx='auto' />
            <Text fontSize='text-2xl' w='435px' textAlign='center' mx='auto' fontWeight='bold'>Plan smarter, spend wiser, and save better.</Text>
        </Grid>
        <SignupForm />
    </Flex>
  )
}

export default SignupPage
