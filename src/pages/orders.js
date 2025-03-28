import Header from "../components/Header"
import { useSession, getSession } from "next-auth/react";
import { db } from "../../firebase"; // Adjust the path as needed
console.log("db after import:", db);
import moment from "moment";
import Order from "../pages/order";

function orders({ orders }) {

        const {session} = useSession(); // Get session data


  return (
    <div>
        <Header/>
        <main className="max-w-screen-lg  mx-auto p-10">
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
                    ({
                    id,
                    amount,
                    amountShipping,
                    images,
                    timestamp,
                    items,
                    }
                ) => (
                    <Order/>
                )
            )}
            </div>
        </main>
    </div>
  );
}

export default orders;

export async function getServerSideProps(context) {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    // Get the user's logged-in credentials...
    const session = await getSession(context);

    if (!session || !session.user || !session.user.email) { // Added checks
        console.error("Session or user email is missing:", session);
        return {
            props: {},
        };
    }

    // Firebase db
    try {
        const stripeOrders = await db
            .collection("users")
            .doc(session.user.email)
            .orderBy("timestamp", "desc")
            .get();

        // Stripe orders
        const orders = await Promise.all(
            stripeOrders.docs.map(async (order) => ({
                id: order.id,
                amount: order.data().amount,
                amountShipping: order.data().amount_shipping,
                images: order.data().images,
                timestamp: moment(order.data().timestamp.toDate()).unix(),
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

    } catch (error) {
        console.error("Error fetching orders:", error);
        return {
            props: {},
        };
    }
}