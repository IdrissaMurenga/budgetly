'use client'
import { useState } from 'react'
import { InputGroup } from '@/components/ui/input-group'
import { Box, Image, Text, Button, Flex, Field, Input, Grid } from '@chakra-ui/react'
import { Checkbox } from '@/components/ui/checkbox'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import Link from 'next/link'
import { MdOutlineEmail } from 'react-icons/md'
import { CiLock } from 'react-icons/ci'
import { LuEye, LuEyeClosed } from 'react-icons/lu'

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword = () => setShowPassword(!showPassword)

  return (
    <Grid alignContent='center' justifyItems='center' bgColor='bg-primary' w='780px' color='text-primary'>
      <Grid w='324px' alignContent='center' justifyItems='center'>
        <Image src='/logo.png' alt='logo image' w='85px' />
        <Text textAlign='center' fontSize='text-lg' fontWeight='bold' pt='28px' pb='22px'>Welcome Back 🙂. Login to continue</Text>
        <Button fontWeight='bold' border='1px solid #E5E7EA' px='40px' py='12px'><FcGoogle /> Login with Google</Button>
        <Text mx='0.5rem' pt='20px' fontWeight='bold' textAlign='center'> ---------  or  --------- </Text>
      </Grid>

      <form>
        <Grid gap='20px'>
          <Field.Root required>
            <Field.Label>
              <Text fontWeight='bold'>Email</Text>
              <Field.RequiredIndicator />
            </Field.Label>
            <InputGroup flex='1' startElement={<MdOutlineEmail size='16' />}>
              <Input
                type='text'
                placeholder='Enter your email'
                w='365px'
                h='48px'
                bgColor='white'
                border='1px solid #E5E7EA'
              />
            </InputGroup>
          </Field.Root>

          <Field.Root required>
            <Field.Label>
              <Text fontWeight='bold'>Password</Text>
              <Field.RequiredIndicator />
            </Field.Label>
            <InputGroup flex='1' startElement={<CiLock size='16' color='text-third' />} endElement={
              <Button onClick={handleShowPassword} variant='plain'>
                {showPassword ? <LuEye size='16' color='text-third'/> : <LuEyeClosed size='16' color='text-third'/>}
              </Button>
            }>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder='************'
                w='365px'
                h='48px'
                bgColor='white'
                border='1px solid #E5E7EA'
              />
            </InputGroup>
          </Field.Root>

          <Flex justifyContent='center' gap='0.3rem' fontSize='text-base'>
            <Text color='text-third'>Don't you have an account?</Text>
            <Link href='/pages/auth/signup'>
              <Text color='text-secondary'>Sign up</Text>
            </Link>
          </Flex>

          <Flex justifyContent='space-between' color='text-secondary'>
            <Checkbox>Remember me</Checkbox>
            <Text fontSize='text-base'>Forgot Password?</Text>
          </Flex>
          <Button type='submit' bgColor='btn-bg-primary' color='white' fontWeight='bold' fontSize='text-lg'>Login</Button>
        </Grid>
      </form>
    </Grid>
  )
}

export default LoginForm
