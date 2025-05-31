'use client'
import { useState, useEffect } from "react"
import { Container, Dialog, Button, HStack, Portal, Text, Field, Input, CloseButton  } from '@chakra-ui/react'
import DatePicker from "react-datepicker"
import { SET_BUDGET_GOAL } from "@/app/graphQL/mutations/budget.mutation"
import { GET_BUDGET_GOAL } from "@/app/graphQL/queries/budget.query"
import { useMutation, useQuery } from "@apollo/client"
import dayjs from "dayjs"

const BudgetForm = () => {
    const currentMonth = dayjs().format("YYYY-MM");
    const [setBudgetGoal] = useMutation(SET_BUDGET_GOAL, {
        refetchQueries: [{ query: GET_BUDGET_GOAL, variables: { month: currentMonth } }]
    })
    const [savingsGoal, setSavingsGoal] = useState(0)
    const { data } = useQuery(GET_BUDGET_GOAL, {
        variables: { month: currentMonth }
})

    useEffect(() => {
        if (data?.getBudgetGoal?.amount) {
            setSavingsGoal(data.getBudgetGoal.amount.toString());
        }
    }, [data]);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await setBudgetGoal({
                variables: {
                    input: {
                        savingsGoal,
                        month: currentMonth
                    }
                },
            })
            console.log({
                savingsGoal,
                month: currentMonth
            })
        } catch (error) {
            console.error("Error setting budget goal:", error)
        }
    }
    return (
        <>
            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content bgColor='white' color='text-secondary' h='auto' borderRadius='md' p={4} boxShadow='lg'>
                    <Dialog.Header>
                        <Dialog.Title>Add your Budget Details here.</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body >
                            <form onSubmit={handleSubmit}>
                                <Field.Root required >
                                    <Field.Label>
                                        <Text fontWeight='bold'>Amount</Text>
                                        <Field.RequiredIndicator />
                                    </Field.Label>
                                    <Input
                                        type={'number'}
                                        min={0}
                                        onKeyDown={(e) => {
                                            if (e.key === '-' || e.key === 'e' || e.key === 'E') {
                                                e.preventDefault()
                                            }
                                        }}
                                        name='number'
                                        value={savingsGoal}
                                        onChange={(e) => setSavingsGoal(parseFloat(e.target.value))}
                                        placeholder='Enter amount expense'
                                        mb={4}
                                        bgColor='white'
                                        border='1px solid #E5E7EA'
                                    />
                                </Field.Root>
                                <Dialog.ActionTrigger asChild>
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
                                        Save Goals
                                    </Button>
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

export default BudgetForm
