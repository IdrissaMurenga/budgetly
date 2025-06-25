import { Box, Button, HStack, Image, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { GoPlus } from 'react-icons/go'

const EmptyPage = () => {
    return (
        <Box bgColor='white' p={4} borderRadius='md' boxShadow='md' textAlign='center' display='flex' flexDirection='column' alignItems='center' justifyContent='center' gap={4}>
            <Image src='/image-not-found.png' alt='image empty data' w='50rem' />
            <Text>You have No data created yet to get summary of your budget please create transactions first</Text>
            <Link href='/pages/main/transactions'>
                <Button variant='solid' bgColor='bg-secondary' size='sm' color='white' fontWeight='nold' fontSize='0.8rem' px={4} py={2} borderRadius='md'>
                    <HStack gap={2}>
                        <GoPlus size={6} />
                        <Text>Add Transaction</Text>
                    </HStack>
                </Button>
            </Link>
        </Box>
    )
}

export default EmptyPage
