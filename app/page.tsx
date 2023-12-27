import Hero from "./components/Hero";
import Newest from "./components/Newest";

function Home() {
  return (
    <div className="pb-6 bg-white sm:pb-8 lg:pb-12">
      <Hero />
      <Newest />
    </div>
  );
}

export default Home;
