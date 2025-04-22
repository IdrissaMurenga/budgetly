'use client'
import {useState} from 'react'
import { useFormik } from 'formik'
import *  as Yup from 'yup'
import { SIGNUP } from '../graphQL/mutations/user.mutation'
import { useMutation, useApolloClient, ApolloError } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { toaster } from '@/components/ui/toaster'

const useSignup = () => {
    const [signup, {loading}] = useMutation(SIGNUP)
    const [delayedLoading, setDelayedLoading] = useState(false)

    const router = useRouter()
    const client = useApolloClient()

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('First name is required'),
            lastName: Yup.string().required('Last name is required'),
            email: Yup.string().email().required('Email is required'),
            password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
        }),
        onSubmit: async (values, {setFieldError, setSubmitting}) => {
            try {
                const { data } = await signup({ variables: { input: values } })

                if (data?.signup) {
                    setDelayedLoading(true)
                    await client.resetStore()
                    setTimeout(() => {
                        router.replace('/pages/main/dashboard')
                    }, 2000)
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
    const isLoading = loading || delayedLoading || formik.isSubmitting
    return { formik, isLoading }
}

export default useSignup
