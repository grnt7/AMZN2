import { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This runs in the user's browser, NOT on Vercel's server
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Client-side fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>

      <Header />

      <main className="max-w-screen-2xl mx-auto">
        <Banner />
        {loading ? (
          <div className="flex justify-center p-10">
            <p className="text-xl animate-pulse">Loading Products...</p>
          </div>
        ) : (
          <ProductFeed products={products} />
        )}
      </main>
    </div>
  );
}

// REMOVE OR COMMENT OUT getServerSideProps ENTIRELY
// export async function getServerSideProps(context) { ... }