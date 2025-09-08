import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'

// Styling
import styles from './Header.module.css'

// Constants
import { CURRENT_TOGGLE_KEY } from '../../constants/localstorage';
import { TOGGLES } from '../../constants/toggles';
import { ROUTES } from '../../constants/routes';

interface Props {
  currentToggle: string | null;
  setCurrentToggle: React.Dispatch<React.SetStateAction<string | null>>;
  availableToggleIds: string[];
}


const Header: React.FC<Props> = ({ currentToggle, setCurrentToggle, availableToggleIds }) => {
  const router = useRouter();
  const { id } = router.query;

  const handleToggleClick = (toggleId: string) => {
		setCurrentToggle(prev => (prev === toggleId ? null : toggleId));
	};

  return (
    <div className={styles.wrapper}>
      <header>
        <h1 onClick={() => router.push("/")}>Bandwidth Admin</h1>

        {/* Nav Bar */}
        <nav>
          {ROUTES.map(route => {
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

        {/* Toggles */}
        {id && (
          <div className={styles.toggles}>
            {availableToggleIds.map(toggleId => {
              const toggle = TOGGLES.find(toggle => toggle.id === toggleId);
              if (!toggle) return null;
              const isActive = currentToggle === toggle.id;
              return (
                <img
                  src={toggle.src}
                  alt={toggle.label}
                  title={toggle.label}
                  key={toggle.label}
                  className={isActive ? styles.activeToggle : ''}
                  onClick={() => handleToggleClick(toggle.id)}
                />
              );
            })}
          </div>
        )}

        {/* Search Bar */}
        <div className={styles.searchBar}>
          [ Search Bar ]
        </div>

      </header>
    </div>
  )
}

export default Header
