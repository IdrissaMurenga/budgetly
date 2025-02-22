import { Box, Text } from '@chakra-ui/react'

const WelcomePage = () => {
    return (
        <Box
            w='100vw'
            h='100vh'
            bgImage="url('/bg-image.jpg')"
            bgSize='cover'
            backgroundPosition='center'
            bgRepeat='no-repeat'
        >
            <Text fontSize='4xl'>Welcome to Task Management App</Text>
            <Text>This is the home page.</Text>
        </Box>
    )
}

export default WelcomePage
