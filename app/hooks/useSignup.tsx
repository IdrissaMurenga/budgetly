'use client'
import {useState} from 'react'
import { useFormik } from 'formik'
import *  as Yup from 'yup'
import { ApolloError } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { toaster } from '@/components/ui/toaster'
import { signIn } from 'next-auth/react'

const useSignup = () => {
    const [delayedLoading, setDelayedLoading] = useState(false)

    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            userName: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            userName: Yup.string().required('Name is required'),
            email: Yup.string().email().required('Email is required'),
            password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
        }),
        onSubmit: async (values, {setFieldError, setSubmitting}) => {
            try {
                const query = `
                    mutation signup($input: SignupInput!){
                        signup(input: $input){
                            user {
                                id
                                email
                                userName
                            }
                            token
                        }
                    }
                `
                const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URI as string, {
                    method: 'POST',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({
                        query,
                        variables: {
                            input: {
                                userName: values.userName,
                                email: values.email,
                                password: values.password
                            }
                        }
                    })
                })
                const { data } = await response.json()

                await signIn('credentials', {
                    email: values.email,
                    password: values.password,
                    redirect: false,
                })

                if (response?.ok) {
                    setDelayedLoading(true)
                    router.replace('/pages/dashboard')
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
    const isLoading = delayedLoading || formik.isSubmitting
    return { formik, isLoading }
}

export default useSignup
