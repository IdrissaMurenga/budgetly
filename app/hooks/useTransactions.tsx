'use client'
import { useState } from "react"
import { useQuery, useMutation } from "@apollo/client"
import { GET_EXPENSES } from "../graphQL/queries/expenses.query"
import { GET_INCOMES } from "../graphQL/queries/income.query"
import { ADD_EXPENSE, UPDATE_EXPENSE, DELETE_EXPENSE } from "../graphQL/mutations/expenses.mutaion"
import { ADD_INCOME, UPDATE_INCOME, DELETE_INCOME } from "../graphQL/mutations/income.mutation"
import { useCategoryFilter } from "../context/CategoryFilter"
import { useExpenseCategories, useIncomeCategories } from "./useCategories"

interface TransactionFormValues {
    amount: string
    description: string
    categoryId: string
}

interface Category {
    id: string
    name: string
    // icon: string
    // type: string
}

interface Transaction {
    id: string
    amount: number
    description: string
    category: Category
}

// transaction configuration
interface TransactionConfig {
    type: 'expense' | 'income'
    queries: {
        get: any
        add: any
        update: any
        delete: any
    }
}

export const useTransactions = (config: TransactionConfig) => {
    const [form, setForm] = useState<TransactionFormValues>({
        amount: '',
        description: '',
        categoryId: '',
    })

    const { categoriesData, loading, error } = config.type === 'expense' ? useExpenseCategories() : useIncomeCategories()
    const { data: transactionData } = useQuery(config.queries.get, {fetchPolicy:'cache-first'})
    const { selectedCategory } = useCategoryFilter()

    const commonOptions = { refetchQueries: [{ query: config.queries.get }] }
    
    const [addTransaction] = useMutation(config.queries.add, commonOptions)
    const [deleteTransaction] = useMutation(config.queries.delete, commonOptions)
    const [updateTransaction] = useMutation(config.queries.update, commonOptions)

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
            console.error(`Error adding ${config.type}:`, error)
        }
    }
    
    const handleDelete = async (id: string) => {
        try {
            await deleteTransaction({
                variables: { id }
            })
        } catch (error) {
            console.error(`Error deleting ${config.type}:`, error)
        }
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
            console.error(`Error updating ${config.type}:`, error)
        }
    }

    const filterTransactions = selectedCategory 
        ? transactionData?.[config.type === 'expense' ? 'expenses' : 'incomes']?.filter((transaction:Transaction) => transaction.category.name === selectedCategory) 
        : transactionData?.[config.type === 'expense' ? 'expenses' : 'incomes']

    const setForEdit = (transaction: Transaction) => {
        setForm({
            amount: transaction.amount.toString(),
            description: transaction.description,
            categoryId: transaction.category.id
        })
    }

    return {
        categoriesData,
        loading,
        error,
        handleAdd,
        filterTransactions,
        selectedCategory,
        setForm,
        form,
        handleDelete,
        handleUpdate,
        setForEdit,
    }
}

// Export specific hooks for expenses and incomes
export const useExpenses = () => {
    return useTransactions({
        type: 'expense',
        queries: {
            get: GET_EXPENSES,
            add: ADD_EXPENSE,
            update: UPDATE_EXPENSE,
            delete: DELETE_EXPENSE
        }
    })
}

export const useIncomes = () => {
    return useTransactions({
        type: 'income',
        queries: {
            get: GET_INCOMES,
            add: ADD_INCOME,
            update: UPDATE_INCOME,
            delete: DELETE_INCOME
        }
    })
}