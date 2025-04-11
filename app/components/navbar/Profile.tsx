"use client"
import { Menu, Text, Avatar, Portal, Button, Box, Spinner } from '@chakra-ui/react'
import { IoLogOutOutline } from 'react-icons/io5';
import { GET_USER } from '@/app/graphQL/queries/user.query';
import { useQuery, useMutation } from '@apollo/client';
import { LOGOUT } from '@/app/graphQL/mutations/user.mutation';
import { redirect } from 'next/navigation';
import { useApolloClient } from "@apollo/client";
const Profile = () => {
    const { data, loading } = useQuery(GET_USER);
    const [logout] = useMutation(LOGOUT)
    const client = useApolloClient();
    const user = data?.me;

    const handleLogout = async () => {
        await logout()
        await client.clearStore()
        redirect('/')
    }
    
    if (loading) return <Spinner size="md" />;
    
    return (
        <Menu.Root>
            <Menu.Trigger asChild>
                <Button variant="plain" size="sm" rounded='full' p='0'>
                    <Avatar.Root size='md' bgColor='bg-secondary'>
                        <Avatar.Fallback 
                            name={`${user?.firstName} ${user?.lastName}`}
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
                            {user?.firstName} {user?.lastName}
                        </Menu.Item>
                        <Menu.Item 
                            value="setting" 
                            color='text-primary' 
                            cursor='pointer' 
                            _hover={{ bg: "bg-primary", color:'text-primary' }}
                        >
                            Setting
                        </Menu.Item>
                        <Menu.Item 
                            value="logout"
                            onClick={handleLogout}
                            color="error" 
                            cursor='pointer' 
                            _hover={{ bg: "red.100", color: "error" }}
                        >
                            Logout <IoLogOutOutline />
                        </Menu.Item>
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    )
}

export default Profile
