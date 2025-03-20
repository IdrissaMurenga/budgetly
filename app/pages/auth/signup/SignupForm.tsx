'use client'
import {useState} from 'react'
import { InputGroup } from '@/components/ui/input-group'
import { Image, Text, Button, Flex, Field, Input, Grid } from '@chakra-ui/react'
import { MdOutlineEmail } from 'react-icons/md'
import Link from 'next/link'
import { CiLock } from 'react-icons/ci'
import { LuEye, LuEyeClosed } from 'react-icons/lu'

const SignupForm = () => {
    const [showPassword, setShowPassword] = useState(false)
  
    const handleShowPassword = () => setShowPassword(!showPassword)
  return (
    <Grid alignContent='center' justifyItems='center' bgColor='bg-primary' w='780px' color='text-primary'>
      <Grid alignContent='center' justifyItems='center'>
        <Image src='/logo.png' alt='logo image' w='85px' />
        <Text
          textAlign='center'
          fontSize='text-lg'
          fontWeight='bold'
          pt='28px'
          pb='45px'
          w='364px'
        >
          Create an account and manage your budget with ease!
        </Text>
      </Grid>

      <form>
        <Grid gap='20px'>
          <Flex>
            <Field.Root required>
              <Field.Label>
                <Text fontWeight='bold'>FirstName</Text>
                <Field.RequiredIndicator />
              </Field.Label>
              <InputGroup flex='1' startElement=''>
                <Input
                  type='text'
                  placeholder='First name'
                  w='174px'
                  h='48px'
                  bgColor='white'
                  border='1px solid #E5E7EA'
                />
              </InputGroup>
            </Field.Root>

            <Field.Root required>
              <Field.Label>
                <Text fontWeight='bold'>Last Name</Text>
                <Field.RequiredIndicator />
              </Field.Label>
              <InputGroup flex='1' startElement=''>
                <Input
                  type='text'
                  placeholder='Last Name'
                  w='174px'
                  h='48px'
                  bgColor='white'
                  border='1px solid #E5E7EA'
                />
              </InputGroup>
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
          <Flex gap='0.3rem' fontSize='text-base'>
            <Text color='text-third'>Do you have an account?</Text>
            <Link href='/pages/auth/login'>
              <Text color='text-secondary'>Login</Text>
            </Link>
          </Flex>
          <Button bgColor='btn-bg-primary' color='white' fontWeight='bold' fontSize='text-lg' type='submit'>Sign up</Button>
        </Grid>
      </form>
    </Grid>
  )
}

export default SignupForm
