import UpdateTransactionForm from "@/app/components/UpdateTransaction"

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

interface UpdateExpenseFormProps {
    transaction: Transaction
}

const UpdateIncomeForm = ({ transaction }: UpdateExpenseFormProps) => {
    return <UpdateTransactionForm type='income' transaction={transaction} />
}

export default UpdateIncomeForm
