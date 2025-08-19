'use client'
import { Menu, Avatar, Portal, Button } from '@chakra-ui/react'
import { IoIosSettings } from "react-icons/io";
import { IoLogOutOutline } from 'react-icons/io5';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Profile = () => {

    const { data } = useSession()

    const userName = data?.user?.name || 'User'

    const logout = () => {
        signOut({
            callbackUrl: '/'
        })
    }

    return (
        <Menu.Root>
            <Menu.Trigger asChild>
                <Button variant="plain" size="sm" rounded='full' p='0'>
                    <Avatar.Root size='md' bgColor='bg-secondary'>
                        <Avatar.Fallback 
                            name={userName}
                            color='white' 
                            border='white' 
                        />
                    </Avatar.Root>
                </Button>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                    <Menu.Content bgColor='white'>
                        <Menu.Item
                            value='name' 
                            _hover={{ bg: "none" }} 
                            fontSize="1rem" 
                            p={4} 
                            fontWeight="bold" 
                            color="bg-secondary"
                        >
                            {userName}
                        </Menu.Item>
                        <Link href="/pages/main/settings">
                            <Menu.Item 
                                value="setting" 
                                color='text-primary' 
                                cursor='pointer' 
                                _hover={{ bg: "bg-primary", color: 'text-primary' }}
                                gap={2}
                            >
                                    <IoIosSettings />
                                    Setting
                            </Menu.Item>
                        </Link>
                        <Menu.Item 
                            value="logout"
                            color="error" 
                            cursor='pointer' 
                            _hover={{ bg: "red.100", color: "error" }}
                            onClick={logout}
                        >
                            <IoLogOutOutline />
                            Logout
                        </Menu.Item>
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    )
}

export default Profile
