'use client'
import { useEffect, useState } from "react"
import { Button, CloseButton, Dialog, Input, Text, Textarea, Field, Grid } from "@chakra-ui/react"
// import { useExpenses, useIncomes } from "@/app/hooks/useTransactions"
import { useTransactions } from "@/app/hooks/useTransactions"

interface Category {
    id: string
    name: string
}
interface Transaction {
    id: string
    amount: number
    description: string
    category: Category
}
interface UpdateTransactionFormProps {
    transaction: Transaction
    type: 'expense' | 'income'
}

const UpdateTransactionForm = ({ type, transaction }: UpdateTransactionFormProps) => {
    const { handleUpdate, setForm, form, setForEdit } = useTransactions(type)

    useEffect(() => {
        setForEdit(transaction)
    },[transaction])

    return (
        <>
            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content bgColor='white' color='text-primary' h='auto' borderRadius='md' p={4} boxShadow='lg'>
                    <Dialog.Header>
                        <Dialog.Title>Update your Transaction details.</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                        <form onSubmit={(e) => handleUpdate(e, transaction.id)}>
                            <Field.Root required >
                                <Field.Label>
                                    <Text fontWeight='bold'>Amount</Text>
                                    <Field.RequiredIndicator />
                                </Field.Label>
                                <Input
                                    type='number'
                                    name='number'
                                    value={form.amount}
                                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                                    placeholder='Enter amount expense'
                                    mb={4}
                                    bgColor='white'
                                    border='1px solid #E5E7EA'
                                />
                            </Field.Root>
                            <Field.Root required>
                                <Field.Label>
                                    <Text fontWeight='bold'>Description</Text>
                                    <Field.RequiredIndicator />
                                </Field.Label>
                                <Textarea
                                    name='text'
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    placeholder='Enter description'
                                    border='1px solid #E5E7EA'
                                    mb={4}
                                />
                            </Field.Root>
                            <Dialog.ActionTrigger asChild>
                                <Grid>
                                    <Button                                
                                        type="submit"
                                        variant='solid'
                                        bgColor='bg-secondary'
                                        size='sm'
                                        color='white'
                                        fontWeight='bold'
                                        fontSize='0.8rem'
                                        px={4} py={2}
                                        borderRadius='md' mt={4}
                                    >
                                        submit
                                    </Button>
                                </Grid>
                            </Dialog.ActionTrigger>
                        </form>
                    </Dialog.Body>
                    <Dialog.CloseTrigger asChild>
                        <CloseButton size="sm" variant='plain' />
                    </Dialog.CloseTrigger>
                </Dialog.Content>
            </Dialog.Positioner>
        </>
    )
}

export default UpdateTransactionForm
