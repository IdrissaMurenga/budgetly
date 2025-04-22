'use client'
import { useQuery } from "@apollo/client"
import { GET_EXPENSE_CATEGORIES } from "../graphQL/queries/categories.query"

const useCategories = (type: String) => {
    // fetching categories from database by it type (income or expense)
    // using useQuery hook from apollo client to get all categories from the database
    const { data: categoriesData, loading, error } = useQuery(GET_EXPENSE_CATEGORIES, {
        variables: { type },
        fetchPolicy: 'cache-first'
    })
    return {categoriesData, loading, error}
}

// this function is used to get all expense categories from the database
export const useExpenseCategories = () => useCategories('expense')

// this function is used to get all income categories from the database 
export const useIncomeCategories = () => useCategories('income')