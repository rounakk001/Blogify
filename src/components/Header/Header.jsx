import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useSearchParams } from "react-router-dom";

function Header() {

  const authStatus = useSelector((state) => state.auth.status)
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get("search") || "";

  const navItems = [
    {
      name: 'Blogs',
      slug: "/",
      active: true
    },
    {
      name: 'Your Posts',
      slug: "/all-posts",
      active: true
    },
    {
      name: 'Write',
      slug: "/add-post",
      active: true
    },
    {
      name: 'Login',
      slug: "/login",
      active: !authStatus,
      isAction: true
    },
    {
      name: 'Signup',
      slug: "/signup",
      active: !authStatus,
      isAction: true
    }
  ]

  return (
    <header className='sticky top-0 z-50 w-full bg-theme-bg/95 backdrop-blur-sm border-b border-theme-border'>
      <Container>
        <nav className='flex items-center justify-between py-4'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <Link to='/' className="flex items-center gap-2">
              <Logo width='40px' />

            </Link>
          </div>

          {/* Navigation Links */}
          <ul className='hidden md:flex items-center gap-6'>
            {navItems.filter(item => !item.isAction).map((item) =>
              item.active ? (
                <li key={item.name}>
                  <NavLink
                    to={item.slug}
                    className={({ isActive }) =>
                      `text-md font-medium transition-colors ${isActive
                        ? "text-blue-500"
                        : "text-theme-secondary hover:text-theme-text"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ) : null
            )}
          </ul>

          <div className="flex items-center gap-4">
            {authStatus && (
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => {
                  const value = e.target.value;

                  if (value.trim()) {
                    setSearchParams({ search: value });
                  } else {
                    setSearchParams({});
                  }
                }}
                className="px-4 py-2 border border-theme-border rounded-full text-sm focus:outline-none"
              />
            )}

            <div className="h-4 w-px bg-theme-border mx-1"></div>
            {navItems.filter(item => item.isAction).map((item) =>
              item.active ? (
                <NavLink
                  key={item.name}
                  to={item.slug}
                  className={
                    item.name === "Signup"
                      ? "px-4 py-2 bg-theme-text text-black text-md font-medium rounded-full hover:text-blue-500 transition-colors duration-300"
                      : "text-md font-medium text-theme-secondary hover:text-theme-text transition-colors"
                  }
                >
                  {item.name}
                </NavLink>
              ) : null
            )}

            {/* Logout Button */}
            {authStatus && (
              <LogoutBtn />
            )}
          </div>
        </nav>
      </Container>
    </header>
  )
}

export default Header