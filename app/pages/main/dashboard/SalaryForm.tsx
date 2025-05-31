'use client'
import {useState, useRef} from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { SET_SALARY } from '@/app/graphQL/mutations/salary.mutation'
import { GET_USER } from '@/app/graphQL/queries/user.query'
import { GET_SALARY } from '@/app/graphQL/queries/salary.query'
import { Text, Input, Portal, Button, CloseButton, Dialog, Field, Select, createListCollection } from '@chakra-ui/react'
import { useSalaryCurrency } from '@/app/context/SalaryCurrency'

const SalaryForm = () => {
    const [amount, setAmount] = useState('')
    const { currency, setCurrency, } = useSalaryCurrency()
    const contentRef = useRef<HTMLDivElement>(null)

    const { data: user } = useQuery(GET_USER)

    const [addSalary] = useMutation(SET_SALARY,
        { refetchQueries: [GET_USER, GET_SALARY] }
    )


    const currencies = createListCollection({
        items: [
            { name: 'USD ($)', value: 'USD' },
            { name: 'BIF (FBu)', value: 'BIF' },
        ]
    })

    const handleSelect = (details: { value: any }) => {
        const value = details.value[0]
        setCurrency(value)
    }

    const currencyName = currencies.items.find(item => item.value === currency)?.name || ''

    const handleSubmit = async (e: React.FormEvent) => {
        if(!amount) return
        e.preventDefault()
        try {
            await addSalary({
                variables: {
                    input: {
                        amount: parseFloat(amount),
                        currency,
                    }
                },
            })
            console.log('Salary added successfully')
        } catch (error) {
            console.error(error)
        }
        setAmount('')
    }
    return (
        <>
            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content bgColor='white' color='text-primary' ref={contentRef} h='auto' borderRadius='md' p={4} boxShadow='lg' >
                    <Dialog.Header>
                        <Dialog.Title color='bg-secondary'>welcome {user?.me?.firstName} please add yor salary</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                        <form onSubmit={handleSubmit}>
                            <Field.Root required >
                                <Field.Label>
                                    <Text fontWeight='bold'color='bg-secondary'>Amount</Text>
                                    <Field.RequiredIndicator />
                                </Field.Label>
                                <Input
                                    type='number'
                                    name='number'
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder='Enter amount expense'
                                    mb={4}
                                    bgColor='white'
                                    border='1px solid #E5E7EA'
                                />
                            </Field.Root>
                            <Select.Root color='bg-secondary' size="sm" width="320px" collection={currencies} value={[currency]} onValueChange={handleSelect}>
                                <Select.HiddenSelect />
                                <Select.Label fontWeight='bold'>Select Currency</Select.Label>
                                <Select.Control border='1px solid #E5E7EA'>
                                    <Select.Trigger>
                                        <Select.ValueText placeholder='Select currency'>
                                            {currencyName}
                                        </Select.ValueText>
                                    </Select.Trigger>
                                    <Select.IndicatorGroup>
                                        <Select.Indicator />
                                    </Select.IndicatorGroup>
                                </Select.Control>
                                <Portal container={contentRef}>
                                    <Select.Positioner>
                                        <Select.Content bgColor='white' color='bg-secondary'>
                                            {currencies.items.length > 0 ? (
                                                currencies.items.map((item: any) => (
                                                    <Select.Item
                                                        item={item}
                                                        key={item.value}
                                                        onSelect={() => {
                                                            setCurrency(item.value)
                                                        }}
                                                    >
                                                        {item.name}
                                                        <Select.ItemIndicator />
                                                    </Select.Item>
                                                ))
                                            ) : (
                                                <Select.Item item={{}}>
                                                    No currency found
                                                </Select.Item>
                                            )}
                                        </Select.Content>
                                    </Select.Positioner>
                                </Portal>
                            </Select.Root>
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
                                    Add Salary
                                </Button>
                            </Dialog.ActionTrigger>
                        </form>
                    </Dialog.Body>
                    <Dialog.CloseTrigger asChild>
                        <CloseButton size="sm" />
                    </Dialog.CloseTrigger>
                </Dialog.Content>
            </Dialog.Positioner>
        </>
    )
}

export default SalaryForm
