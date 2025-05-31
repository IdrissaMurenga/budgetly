import { GoPlus } from "react-icons/go";
import { Box, Container, Text, Dialog, HStack, Button, Portal, Stack } from '@chakra-ui/react'
import TransactionsForm from "./TransactionsForm";
import TransactionCategories from "./TransactionCategories";
import TransactionsList from "./TransactionsList";

const Transactions = () => {
  return (
    <Container>
      <HStack justifyContent='space-between' alignItems='center' my={4}>
        <Text fontWeight='bold' fontSize='2xl'>Transactions</Text>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button variant='solid' bgColor='bg-secondary' size='sm' color='white' fontWeight='nold' fontSize='0.8rem' px={4} py={2} borderRadius='md'>
              <HStack gap={2}>
                <GoPlus size={6} />
                <Text>Add Transaction</Text>
              </HStack>
            </Button>
          </Dialog.Trigger>
          <Portal>
            <TransactionsForm />
          </Portal>
        </Dialog.Root>
      </HStack>
      <Stack bgColor='white' borderRadius='md' p={4} boxShadow='md'>
        <TransactionCategories />
        <TransactionsList />
      </Stack>
    </Container>
  )
}

export default Transactions
