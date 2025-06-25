import { Text, Center } from "@chakra-ui/react"

interface TransactionTypeProps {
    type: 'transaction' | 'expense' | 'income'
}
export const renderLoading = () => {
    return <Text>Loading...</Text>
}

export const EmptyTransaction = ({ type }: TransactionTypeProps) => {
    return (
        <Center p={8}>
            <Text fontSize="lg" color='text-primary'>
                No {type}s created yet
            </Text>
        </Center>
    )
}

export const NoTransactionForCategory = (selectedCategory: string, { type }: TransactionTypeProps) => {
    if (!type) return null
    return (
        <Center p={8}>
            <Text fontSize="lg" color='text-primary'>
                No {type}s found for category "{selectedCategory}"
            </Text>
        </Center>
    )
}