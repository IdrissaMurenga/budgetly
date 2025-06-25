'use client'
import { useState } from "react";
import { GoTrash } from "react-icons/go";
import { iconMap } from "@/app/utils/iconMap";
import { FiEdit } from "react-icons/fi";
import { format } from 'date-fns';
import { useTransactions } from "@/app/hooks/useTransactions";
import { Button, Card, Icon, HStack, Flex, Box, Dialog, Portal, Stack, ButtonGroup } from "@chakra-ui/react"
import { EmptyTransaction, NoTransactionForCategory } from "./TransactionRenders";
import UpdateTransactionForm from "./UpdateTransaction";
import { useSalaryCurrency } from "@/app/context/SalaryCurrency";
import { formatAmount } from "@/app/utils/formatAmount";


const TransactionsList = () => {
    const [type, setType] = useState<'transaction' | 'expense' | 'income'>('transaction')
    const [updateType, setUpdateType] = useState<'expense' | 'income'>('expense')
    const { currency } = useSalaryCurrency()
    const { filterTransaction, selectedCategory, handleDelete } = useTransactions(type)
    return (
        <Stack>
            <ButtonGroup>
                <Button
                    variant={type === 'transaction' ? 'solid' : 'outline'}
                    bgColor={type === 'transaction' ? 'bg-secondary' : 'gray.200'}
                    onClick={() => setType('transaction')} 
                    data-active={type === 'transaction'}
                >
                    All
                </Button>
                <Button
                    bgColor={type === 'expense' ? 'bg-secondary' : 'gray.200'}
                    variant={type === 'expense' ? 'solid' : 'outline'}
                    onClick={() => setType('expense')}
                    data-active={type === 'expense'}
                >
                    Expenses
                </Button>
                <Button
                    bgColor={type === 'income' ? 'bg-secondary' : 'gray.200'}
                    variant={type === 'income' ? 'solid' : 'outline'}
                    onClick={() => setType('income')}
                    data-active={type === 'income'}
                >
                    Incomes
                </Button>
            </ButtonGroup>
            {(!filterTransaction || filterTransaction.length === 0) ? (
                type === 'transaction' ? EmptyTransaction({ type })
                : selectedCategory ?
                NoTransactionForCategory(selectedCategory, { type })
                : EmptyTransaction({ type })
            ) : (              
                <Card.Root display='grid' gridTemplateColumns='repeat(3, 1fr)' gap={4} py={4} bgColor='white' color='text-secondary' border='none'>
                    {filterTransaction.map((transaction: any) => {
                        const Icons = iconMap[transaction.category.icon]
                        return (
                            <Card.Body key={transaction.id} gap="2" bgColor='white' borderRadius='md'  border='1px solid #E5E7EA' p={4}>
                                <HStack justifyContent='space-between' alignItems='center'>
                                    <Flex alignItems='center' gap={2}>
                                        <Box bgColor='bg-secondary' p='0.5rem' rounded='full' >
                                            {Icons && <Icon as={Icons} boxSize={6} color="white" />}
                                        </Box>
                                        <Card.Title fontWeight="bold" color='text-primary' >{transaction.category.name}</Card.Title>
                                    </Flex>
                                    <Card.Title fontWeight="bold" color='text-primary' >{formatAmount(transaction.amount, currency)}</Card.Title>
                                </HStack>
                                <Card.Description color='text-third'>{transaction.description}</Card.Description>
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
                                                <UpdateTransactionForm type={updateType} transaction={transaction} />
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
            )}
        </Stack>
    )
}

export default TransactionsList
