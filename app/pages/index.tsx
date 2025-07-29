import { useEffect} from "react"
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/event');
  }, []);
};

export default Home;
