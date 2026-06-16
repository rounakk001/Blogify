import React, { useState } from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useSearchParams } from "react-router-dom";

function Header() {

  const authStatus = useSelector((state) => state.auth.status)

  const [menuOpen, setmenuOpen] = useState(false);

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
          {authStatus &&
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
          }

          <div className="flex items-center gap-4">

            {authStatus && (
              <>
                {/* Mobile Search Icon */}
                <button className="md:hidden text-theme-secondary hover:text-theme-text transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>

                {/* Desktop Search */}
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
                  className="hidden md:block w-64 px-4 py-2 border border-theme-border rounded-full text-sm focus:outline-none"
                />
              </>
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

            {authStatus && <LogoutBtn />}

            {authStatus && (
              <button
                onClick={() => setmenuOpen(!menuOpen)}
                className="md:hidden text-theme-text"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {menuOpen ? (
                    <>
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </>
                  ) : (
                    <>
                      <line x1="3" y1="12" x2="21" y2="12"></line>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <line x1="3" y1="18" x2="21" y2="18"></line>
                    </>
                  )}
                </svg>
              </button>
            )}

          </div>
        </nav>
        {authStatus && menuOpen && (
          <div className="md:hidden border-t border-theme-border py-4">
            <div className="flex flex-col gap-4">

              {navItems
                .filter(item => !item.isAction)
                .map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.slug}
                    onClick={() => setmenuOpen(false)}
                    className="text-theme-text font-medium"
                  >
                    {item.name}
                  </NavLink>
                ))}

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
                className="w-full px-4 py-2 border border-theme-border rounded-full"
              />
            </div>
          </div>
        )}
        
      </Container>
    </header>
  )
}

export default Header