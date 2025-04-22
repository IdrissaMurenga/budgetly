'use client'
import { GoTrash } from "react-icons/go";
import { iconMap } from "../utils/iconMap";
import { FiEdit } from "react-icons/fi";
import { format } from 'date-fns';
// import UpdateExpenseForm from "./UpdateExpenseForm";
import { useExpenses, useIncomes } from "@/app/hooks/useTransactions"
import { Button, Card, Icon, HStack, Flex, Box, Dialog, Portal } from "@chakra-ui/react"
import { EmptyTransaction, NoTransactionForCategory } from '@/app/components/TransactionRenders'
import UpdateTransactionForm from "./UpdateTransaction";

interface TransactionListProps {
    type: 'expense' | 'income'
}

const TransactionList = ({type}:TransactionListProps) => {
    const { filterTransactions, selectedCategory, handleDelete } = type === 'expense' ? useExpenses() : useIncomes()
    
    if (!filterTransactions || filterTransactions.length === 0) {
        return selectedCategory ? NoTransactionForCategory(selectedCategory, {type}) : EmptyTransaction({type})
    }
    return (
        <Card.Root display='grid' gridTemplateColumns='repeat(3, 1fr)' gap={4} py={4} bgColor='white' color='text-primary' border='none'>
            {filterTransactions.map((transaction: any) => {
                const Icons = iconMap[transaction.category.icon]
                return (                  
                    <Card.Body key={transaction.id} gap="2" bgColor='white' borderRadius='md'  border='1px solid #E5E7EA' p={4}>
                        <HStack justifyContent='space-between' alignItems='center'>
                            <Flex alignItems='center' gap={2}>
                                <Box bgColor='bg-secondary' p='0.5rem' rounded='full' >
                                    {Icons && <Icon as={Icons} boxSize={6} color="white" />}
                                </Box>
                                <Card.Title fontWeight="bold">{transaction.category.name}</Card.Title>
                            </Flex>
                            <Card.Title fontWeight="bold">$ {transaction.amount}</Card.Title>
                        </HStack>
                        <Card.Description>{transaction.description}</Card.Description>
                            <HStack justifyContent='space-between' alignItems='center'>
                                <Card.Description>
                                    {format(new Date(Number(transaction.createdAt)), 'dd MMM yyyy')}
                                </Card.Description>
                                <HStack>
                                    <Dialog.Root>
                                        <Dialog.Trigger asChild>
                                            <Button variant='solid' bgColor='bg-secondary' color='white' size='sm'>
                                                <FiEdit />
                                            </Button>
                                        </Dialog.Trigger>
                                    <Portal>
                                        <UpdateTransactionForm type={type} transaction={transaction} />
                                            {/* <UpdateExpenseForm expense={expense} /> */}
                                        </Portal>
                                    </Dialog.Root>
                                    <Button onClick={()=> handleDelete(transaction.id)} variant='solid' bgColor='error' color='white' size='sm'>
                                        <GoTrash />
                                    </Button>
                                </HStack>
                            </HStack>
                    </Card.Body>
                )
            })}
        </Card.Root>
    )
}

export default TransactionList
