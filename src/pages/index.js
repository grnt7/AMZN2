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
  const products = await fetch(" https://fakestoreapi.com/products").then(
    (res) => res.json()
  );

  return {
    props: {
      products,
    },
  };
}

 

/*
  {/* ---- TO BEGIN, delete this section and GET CODING!!! ---- }
  <center className="grid place-items-center mt-10">
  <h1 className="text-5xl">Lets build Amazon 2.0</h1>
  <h2>This is your starter template!</h2>
  <br />
  <h3 className="font-bold">
    We will be using Next.js / Tailwind CSS / Redux / Firebase / NextAuth
  </h3>
  <i>(Dont worry, its all setup and ready to use!)</i>
  <h4>Get Ready, Get Set, GO!!!</h4>

  <h5 className="mb-10">#PAPAFAM</h5>

  <div className="bg-red-300 p-10">
    <p className="font-bold">
      Dont forget to register for the challenge here!
    </p>
    <p>👇👇👇</p>
    <a
      href="https://www.papareact.com/secret-challenge"
      className="text-blue-400 underline p-3 font-bold"
    >
      CLICK HERE TO REGISTER NOW
    </a>
  </div>

  <p className="mt-24">Built with 💙 by Sonny Sangha (PAPA REACT)</p>
</center>
{ ---- ---- }




*/