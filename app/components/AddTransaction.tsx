'use client'
import { useRef } from "react"
import { Button, CloseButton, Dialog, Input, Text, Textarea, Field, Portal, Select } from "@chakra-ui/react"
import { categoryCollection } from "@/app/utils/CategoriesCollection"
import { useExpenses, useIncomes } from "@/app/hooks/useTransactions"

interface TransactionsFormProps {
    type: 'expense' | 'income'
}

const AddTransactionsForm = ({ type }: TransactionsFormProps) => {
    const { categoriesData, handleAdd, setForm, form } = type === 'expense' ? useExpenses() : useIncomes()
    const contentRef = useRef<HTMLDivElement>(null)

    const categories = categoryCollection(categoriesData?.categories)

    return (
        <>
            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content bgColor='white' color='text-primary'  h='auto' borderRadius='md' p={4} boxShadow='lg' ref={contentRef}>
                    <Dialog.Header>
                        <Dialog.Title>Add your {type.charAt(0).toUpperCase() + type.slice(1)} Details here.</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                        <form onSubmit={handleAdd}>
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
                                        <Select.Content bgColor='white' color='text-primary' border='1px solid #E5E7EA'>
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
                                    Add {type.charAt(0) + type.slice(1)}
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

export default AddTransactionsForm
