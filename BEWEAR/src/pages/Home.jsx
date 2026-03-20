import Hero from "../components/Hero";
import ProductList from "../components/ProductList";
import Shopbycategory from "../components/Shopbycategory";
import Productssection from "../components/Productssection";

function Home() {
  return (
    <>
      <Hero />
      <Shopbycategory />
      <Productssection />
      {/* <ProductList /> */}
    </>
  );
}

export default Home;