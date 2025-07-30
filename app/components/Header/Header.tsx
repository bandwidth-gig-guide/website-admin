import React from 'react'
import { useRouter } from 'next/router'
import styles from './Header.module.css'

const routes = [
  { label: "Events", href: "/event" },
  { label: "Artists", href: "/artist" },
  { label: "Venues", href: "/venue" },
];

const Header = () => {
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <header>
        <h1>Bandwidth Admin</h1>
        <nav>
          {routes.map(route => {
            const isActive = router.pathname.startsWith(route.href);
            return (
              <a
                key={route.href}
                href={route.href}
                className={`${styles.link} ${isActive ? styles.active : ''}`}
              >
                {route.label}
              </a>
            );
          })}
        </nav>
      </header>
    </div>
  )
}

export default Header
