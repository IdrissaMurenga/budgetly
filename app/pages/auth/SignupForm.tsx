'use client'
import * as Yup from 'yup' 
import { FC } from 'react'
import { InputGroup } from '@/components/ui/input-group'
import { Text, Button, Flex, Field, Input, Grid } from '@chakra-ui/react'
import { MdOutlineEmail } from 'react-icons/md'
import { CiLock } from 'react-icons/ci'
import { LuEye, LuEyeClosed } from 'react-icons/lu'
import { useMutation } from '@apollo/client'
import { useFormik } from 'formik'

interface Props {
  showPassword: boolean;
  handleClick: () => void;
}

const SignupForm: FC<Props> = ({showPassword, handleClick}) => {


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
    onSubmit: async (values) => {
        try {
            // const { data } = await signup({ variables:{ input:  values }})
            // console.log(data)
        } catch (error) {
            console.error(error)
        }
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid gap='20px' color='text-primary'>
        <Flex>
          <Field.Root required>
            <Field.Label>
              <Text fontWeight='bold'>FirstName</Text>
              <Field.RequiredIndicator />
            </Field.Label>
            <InputGroup flex='1' startElement=''>
              <Input
                type='text'
                name='firstName'
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder='First name'
                w='174px'
                h='48px'
                bgColor='white'
                border={formik.errors.firstName ? '1px solid red' : '1px solid #E5E7EA'}
              />
            </InputGroup>
            {formik.touched.firstName && formik.errors.firstName && (
              <Text color="red" fontSize='0.8rem'>{formik.errors.firstName}</Text>
            )}
          </Field.Root>

          <Field.Root required>
            <Field.Label>
              <Text fontWeight='bold'>Last Name</Text>
              <Field.RequiredIndicator />
            </Field.Label>
            <InputGroup flex='1' startElement=''>
              <Input
                type='text'
                name='lastName'
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder='Last Name'
                w='174px'
                h='48px'
                bgColor='white'
                border={formik.errors.lastName ? '1px solid red' : '1px solid #E5E7EA'}
              />
            </InputGroup>
            {formik.touched.lastName && formik.errors.lastName && (
              <Text color="red" fontSize='0.8rem'>{formik.errors.lastName}</Text>
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
              border={formik.errors.email ? '1px solid red' : '1px solid #E5E7EA'}
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
              border={formik.errors.password ? '1px solid red' : '1px solid #E5E7EA'}
            />
          </InputGroup>
          {formik.touched.password && formik.errors.password && (
            <Text color="red" fontSize='0.8rem'>{formik.errors.password}</Text>
          )}
        </Field.Root>

        <Button bgColor='btn-bg-primary' color='white' type='submit' fontSize='1rem' cursor='pointer'>Sign up</Button>
      </Grid>
    </form>
  )
}

export default SignupForm
