'use client'
import {FC, useState} from 'react'
import { Box, Image, Avatar, Container, Button, Text, HStack, IconButton, Input, Stack, Popover, Portal } from '@chakra-ui/react'
import { IoMdNotificationsOutline } from "react-icons/io";
import { MenuRoot, MenuTrigger, MenuContent, MenuItem, } from '@/components/ui/menu';
import { IoClose, IoLogOutOutline } from 'react-icons/io5';
import { ColorModeButton } from '@/components/ui/color-mode';
import { useColorMode, useColorModeValue } from '@/components/ui/color-mode';
import { GiHamburgerMenu } from 'react-icons/gi';
import NavLinks, { LinkItems } from './NavLink';

const Navbar = () => {
    const { toggleColorMode } = useColorMode()
    const [isOpen, setIsOpen] = useState(false)


    const bg = useColorModeValue("gray.100", "gray.800")
    // const color = useColorModeValue("white", "gray.800")
    
    return (
        <Box p={2}>
            <Container>
                <HStack h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton size={'md'} aria-label={'Open Menu'} display={{ md: 'none' }} variant='plain' onClick={() => setIsOpen(!isOpen)} >
                        {isOpen ? <IoClose /> : <GiHamburgerMenu />}
                    </IconButton>
                <HStack gap={8} alignItems={'center'}>
                    <Image src='/logo.png' alt='logo image' w='55px' />
                    <HStack gap={4} display={{ base: 'none', md: 'flex' }}>
                        {LinkItems.map((link) => (
                            <NavLinks key={link.name} name={link.name} icon={link.icon} />
                        ))}
                        <Input placeholder='search here.....' w='340px' border='1px solid #3855B3 '/>
                    </HStack>
                </HStack>
                <HStack alignItems={'center'}>
                    <ColorModeButton variant='plain' onClick={toggleColorMode} />
                    <Popover.Root>
                        <Popover.Trigger asChild>
                            <Button variant='plain' p='0'>
                                <IoMdNotificationsOutline size='1.4rem' fill='bg-third' />
                            </Button>
                        </Popover.Trigger>
                        <Portal>
                            <Popover.Positioner>
                                <Popover.Content>
                                <Popover.Arrow />
                                    <Popover.Body>
                                        <Popover.Title fontWeight="bold" fontSize='2xl' >
                                            Notifications
                                        </Popover.Title>
                                            <Text my="4" textAlign='center'>
                                            no new notification
                                        </Text>
                                    </Popover.Body>
                                </Popover.Content>
                            </Popover.Positioner>
                        </Portal>
                    </Popover.Root>
                    <MenuRoot>
                        <MenuTrigger rounded='full' cursor='pointer' display='flex' alignItems='center' gap={2} >
                                <Avatar.Root size='md' bgColor='bg-secondary' >
                                    <Avatar.Fallback name='User' color='white' border='white' />
                                </Avatar.Root>
                                <Text fontSize='1.1rem'>user name</Text>
                        </MenuTrigger>
                        <MenuContent bgColor='white'>
                            <MenuItem
                                value="setting"
                                color='text-primary'
                                _hover={{ bg: "bg-primary", color:'text-primary' }}
                            >
                                setting
                            </MenuItem>
                            <MenuItem
                            value="logout"
                            color="error"
                            _hover={{ bg: "red.100", color: "error" }}
                            cursor='pointer'
                            >
                                Logout
                                <IoLogOutOutline />
                            </MenuItem>
                        </MenuContent>
                    </MenuRoot>
                </HStack>
                </HStack>
            </Container>

            {isOpen ? (
                <Box pb={4} display={{ md: 'none' }}>
                    <Stack as={'nav'} gap={4}>
                        {LinkItems.map((link) => (
                            <NavLinks key={link.name} name={link.name} icon={link.icon} />
                        ))}
                    </Stack>
                </Box>
            ) : ''}
        </Box>
    )
}

export default Navbar
