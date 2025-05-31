'use client'
import { useState } from "react"
import { useQuery, useMutation, ApolloError } from "@apollo/client"
import { GET_EXPENSES } from "../graphQL/queries/expenses.query"
import { GET_INCOMES } from "../graphQL/queries/income.query"
import { ADD_INCOME, UPDATE_INCOME, DELETE_INCOME } from "../graphQL/mutations/income.mutation"
import { ADD_EXPENSE, UPDATE_EXPENSE, DELETE_EXPENSE } from "../graphQL/mutations/expenses.mutaion"
import { useCategoryFilter } from "../context/CategoryFilter"
import { useCategories } from "./useCategories"
import { toaster } from "@/components/ui/toaster"

interface TransactionFormValues {
    amount: string
    description: string
    categoryId: string
}

interface Category {
    id: string
    name: string
}

interface Transaction {
    amount: number
    description: string
    category: Category
}

type TypeFilter = 'all' | 'income' | 'expense'

export const useTransactions = (type: TypeFilter) => {
    const [form, setForm] = useState<TransactionFormValues>({
        amount: '',
        description: '',
        categoryId: '',
    })

    const { selectedCategory } = useCategoryFilter()
    const { data: incomeData } = useQuery(GET_INCOMES, { fetchPolicy: 'cache-first' })
    const { data: expenseData } = useQuery(GET_EXPENSES, { fetchPolicy: 'cache-first' })

    const income = incomeData?.incomes || []
    const expense = expenseData?.expenses || []

    const transactionData = type === 'all' ? [...income, ...expense] : type === 'expense' ? expense : income

    const filterTransaction = selectedCategory ? transactionData.filter((transaction: Transaction) => transaction.category.name === selectedCategory) : transactionData
    
    // Pick proper mutations
    const addMutation = type === "expense" ? ADD_EXPENSE : ADD_INCOME;
    const updateMutation = type === "expense" ? UPDATE_EXPENSE : UPDATE_INCOME;
    const deleteMutation = type === "expense" ? DELETE_EXPENSE : DELETE_INCOME;
    const refetchQuery = type === "expense" ? GET_EXPENSES : GET_INCOMES;

    const [addTransaction] = useMutation(addMutation, {
        refetchQueries: [{ query: refetchQuery }],
    });

    const [deleteTransaction] = useMutation(deleteMutation, {
        refetchQueries: [{ query: refetchQuery }],
    });

    const [updateTransaction] = useMutation(updateMutation, {
        refetchQueries: [{ query: refetchQuery }],
    });

    const resetForm = () => setForm({ amount: '', description: '', categoryId: '' })

    const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            if (!form.categoryId) {
                alert("Please select a category")
                return
            }

            if (!form.amount || !form.description) {
                alert("Please fill in all fields")
                return
            }

            await addTransaction({
                variables: {
                    input: {                        
                        amount: parseFloat(form.amount),
                        description: form.description,
                        categoryId: form.categoryId
                    }
                }
            })
            console.log({
                amount: parseFloat(form.amount),
                description: form.description,
                categoryId: form.categoryId
            })
            resetForm()
        } catch (error) {
            if (error instanceof ApolloError) {
                // if error is an instance of ApolloError then show the error message
                const erroMessage = error.graphQLErrors[0]?.message
                toaster.create({
                    title: erroMessage,
                    type: 'warning',
                    duration: 4000,
                })
            }
        }
    }
    
    const handleDelete = async (id: string) => {
        await deleteTransaction({variables: { id }})
    }

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
        e.preventDefault()
        try {
            await updateTransaction({
                variables: {
                    id,
                    input: {                        
                        amount: parseFloat(form.amount),
                        description: form.description,
                    }
                }
            })
            resetForm()
        } catch (error) {
            console.error(`Error updating ${type}:`, error)
        }
    }

    const setForEdit = (transaction: Transaction) => {
        setForm({
            amount: transaction.amount.toString(),
            description: transaction.description,
            categoryId: transaction.category.id
        })
    }

    return {
        transactionData,
        handleAdd,
        filterTransaction,
        selectedCategory,
        setForm,
        form,
        handleDelete,
        handleUpdate,
        setForEdit,
        useCategories
    }
}