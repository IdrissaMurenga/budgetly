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
const UpdateExpenseForm = ({ transaction }: UpdateExpenseFormProps) => {
    return <UpdateTransactionForm type='expense' transaction={transaction} />
}

export default UpdateExpenseForm
