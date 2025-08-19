import { FC } from "react"
import { Text, Button, Flex, Field, Input, Grid, InputGroup, Checkbox } from "@chakra-ui/react"
import { MdOutlineEmail } from 'react-icons/md'
import { CiLock } from 'react-icons/ci'
import { LuEye, LuEyeClosed } from 'react-icons/lu'
import useLogin from "../hooks/useLogin"
interface Props {
    showPassword: boolean;
    handleClick: () => void;
}

const LoginForm: FC<Props> = ({ showPassword, handleClick }) => {
    const { formik, isLoading } = useLogin()
    return (
        <form noValidate onSubmit={formik.handleSubmit}>
            <Grid gap='20px' color='text-primary' >
                <Field.Root required>
                    <Field.Label>
                        <Text fontWeight='bold'>Email</Text>
                        <Field.RequiredIndicator />
                    </Field.Label>
                    <InputGroup flex='1' startElement={<MdOutlineEmail size='16' />}>
                        <Input
                            type='email'
                            name='email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder='Enter your email'
                            w='365px'
                            h='48px'
                            bgColor='white'
                            border={formik.touched.email && formik.errors.email ? '1px solid red' : '1px solid #E5E7EA'}
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
                            border={formik.touched.password && formik.errors.password ? '1px solid red' : '1px solid #E5E7EA'}
                        />
                    </InputGroup>
                    {formik.touched.password && formik.errors.password && (
                    <Text color="red" fontSize='0.8rem'>{formik.errors.password}</Text> 
                    )} 
                </Field.Root>

                <Flex justifyContent='space-between' color='text-primary'>
                    <Checkbox.Root>
                        <Checkbox.Label>
                            Remember me
                        </Checkbox.Label>
                    </Checkbox.Root>
                    <Text fontSize='0.9rem' cursor='pointer'>Forgot Password?</Text>
                </Flex>
                <Button
                    disabled={isLoading}
                    loadingText='signing in.....'
                    loading={isLoading}
                    type='submit' 
                    bgColor='bg-secondary'
                    _hover={{ bgColor: 'blue.600' }}
                    color='white' 
                    fontWeight='medium' 
                    fontSize='1rem'
                >
                    Sign in
                </Button>
            </Grid>
        </form>
    )
}

export default LoginForm

