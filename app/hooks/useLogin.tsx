'use client'
import { useMutation, useApolloClient, ApolloError } from '@apollo/client'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { LOGIN } from '../graphQL/mutations/user.mutation'
import { useRouter } from 'next/navigation'
import { toaster } from '@/components/ui/toaster'

interface LoginInput {
    email: string
    password: string
}

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
        onSubmit: async (values, {setFieldError, setSubmitting}) => {
            try {
                const { data } = await login({ variables: { input: values } })

                if (data?.login) {
                    await client.resetStore()
                    router.replace('/pages/main')
                }
            } catch (error) {
                if (error instanceof ApolloError) {
                    const erroMessage = error.graphQLErrors[0]?.message || 'An error occurred during login'
                    if(erroMessage.includes('password')) {
                        setFieldError('password',erroMessage)
                    } else {
                        toaster.create({
                            title: erroMessage,
                            type: 'error',
                            duration: 3000,
                        })
                    }
                }
            } finally {
                setSubmitting(false)
            }
        },
    })
    return { formik, loading }
}

export default useLogin
