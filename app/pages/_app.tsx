import Head from 'next/head';
import { useState } from 'react';
import '../styles/global.css';
import type { AppProps } from 'next/app';
import { LocationScope } from '../types/enums/LocationScope';
import Header from '../components/Header/Header';

function MyApp({ Component, pageProps }: AppProps) {
	const [location, setLocation] = useState<LocationScope>(LocationScope.Melbourne);

	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta charSet="utf-8" />
			</Head>
			<div className='app-wrapper'>
				<Header />
				<main><Component {...pageProps} /></main>
			</div>
		</>
	);
}

export default MyApp;
