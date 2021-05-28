import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { selectUserId, subscribe } from "../features/user/userSlice";
import db from "../firebase";

const Plans = () => {
  // const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const [products, setProducts] = useState([]);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    db.collection("customers")
      .doc(userId)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start:
              subscription.data().current_period_start.seconds,
          });
        });
      });
  }, [userId]);

  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref
            .collection("prices")
            .get("price");
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
      });
  }, []);

  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection("customers")
      .doc(userId)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        // Show an error to your customer and inspect your cloud function logs in the firebase console.
        alert(`An error occured: ${error.message}`);
      }

      if (sessionId) {
        // We have a session, lets redirect to checkout and initialize stripe.

        const stripe = await loadStripe(
          process.env.REACT_APP_STRIPE_PUBLIC_API_KEY
        );

        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className="border-t border-gray-200 my-1">
      {subscription && (
        <p>
          Renewal date:{" "}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        // Logic to check if user's subscription plan is active...
        const isCurrentSubscription = productData.name
          ?.toLowerCase()
          .includes(subscription?.role.toLowerCase());

        return (
          <div
            key={productId}
            className="flex items-center justify-between p-4 opacity-80 hover:opacity-100"
          >
            <div className="">
              <h5 className="font-semibold">{productData.name}</h5>
              <h6 className="text-xs">{productData.description}</h6>
            </div>

            <button
              onClick={() =>
                !isCurrentSubscription &&
                loadCheckout(productData.prices?.priceId)
              }
              className={`p-2 ml-7 bg-gray-500 rounded-sm text-sm font-semibold border-none ${
                isCurrentSubscription && "cursor-not-allowed bg-red-500"
              }`}
            >
              {isCurrentSubscription ? "Subscribed" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Plans;
