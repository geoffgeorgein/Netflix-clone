import React, { useEffect, useState } from 'react'
import './PlanScreen.css'
import db from './firebase';

function PlanScreen() {

  const [products,setproducts]=useState([]);

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

  console.log(products);

  const loadCheckout=async (priceId)=>{

  };

  return (
    <div className='planScreen'>

      {Object.entries(products).map(([productId,productData])=>{

        {/* lpgic */}

        return (
          <div className='planScreen_plan'>
            <div className='planScreen_info'>
              <h5>{productData.name} </h5>
              <h6>{productData.description} </h6>
            </div>
            <button onClick={()=> loadCheckout(productData.prices.priceId)} >Subscribe</button>
          </div>
        )
      })}

    </div>
  )
}

export default PlanScreen;