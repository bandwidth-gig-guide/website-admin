import React, { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'

// Styling
import styles from './Header.module.css'

// Constants
import { CURRENT_TOGGLE_KEY } from '../../constants/localstorage';
import { TOGGLES } from '../../constants/toggles';
import { ROUTES } from '../../constants/routes';


const Header = () => {
  const router = useRouter();
  const { id } = router.query;
  const [currentToggle, setCurrentToggle] = useState<string | null>(null);
  const availableToggleIds = ROUTES.find(route => router.pathname.startsWith(route.href))?.toggles ?? [];

  const handleToggleClick = (toggleId: string) => {
    setCurrentToggle(prev => (prev === toggleId ? null : toggleId));
  };

  // Keyboard navigation for toggles
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!id || availableToggleIds.length === 0) return;

    if (e.shiftKey && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
      e.preventDefault();
      const currentIdx = availableToggleIds.indexOf(currentToggle ?? '');

      if (e.key === 'ArrowLeft') {
        if (currentToggle === null) {
          setCurrentToggle(availableToggleIds[availableToggleIds.length - 1]);
        } else if (currentIdx === 0) {
          setCurrentToggle(null);
        } else if (currentIdx > 0) {
          setCurrentToggle(availableToggleIds[currentIdx - 1]);
        }
      }

      else if (e.key === 'ArrowRight') {
        if (currentToggle === null) {
          setCurrentToggle(availableToggleIds[0]);
        } else if (currentIdx === availableToggleIds.length - 1) {
          setCurrentToggle(null);
        } else if (currentIdx >= 0 && currentIdx < availableToggleIds.length - 1) {
          setCurrentToggle(availableToggleIds[currentIdx + 1]);
        }
      }
    }
  }, [id, availableToggleIds, currentToggle]);

  // Load current toggle from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentToggle(localStorage.getItem(CURRENT_TOGGLE_KEY));
    }
  }, []);

  // Update localStorage when currentToggle changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (currentToggle) {
        localStorage.setItem(CURRENT_TOGGLE_KEY, currentToggle);
      } else {
        localStorage.removeItem(CURRENT_TOGGLE_KEY);
      }
    }
  }, [currentToggle]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className={styles.wrapper}>
      <header>
        <h1>Bandwidth Admin</h1>

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
