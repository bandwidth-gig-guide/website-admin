import Head from 'next/head';
import React, { useState, useEffect, useCallback } from 'react'
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router'

// Styles
import '../styles/global.css';

// Constants
import { CURRENT_TOGGLE_KEY } from '../constants/localstorage';
import { ROUTES } from '../constants/routes';

// Components
import Header from '../components/Header/Header';


function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const { id } = router.query;
	const [currentToggle, setCurrentToggle] = useState<string | null>(null);
	const availableToggleIds = ROUTES.find(route => router.pathname.startsWith(route.href))?.toggles ?? [];

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

	// Ensure currentToggle is always in availableToggleIds
	useEffect(() => {
		if (currentToggle && !availableToggleIds.includes(currentToggle)) {
			setCurrentToggle(null);
			if (typeof window !== 'undefined') {
				localStorage.removeItem(CURRENT_TOGGLE_KEY);
			}
		}
	}, [currentToggle, availableToggleIds]);


	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta charSet="utf-8" />
			</Head>
			<div className='app-wrapper'>
				<Header
					currentToggle={currentToggle}
					setCurrentToggle={setCurrentToggle}
					availableToggleIds={availableToggleIds}
				/>
				<main>
					<Component {...pageProps} currentToggle={currentToggle} />
				</main>
			</div>
		</>
	);
}

export default MyApp;
