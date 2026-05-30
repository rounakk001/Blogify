import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {

  const authStatus = useSelector((state) => state.auth.status)

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: 'Login',
      slug: "/login",
      active: !authStatus
    },
    {
      name: 'Signup',
      slug: "/signup",
      active: !authStatus
    },
    {
      name: 'Your Posts',
      slug: "/all-posts",
      active: authStatus
    },
    {
      name: 'Add Post',
      slug: "/add-post",
      active: authStatus
    }
  ]

  return (
    <div className='border-b border-gray-600 bg-gray-500 shadow-sm'>
      <Container>
        <nav className='flex items-center py-2'>

          {/* Logo */}
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>

          {/* Navigation Links */}
          <ul className='ml-auto flex items-center gap-2'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <NavLink
                    to={item.slug}
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${isActive
                        ? "bg-blue-500 text-white"
                        : "text-white hover:bg-gray-600"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ) : null
            )}

            {/* Logout Button */}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

        </nav>
      </Container>
    </div>
  )
}

export default Header