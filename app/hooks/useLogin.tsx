'use client'
import { useState } from 'react'
import { ApolloError } from '@apollo/client'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { toaster } from '@/components/ui/toaster'
import { signIn } from 'next-auth/react'


const useLogin = () => {
    const router = useRouter()

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
                const res = await signIn("credentials", {
                    email: values.email,
                    password: values.password,
                    redirect: false
                })
                console.log('signIn result:', res)

                if (res?.ok && !res.error) {
                    setDelayedLoading(true)
                    router.replace('/pages/dashboard')
                } else {
                    toaster.create({
                        title: res.error || "Login failed",
                        type: "error",
                        duration: 3000,
                    });
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
    const isLoading = delayedLoading || formik.isSubmitting
    return { formik, isLoading }
}

export default useLogin