import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";

export default function Home({products}) {
  return (
    <div className="bg-grey-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>
   
    {/*Header*/ }
    <Header/>

  <main className="max-w-screen-2xl mx-auto">
    {/*Banner */}
    <Banner/>
    {/* ProductFeed */}
   <ProductFeed products = {products}/>
   
  </main>
    </div>
  );
}

export async function getServerSideProps(context) {
try {
    const res = await fetch("https://fakestoreapi.com/products");
    
    if (!res.ok) {
      // This will show up in your Vercel "Function Logs"
      console.error(`API Fetch Error: Status ${res.status}`);
      return { props: { products: [] } };
    }

    const products = await res.json();
    return { props: { products } };

  } catch (error) {
    // This catches network timeouts or DNS issues
    console.error("Fetch failed entirely:", error);
    return { props: { products: [] } };
  }
}

 





