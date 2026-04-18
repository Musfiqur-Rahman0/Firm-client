import React from 'react'
import { Outlet } from 'react-router-dom'

export const AuthLayout = () => {
  return (
    <div>
        <h2>AuthLayout</h2>
        <p>This is the authentication layout. It can be used for login, register, and other auth-related pages.</p>

            <Outlet/>

        <p>footer</p>    
        </div>
  )
}
