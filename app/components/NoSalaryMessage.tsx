import { Button, CloseButton, Dialog, Text } from "@chakra-ui/react"
import Link from "next/link"

const NoSalaryMessage = () => {
    return (
        <>
            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content>
                <Dialog.Body>
                    <Text pt='3rem' color='text-primary' fontSize='1rem' textAlign='center'>
                        add your salary first as the starting point of your financial journey, once it’s set, you’ll be able to track all your transactions smoothly and see how everything adds up. It only takes a moment, and you’ll be all set to go!
                    </Text>
                </Dialog.Body>
                    <Dialog.Footer>
                        <Link href='/pages/main/dashboard'>
                            <Button bgColor='bg-secondary'>Add Your Salary</Button>
                        </Link>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                </Dialog.CloseTrigger>
                </Dialog.Content>
            </Dialog.Positioner>
        </>
    )
}

export default NoSalaryMessage
