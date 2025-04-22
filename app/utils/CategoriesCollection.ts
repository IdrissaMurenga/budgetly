import { createListCollection } from '@chakra-ui/react'
export const categoryCollection = (categories: { name: string }[] = []) => {
    return createListCollection({
        items: categories?.map((category) => ({
            value: category.name,
            name: category.name,
        }))
    })
}
