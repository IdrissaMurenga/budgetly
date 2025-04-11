
import { FC } from 'react'
import { MdDashboard } from 'react-icons/md'
import { IconType } from 'react-icons';
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { GiPayMoney, GiReceiveMoney, GiTakeMyMoney } from "react-icons/gi";
import { Link,HStack, Box, Text, Icon, Input } from '@chakra-ui/react';

export const LinkItems = [
    { name: 'Dashboard', icon: MdDashboard },
    { name: 'transactions', icon: FaMoneyBillTransfer },
    { name: 'Expenses', icon: GiPayMoney },
    { name: 'Budget', icon: GiTakeMyMoney },
    { name: 'Incomes', icon: GiReceiveMoney },
]

interface NavLinkProps {
  name: string;
  icon: IconType;
}
const NavLinks:FC<NavLinkProps> = ({ name, icon }) => {
    return (
      <Link px={2} py={1} rounded={'md'} href={'#'}>
        <HStack fontSize='1.1rem' alignItems='center'>
          <Icon as={icon} fill='text-secondary' />
          <Text color="bg-secondary">{name}</Text>
        </HStack>
      </Link>
    )
}

export default NavLinks
