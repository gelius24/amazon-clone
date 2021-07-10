import React from "react";
import Image from "next/image";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import {signIn, signOut, useSession} from 'next-auth/client'
import {useRouter} from 'next/router'
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";

function Header() {
  const [session] = useSession()
  const router = useRouter()
  const items = useSelector(selectItems)

  return (
    <header className="sticky top-0 z-50">
      <div className="flex items-center bg-amazon_blue">
        <div className="flex mt-2 items-center flex-grow sm:flex-grow-0">
          <div className='cursor-pointer' onClick={() => router.push('/')}>
            <h1 className="text-white ml-1 p-1 pb-0 flex-grow py-2">AMAZON</h1>
          <p className="text-xs text-white ml-1 p-1 pt-0 pb-5 flex-grow ">Clone</p>
          </div>
        </div>
        <div className="hidden sm:flex h-10 items-center flex-grow rounded-md bg-yellow-400 hover:bg-yellow-500 cursor-pointer">
          <input
            className="p-2 h-full w-6 flex-grow rounded-l-md flex-shrink focus:outline-none px-4"
            type="text"
          />
          <SearchIcon className="h-12 p-4" />
        </div>
        <div className="flex items-center text-xs space-x-6 mx-6 whitespace-nowrap text-white">
          <div className="link" onClick={!session ? signIn : signOut}>
            <p>
              {session ? `Hello ${session.user.name}` : 'Connecte toi'}
            </p>
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div>
          <div onClick={() => session && router.push('/orders')} className="link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>
          <div className="relative link flex items-center" onClick={() => router.push('/checkout')}>
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
              {items.length}
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline font-extrabold md:text-sm mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>
      <div className='flex p-2 pl-6 space-x-3 items-center bg-amazon_blue-light text-white text-sm'>
          <p className='link flex items-center'>
            <MenuIcon className="h-6 mr-1" /> All
          </p>
          <p className='link'>Prime Video</p>
          <p className='link'>Amazon Buisness</p>
          <p className='link'>Today's Deals</p>
          <p className='link hidden lg:inline-flex'>Electronics</p>
          <p className='link hidden lg:inline-flex'>Food & Grocery</p>
          <p className='link hidden lg:inline-flex'>Prime</p>
          <p className='link hidden lg:inline-flex'>Buy Again</p>
          <p className='link hidden lg:inline-flex'>Shopper Toolkit</p>
          <p className='link hidden lg:inline-flex'>Health & Personal Care</p>

        </div>
    </header>
  );
}

export default Header;
