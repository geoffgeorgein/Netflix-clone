import React, { useEffect, useState } from 'react'
import './PlanScreen.css'
import db from './firebase';

import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import { loadStripe } from '@stripe/stripe-js';

function PlanScreen() {

  const [products,setproducts]=useState([]);
  const user=useSelector(selectUser);
  const [subscription,setsubscription]=useState(null);

  useEffect(()=>{

    db.collection('customers')
    .doc(user.uid)
    .collection('subscriptions')
    .get()
    .then(querySnapshot=>{

        querySnapshot.forEach(async subscription =>{

          setsubscription({
              role:subscription.data().role,
              current_period_end:subscription.data().current_period_end.seconds,
              current_period_start:subscription.data().current_period_start.seconds
          })
        })
    })

    
    
  },[user.uid]);
  



  useEffect(()=>{

    db.collection('products')
    .where("active",'==',true)
    .get()
    .then((querySnapshot)=>{

        const products={};

        querySnapshot.forEach(async (productDoc)=>{

          products[productDoc.id]=productDoc.data();
          const priceSnap=await productDoc.ref.collection('prices').get();
          priceSnap.docs.forEach(price=>{
              products[productDoc.id].prices={

                priceId:price.id,
                priceData:price.data()
              }
          })
        });
        setproducts(products);
    });
  },[]);

  // console.log(products);

  

  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection("customers")
      
      .doc(user.uid)
      .collection( "checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });
      
   

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        // Show an error to a customer and inspect your
        // Cloud functions logs in the firebase console.
        alert(`An error occurred: ${error.message}`);
      }
      if (sessionId) {
        // We have a session, let's redirect to Checkout
        // Init Stripe
        const stripe = await loadStripe(
          "pk_test_51MqZtnSB1lrU4p0TzCkzcrjIrTnzC39k7jR9RiEUyYw0AUkqnko0TFkcIrHaeoEVPzSdVuoVQRSpC2ixthY4Ihi0004bwksvy8"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className='planScreen'>

            <br/>
            {subscription && (
              <p className="plansScreen__renewal">
                Renewal date:{" "}
                {new Date(subscription?.current_period_end * 1000).toLocaleDateString(
                  "CS-cs"
                )}
              </p>
            )}

      {Object.entries(products).map(([productId,productData])=>{

        const isCurrentPackage=productData.name
        ?.toLowerCase()
        .includes(subscription?.role.toLowerCase());
        {/* console.log("product Data");
        console.log(isCurrentPackage);
        console.log("name");
        console.log(productData.name);
        console.log("role");
        console.log(subscription?.role); */}

        return (
          <div className={`${
              isCurrentPackage && "planScreen_plan--disabled"
            } planScreen_plan`}
          >
            <div className='planScreen_info'>
              <h5>{productData.name} </h5>
              <h6>{productData.description} </h6>
            </div>
            <button onClick={()=> !isCurrentPackage && loadCheckout(productData.prices.priceId)} > 
            {isCurrentPackage?"Current Package":"Subscribe"} </button>
          </div>
        )
      })}

    </div>
  )
}

export default PlanScreen;