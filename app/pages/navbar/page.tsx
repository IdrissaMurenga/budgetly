'use client'
import { useState } from "react";
import { Box, Container, HStack, Image, Stack, Text, IconButton } from "@chakra-ui/react"
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseCircle } from "react-icons/io5";
import Notification from "./Notification";
import NavLink, { LinkItems } from "./NavLink";
import Profile from "./Profile";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    return (
        <Stack bgColor='white' mb='.5rem' py={2} px={4} pos='sticky' boxShadow='sm' top={0} zIndex={1000}>
            <Container display='flex' justifyContent='space-between' alignItems='center'>
                <Box display={{ lg: 'none' }}>
                    <IconButton onClick={open ? handleClose : handleOpen} variant='plain' size='md'>
                        {open ? <IoCloseCircle /> : <GiHamburgerMenu />}
                    </IconButton>
                </Box>
                <HStack>
                    <Image src='/logo2.png' alt='logo image' w='40px' />
                    <Text color='text-primary' fontWeight='bold' display={{base:'none', md:'block'}}>Budgetly</Text>
                </HStack>
                <HStack gap='4rem' display={{ base:'none', lg: 'flex' }} >
                    {LinkItems.map((link) => (
                        <NavLink key={link.name} icon={link.icon} name={link.name} href={link.href} />
                    ))}
                </HStack>
                <HStack>
                    <Notification />
                    <Profile />
                </HStack>
            </Container>
            {open ? (
                <Box display={{ lg: 'none' }} mt='1rem'>
                    {LinkItems.map((link) => (
                        <NavLink key={link.name} icon={link.icon} name={link.name} href={link.href} />
                    ))}
                </Box>
            ) : ''}
        </Stack>
    )
}

export default Navbar

