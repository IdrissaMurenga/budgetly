import { Container, Dialog, Button, HStack, Portal, Text } from '@chakra-ui/react'
import { GoPlus } from "react-icons/go";
import DatePicker from 'react-datepicker'
import BudgetForm from './BudgetForm';
import BudgetDisplay from './BudgetDisplay';

const Budget = () => {

  return (
    <Container>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button variant='solid' bgColor='bg-secondary' size='sm' color='white' fontWeight='nold' fontSize='0.8rem' px={4} py={2} borderRadius='md'>
            <HStack gap={2}>
              <GoPlus size={6} />
              <Text>Add budget</Text>
            </HStack>
          </Button>
        </Dialog.Trigger>
        <Portal>
          <BudgetForm />
        </Portal>
      </Dialog.Root>
      <BudgetDisplay />
    </Container>
  )
}

export default Budget
