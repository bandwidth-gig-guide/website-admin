import Head from 'next/head';
import { useRouter } from 'next/router';
import { ROUTES_NEW_PAGES } from "../constants/routes";

const Home = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Bandwidth Admin</title>
        <meta name="description" content="" />
      </Head>

      {ROUTES_NEW_PAGES.map((route, index) => (
        <button key={index} onClick={() => router.push(route.href)}>
          {route.label}
        </button>
      ))}

    </>
  )
};

export default Home;
