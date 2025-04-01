import { Popover } from '@chakra-ui/react'
import { Button, Portal, Text } from '@chakra-ui/react'
import { IoMdNotificationsOutline } from 'react-icons/io'

const Notification = () => {
    return (
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
    )
}

export default Notification
