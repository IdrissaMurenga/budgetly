import { Popover } from '@chakra-ui/react'
import { Button, Portal, Text } from '@chakra-ui/react'
import { IoMdNotificationsOutline } from 'react-icons/io'

const Notification = () => {
    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <Button variant='plain' p='0' bg='border-third' border='none' rounded='full'>
                    <IoMdNotificationsOutline size='1.4rem' fill='bg-third' />
                </Button>
            </Popover.Trigger>
            <Portal>
                <Popover.Positioner>
                    <Popover.Content bgColor='white'>
                    <Popover.Arrow />
                        <Popover.Body color='text-secondary' >
                            <Popover.Title fontWeight="bold" fontSize='2xl'  >
                                Notifications
                            </Popover.Title>
                                <Text my="4" textAlign='center' color='black'>
                                no new notification
                            </Text>
                        </Popover.Body>
                    </Popover.Content>
                </Popover.Positioner>
            </Portal>
        </Popover.Root>
    )
}

export default Notification
