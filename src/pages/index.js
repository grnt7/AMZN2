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
    const res = await fetch("https://fakestoreapi.com/products", {
      headers: {
        // This tells the API "I am a real browser request"
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Accept": "application/json",
      },
    });

    if (!res.ok) {
      console.error(`API Fetch Error: Status ${res.status}`);
      return { props: { products: [] } };
    }

    const products = await res.json();
    return { props: { products } };

  } catch (error) {
    console.error("Fetch failed entirely:", error);
    return { props: { products: [] } };
  }
}