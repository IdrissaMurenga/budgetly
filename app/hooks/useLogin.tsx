'use client'
import { useMutation, useQuery, useApolloClient } from '@apollo/client'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { LOGIN } from '../graphQL/mutations/user.mutation'
import { GET_USER } from '../graphQL/queries/user.query'
import { redirect, useRouter } from 'next/navigation'




const useLogin = () => {
    const router = useRouter()
    const [login, {loading}] = useMutation(LOGIN)

    const client = useApolloClient()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required('Email is required'),
            password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
        }),
        onSubmit: async (values) => {
            try {
                const { data } = await login({ variables: { input: values } })

                if (data?.login) {
                    await client.resetStore()
                    router.replace('/pages/main')
                }
                router.push('/pages/main')
            } catch (error) {
                console.error('login error',error)
            }
        },
    })
    return {formik}
}

export default useLogin
