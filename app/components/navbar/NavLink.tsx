import { FC } from 'react'
import { MdDashboard } from 'react-icons/md'
import { IconType } from 'react-icons';
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { GiPayMoney, GiReceiveMoney, GiTakeMyMoney } from "react-icons/gi";
import { HStack, Box, Text, Icon, Input } from '@chakra-ui/react';
import Link from 'next/link';

export const LinkItems = [
    { name: 'Dashboard', icon: MdDashboard, href: '/pages/main/dashboard' },
    { name: 'Expenses', icon: GiPayMoney, href: '/pages/main/expenses' },
    { name: 'Incomes', icon: GiReceiveMoney, href: '/pages/main/incomes' },
    { name: 'Budget', icon: GiTakeMyMoney, href: '/pages/main/budget' },
]

interface NavLinkProps {
  name: string;
  icon: IconType;
  href: string
}
const NavLinks:FC<NavLinkProps> = ({ name, icon, href }) => {
    return (
      <Link href={href}>
        <HStack fontSize='1.1rem' alignItems='center' px={2} py={1}  rounded={'md'}>
          <Icon as={icon} fill='text-secondary' />
          <Text color="bg-secondary">{name}</Text>
        </HStack>
      </Link>
    )
}

export default NavLinks
