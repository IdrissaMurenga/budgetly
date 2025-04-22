'use client'
import { useState } from 'react'
import { useMutation, useApolloClient, ApolloError } from '@apollo/client'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { LOGIN } from '../graphQL/mutations/user.mutation'
import { useRouter } from 'next/navigation'
import { toaster } from '@/components/ui/toaster'


const useLogin = () => {
    const router = useRouter()

    // useMutation hook from apollo client to get user data from the database
    const [login, { loading }] = useMutation(LOGIN)

    // useApolloClient hook from apollo client to reset the cache after login
    const client = useApolloClient()

    // useState hook to manage loading state
    const [delayedLoading, setDelayedLoading] = useState(false)

    // useFormik hook from formik to manage form state and validation
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required('Email is required'),
            password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
        }),
        // handleSubmit function to handle form submission
        onSubmit: async (values, {setFieldError, setSubmitting}) => {
            try {
                // call the login mutation with the form values
                const { data } = await login({ variables: { input: values } })
                
                // check if login is successful then redirect user to the dashboard page
                // used a chaining option to check if data and login are not null or undefined
                if (data?.login) {
                    setDelayedLoading(true)

                    // if login is successful then reset the cache and redirect user to the dashboard page
                    await client.resetStore()

                    // delayed loading for 2 seconds to show the loading state
                    setTimeout(() => {
                        
                        router.replace('/pages/main/dashboard')
                    }, 2000)
                }
            } catch (error) {
                if (error instanceof ApolloError) {
                    // if error is an instance of ApolloError then show the error message
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

export default useLogin
