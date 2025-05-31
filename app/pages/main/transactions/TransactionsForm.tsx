'use client'
import { useRef, useState } from "react"
import { useQuery } from "@apollo/client"
import { GET_USER } from "@/app/graphQL/queries/user.query"
import { useTransactions } from "@/app/hooks/useTransactions"
import { categoryCollection } from "@/app/utils/CategoriesCollection"
import { GET_DASHBOARD_SUMMARY } from "@/app/graphQL/queries/dashboard.query"
import { Button, CloseButton, Dialog, Input, Text, Textarea, Field, Portal, Select, Menu, Grid } from "@chakra-ui/react"


const TransactionsForm = () => {
    const { data: user } = useQuery(GET_USER)
    const [type, setType] = useState<'expense' | 'income'>('expense');
    const { data: currentBalance, loading, error } = useQuery(GET_DASHBOARD_SUMMARY)
    const {handleAdd, setForm, form, useCategories, transactionData } = useTransactions(type);
    const { categoriesData } = useCategories()
    
    const toggleType = () => {
        setType(prevType => prevType === 'expense' ? 'income' : 'expense');
    };
    
    const salary = user?.me?.salary?.amount
    const transactionAmount = transactionData?.amount
    const contentRef = useRef<HTMLDivElement>(null)
    
    const categories = categoryCollection(categoriesData?.categories)
    return (
        <>
            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content bgColor='white' color='text-primary' h='auto' borderRadius='md' p={4} boxShadow='lg' ref={contentRef}>
                    <Dialog.Header>
                        <Dialog.Title>Add your {type.charAt(0).toUpperCase() + type.slice(1)} here.</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Header py='0'>
                        <Menu.Root>
                            <Menu.Trigger asChild>
                                <Button variant='outline'  size='sm' onClick={toggleType}>
                                    Switch to {type === 'expense' ? 'Income' : 'Expense'}
                                </Button>
                            </Menu.Trigger>
                        </Menu.Root>
                    </Dialog.Header>
                    <Dialog.Body >
                        {transactionAmount > currentBalance ? <Text>your amount is exceede your current balance</Text> :
                            <form onSubmit={handleAdd}>
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
                                <Select.Root
                                    collection={categories}
                                    size="sm"
                                    value={[form.categoryId]}
                                    onValueChange={(details) => setForm({ ...form, categoryId: details.value[0] })}>
                                    <Select.HiddenSelect />
                                    <Select.Label>Select category</Select.Label>
                                    <Select.Control>
                                        <Select.Trigger value={form.categoryId} >
                                            <Select.ValueText placeholder="Select category" />
                                        </Select.Trigger>
                                        <Select.IndicatorGroup>
                                            <Select.Indicator />
                                        </Select.IndicatorGroup>
                                    </Select.Control>
                                    <Portal container={contentRef}>
                                        <Select.Positioner>
                                            <Select.Content bgColor='white' border='1px solid #E5E7EA'>
                                                {categories.items.length > 0 ? (
                                                    categories.items.map((item: any) => (
                                                        <Select.Item
                                                            item={item}
                                                            key={item.value}
                                                        >
                                                            {item.name}
                                                            <Select.ItemIndicator />
                                                        </Select.Item>
                                                    ))
                                                ) : (
                                                    <Select.Item item={{}}>
                                                        No categories found
                                                    </Select.Item>
                                                )}
                                            </Select.Content>
                                        </Select.Positioner>
                                    </Portal>
                                </Select.Root>
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
                                            px={8} py={2}
                                            borderRadius='md' mt={4}
                                        >
                                            submit
                                        </Button>
                                    </Grid>
                                </Dialog.ActionTrigger>
                            </form>
                        }
                    </Dialog.Body>
                    <Dialog.CloseTrigger asChild>
                        <CloseButton size="sm" variant='plain' />
                    </Dialog.CloseTrigger>
                </Dialog.Content>
            </Dialog.Positioner>
        </>
    )
}

export default TransactionsForm
