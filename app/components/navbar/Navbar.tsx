import { useState } from 'react'
import { Container, HStack, IconButton, Image, Input, Box, Stack } from '@chakra-ui/react'
import { IoClose } from 'react-icons/io5'
import { GiHamburgerMenu } from 'react-icons/gi'
import NavLinks , { LinkItems } from './NavLink'
import Notification from './Notification'
import Profile from './Profile'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <Box bgColor='white' color='black'py={2}>
            <Container >
                <IconButton size={'md'} aria-label={'Open Menu'} display={{ md: 'none' }} variant='plain' onClick={() => setIsOpen(!isOpen)} >
                    {isOpen ? <IoClose /> : <GiHamburgerMenu />}
                </IconButton>
                <HStack justifyContent='space-between'>
                    <Image src='/logo.png' alt='logo image' w='55px' />
                    <HStack gap={4} display={{ base: 'none', md: 'flex' }}>
                            {LinkItems.map((link) => (
                                <NavLinks key={link.name} name={link.name} icon={link.icon} />
                            ))}
                            {/* <Input placeholder='search here.....' w='340px' border='1px solid #3855B3'/> */}
                    </HStack>
                    <HStack gap={4}>
                        <Notification />
                        <Profile />
                    </HStack>
                </HStack>
                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} gap={4}>
                            {LinkItems.map((link) => (
                                <NavLinks key={link.name} name={link.name} icon={link.icon} />
                            ))}
                        </Stack>
                    </Box>
                ) : ''}
            </Container>
        </Box>
    )
}

export default Navbar
