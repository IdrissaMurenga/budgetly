'use client'
import Link from "next/link"
import { IconType } from "react-icons";
import { GoGoal } from "react-icons/go";
import { MdSpaceDashboard } from "react-icons/md";
import { HStack, Text, Icon } from "@chakra-ui/react";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { HiDocument } from "react-icons/hi2";
import { usePathname } from "next/navigation";
export const LinkItems = [
    { icon:MdSpaceDashboard ,name: 'Dashboard', href: '/pages/main/dashboard' },
    { icon:FaMoneyBillTransfer ,name: 'Transactions', href: '/pages/main/transactions' },
    { icon:HiDocument ,name: 'Reports', href: '/pages/main/reports' },
    { icon:GoGoal ,name: 'Goals', href: '/pages/main/goals' },
]
interface NavLinkProps {
    name: string;
    href: string;
    icon: IconType;
}

const NavLink = ({ name, href, icon }: NavLinkProps) => {
    const pathname = usePathname();
    const isActive = pathname === href;
    return (
        <Link href={href}>
            <HStack alignItems='center' gap='.5rem' pb={{base: '1rem', md:'0'}}>
                <Icon 
                    as={icon}
                    size='md'
                    fill={isActive ? 'bg-secondary' : 'text-third'}
                />
                <Text
                    color={isActive ? 'text-primary' : 'text-third'}
                    fontWeight={isActive ? 'bold' : 'normal'}
                    fontSize='md'
                >
                    {name}
                </Text>
            </HStack>
        </Link>
    )
}
export default NavLink
