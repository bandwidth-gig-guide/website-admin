import React from 'react'
import { useRouter } from 'next/router'
import styles from './Header.module.css'

const routes = [
  { label: "Events", type: 'event', href: "/event" },
  { label: "Artists", type: 'artist', href: "/artist" },
  { label: "Venues", type: 'venue', href: "/venue" },
  { label: "Images", type: 'image', href: "/images" },
];

const toggles = [
  { label: "json", src: "/json-object.svg" },
  { label: "Original Post", src: "/original-post.svg" },
  { label: "Ticket Sale", src: "/ticket-sale.svg" },
]

const Header = () => {
  const router = useRouter();
  const { id } = router.query;
  const { pageType } = router.query;
  const pageTypeLabel = routes.find(route => router.pathname.startsWith(route.href))?.type || pageType;

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
        {id && (
          <div className={styles.toggles}>
            {toggles.map(toggle => (
              <img
                src={toggle.src}
                alt={toggle.label}
                title={toggle.label}
                key={toggle.label}
              />
            ))}
          </div>
        )}
        </header>
    </div>
  )
}

export default Header
