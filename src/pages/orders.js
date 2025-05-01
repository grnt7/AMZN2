import Header from "../components/Header";
import { useSession, getSession } from "next-auth/react";
import { db } from "../../firebase";
import { collection, doc, query, orderBy, getDocs } from 'firebase/firestore';
console.log("db after import:", db);
import moment from "moment";
import Order from "../pages/order";

function orders({ orders }) {
    const { session } = useSession();

    return (
        <div>
            <Header />
            <main className="max-w-screen-lg mx-auto p-10">
                <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
                    Your Orders
                </h1>

                {session ? (
                    <h2>{orders.length} Orders</h2>
                ) : (
                    <h2>Please sign in to view your orders.</h2>
                )}
                <div className="mt-5 space-y-4">
                    {orders?.map(
                        ({ id, amount, amountShipping, images, timestamp, items }) => (
                            <Order
                                key={id} // Add a key prop
                                id={id}
                                amount={amount}
                                amountShipping={amountShipping}
                                images={images}
                                timestamp={timestamp}
                                items={items}
                            />
                        )
                    )}
                </div>
            </main>
        </div>
    );
}

export default orders;

export async function getServerSideProps(context) {
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

    const session = await getSession(context);

    if (!session || !session.user || !session.user.email) {
        console.error("Session or user email is missing:", session);
        return {
            props: {},
        };
    }

    //firebase firestore query
    const ordersRef = collection(doc(collection(db, "users"), session.user.email), "orders");
    const q = query(ordersRef, orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);



    

            const orders = await Promise.all(
                querySnapshot.docs.map(async (order) => ({
                  
                  id: order.id,
                  amount: order.data().amount,
                  amountShipping: order.data().amount_shipping,
                  images: order.data().images,
                  timestamp: moment.unix(order.data().timestamp.seconds).utc().format('MMMM Do YYYY, h:mm a'),
                  items: (
                    await stripe.checkout.sessions.listLineItems(order.id, {
                      limit: 100,
                    })
                  ).data,
                }))
              );

        return {
            props: {
                orders,
            },
        };

}
/*
import { collection, doc, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Assuming your firebase.js export is called db

export async function getServerSideProps(context) {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  // Firebase Firestore query
  const ordersRef = collection(doc(collection(db, "users"), session.user.email), "orders");
  const q = query(ordersRef, orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);

  const orders = await Promise.all(
    querySnapshot.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment.unix(order.data().timestamp.seconds).utc().format('MMMM Do YYYY, h:mm a'),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );

  return {
    props: {
      orders,
    },
  };
}


try {
        const stripeOrders = await db
            .collection("users")
            .doc(session.user.email)
            .orderBy("timestamp", "desc")
            .get();


    } catch (error) {
        console.error("Error fetching orders:", error);
        return {
            props: {},
        };
    }
}

*/