import { GoPlus } from "react-icons/go";
import { Container, Text, HStack, Button, Dialog, Portal } from '@chakra-ui/react'
import IncomeForm from "./IncomeForm";
import IncomeCategories from "./IncomeCategories";
import IncomeList from "./IncomeList";

const Incomes = () => {
  return (
    <Container my={4}>
      <HStack justifyContent='space-between' alignItems='center' my={4}>
        <Text fontSize='text-xl' color='bg-secondary' fontWeight='bold'>Incomes</Text>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button variant='solid' bgColor='bg-secondary' size='sm' color='white' fontWeight='nold' fontSize='0.8rem' px={4} py={2} borderRadius='md'>
              <HStack gap={2}>
                <GoPlus size={6} />
                <Text>Add Income</Text>
              </HStack>
            </Button>
          </Dialog.Trigger>
          <Portal>
            <IncomeForm />
          </Portal>
        </Dialog.Root>
      </HStack>
      <IncomeCategories />
      <IncomeList />
    </Container>
  )
}

export default Incomes
