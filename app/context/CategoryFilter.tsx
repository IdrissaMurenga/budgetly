"use client"
import { createContext, useContext, useState, ReactNode } from "react"

type CategoryFilterType = {
    selectedCategory: string
    setSelectedCategory: (category: string) => void
}

const CategoryFilter = createContext<CategoryFilterType | undefined>(undefined)

export const useCategoryFilter = () => {
    const context = useContext(CategoryFilter)
    if (!context) {
        throw new Error("useCategoryFilter must be used within a CategoryFilterProvider")
    }
    return context
}

export const CategoryFilterProvider = ({ children }: { children: ReactNode }) => {
    const [selectedCategory, setSelectedCategory] = useState("")

    return (
        <CategoryFilter.Provider value={{ selectedCategory, setSelectedCategory }}>
            {children}
        </CategoryFilter.Provider>
    )
}
