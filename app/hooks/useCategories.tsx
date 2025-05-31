'use client'
import { useQuery } from "@apollo/client"
import { GET_CATEGORIES } from "../graphQL/queries/categories.query"

export const useCategories = () => {
    const { data: categoriesData, loading, error } = useQuery(GET_CATEGORIES, {
        fetchPolicy: 'cache-first'
    })
    return {categoriesData, loading, error}
}