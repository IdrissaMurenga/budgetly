"use client"
import { Select, Portal, Text } from '@chakra-ui/react'
import { categoryCollection } from '@/app/utils/CategoriesCollection'
import { useCategoryFilter } from '@/app/context/CategoryFilter'
import { useCategories } from '@/app/hooks/useCategories'

const TransactionCategories = () => {

    //fetch categories
    const { categoriesData } = useCategories()
    
    // context custom hook for a selected category
    const { selectedCategory, setSelectedCategory } = useCategoryFilter()
    
    //Converts the fetched categories into a Select-compatible format using your categoryCollection utility.
    const categories = categoryCollection(categoriesData?.categories)
    
    // finds the name of the currently selected category (by comparing the value) so it can be displayed inside the select trigger button
    const selectedCategoryName = categories.items.find(item => item.value === selectedCategory)?.name || ''
    
    // handle category changes
    const handleSelect = (details: { value: string[] }) => {
    
        // get the selected value
        const value = details.value[0]
    
        // find the corresponding category item
        const selectedItem = categories.items.find(item => item.value === value)
    
        //Calls setSelectedCategory to update the context state with the selected category’s name or shows a fallback message if not found.
        setSelectedCategory(selectedItem?.value || `no ${categoriesData.type}s found of ${selectedItem?.name}`)
    }
    return (
        <Select.Root size="sm" mb='1rem' width="320px" collection={categories} defaultValue={[selectedCategory]} onValueChange={handleSelect}>
            <Select.HiddenSelect />
            <Select.Label fontWeight='bold'>Search Transactions by Categories</Select.Label>
            <Select.Control border='1px solid #E5E7EA'>
                <Select.Trigger>
                    <Select.ValueText placeholder='Select category'>
                        {selectedCategoryName}
                    </Select.ValueText>
                </Select.Trigger>
                <Select.IndicatorGroup>
                    <Select.Indicator />
                </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
                <Select.Positioner>
                    <Select.Content bgColor='white'>
                        {categories.items.length > 0 ? (
                            categories.items.map((item: any) => (
                                <Select.Item item={item} key={item.value}>
                                    <Text color='bg-secondary'>{item.name}</Text>
                                    <Text fontSize='.7rem' color='text-third'>{item.type}</Text>
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
    )
}

export default TransactionCategories
