'use client'
import { FC } from 'react'
import { Text, Button, Flex, Field, Input, Grid, InputGroup } from '@chakra-ui/react'
import { MdOutlineEmail } from 'react-icons/md'
import { CiLock } from 'react-icons/ci'
import { LuEye, LuEyeClosed } from 'react-icons/lu'
import useSignup from '../hooks/useSignup'

interface Props {
    showPassword: boolean;
    handleClick: () => void;
}

const SignupForm: FC<Props> = ({ showPassword, handleClick }) => {
    const { formik, isLoading } = useSignup()

    return (
        <form noValidate onSubmit={formik.handleSubmit}>
            <Grid gap='20px' color='text-primary'>
                <Flex>
                    <Field.Root required>
                        <Field.Label>
                            <Text fontWeight='bold'>username</Text>
                            <Field.RequiredIndicator />
                        </Field.Label>
                        <InputGroup flex='1' startElement=''>
                            <Input
                                type='text'
                                name='userName'
                                value={formik.values.userName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder='user name'
                                // w='174px'
                                h='48px'
                                bgColor='white'
                                border={formik.errors.userName && formik.touched.userName ? '1px solid red' : '1px solid #E5E7EA'}
                            />
                        </InputGroup>
                        {formik.touched.userName && formik.errors.userName && (
                            <Text color="red" fontSize='0.8rem'>{formik.errors.userName}</Text>
                        )}
                    </Field.Root>
                </Flex>
    
                <Field.Root required>
                    <Field.Label>
                        <Text fontWeight='bold'>Email</Text>
                        <Field.RequiredIndicator />
                    </Field.Label>
                    <InputGroup flex='1' startElement={<MdOutlineEmail size='16' color='text-third' />}>
                        <Input
                            type='text'
                            name='email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder='Enter your email'
                            w='365px'
                            h='48px'
                            bgColor='white'
                            border={formik.errors.email && formik.touched.email ? '1px solid red' : '1px solid #E5E7EA'}
                        />
                    </InputGroup>
                    {formik.touched.email && formik.errors.email && (
                    <Text color="red" fontSize='0.8rem'>{formik.errors.email}</Text>
                    )}
                </Field.Root>
    
                <Field.Root required>
                    <Field.Label>
                        <Text fontWeight='bold'>Password</Text>
                        <Field.RequiredIndicator />
                    </Field.Label>
                    <InputGroup flex='1' startElement={<CiLock size='16' color='text-third' />} endElement={
                    <Button onClick={handleClick} variant='plain'>
                        {showPassword ? <LuEye size='16' color='text-third'/> : <LuEyeClosed size='16' color='text-third'/>}
                    </Button>
                    }>
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            name='password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder='************'
                            w='365px'
                            h='48px'
                            bgColor='white'
                            border={formik.errors.password && formik.touched.password ? '1px solid red' : '1px solid #E5E7EA'}
                        />
                    </InputGroup>
                    {formik.touched.password && formik.errors.password && (
                    <Text color="red" fontSize='0.8rem'>{formik.errors.password}</Text>
                    )}
                </Field.Root>
    
                <Button
                    disabled={isLoading}
                    loadingText='signing up.....'
                    loading={isLoading}
                    bgColor='bg-secondary'
                    _hover={{bgColor: 'blue.600'}}
                    color='white'
                    type='submit'
                    fontSize='1rem'
                    cursor='pointer'
                >
                    Sign up
                </Button>
            </Grid>
        </form>
    )
}

export default SignupForm