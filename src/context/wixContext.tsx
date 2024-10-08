"use client"
import { createClient, OAuthStrategy } from "@wix/sdk";
import { products,collections } from "@wix/stores";
import Cookies from "js-cookie"
import { createContext } from "react";


const refreshToken = JSON.parse(Cookies.get('refreshToken') || "{}");


const myWixClient = createClient({
    modules: {
      products,
      collections
    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      tokens: {
        refreshToken,
        accessToken : {
          value: "",
          expiresAt: 0,
        }
        }
      })
  })
  
export type MyWixClient = typeof myWixClient;

export const wixClientContext = createContext<MyWixClient>(myWixClient);

export const WixClientContextProvider = ({ children }: { children: React.ReactNode }) => {
    return (
      <wixClientContext.Provider value={myWixClient}>
        {children}
      </wixClientContext.Provider>
    );
};