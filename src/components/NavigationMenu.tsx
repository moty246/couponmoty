'use client';

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Home, PlusCircle, Settings, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function NavigationMenu() {
  const router = useRouter();

  return (
    <Menubar className="bg-secondary border-b-2">
      <MenubarMenu>
        <MenubarTrigger>תפריט</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => router.push('/')}>
            <Home className="mr-2 h-4 w-4" />
            דף הבית
          </MenubarItem>
          <MenubarSeparator />
           <MenubarItem onClick={() => router.push('/coupons')}>
            <ListChecks className="mr-2 h-4 w-4" />
            רשימת קופונים
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={() => router.push('/coupons/create')}>
             <PlusCircle className="mr-2 h-4 w-4" />
            צור קופון
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={() => router.push('/settings')}>
            <Settings className="mr-2 h-4 w-4" />
            הגדרות
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <Button onClick={() => router.push('/')} variant="ghost">Coupon Harbor</Button>
    </Menubar>
  )
}


