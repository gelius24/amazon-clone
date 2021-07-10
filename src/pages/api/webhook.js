import { buffer } from "micro";
import * as admin from "firebase-admin";

//secure a connexion to firebase from the backend
const serviceAccount = require("../../../permission.json"); // This is an import
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

//establlish connexion to STRIPE
const stripe = require("stripe")(process.env.stripe_secret_key); // This is an import

const endpointSecret = process.env.stripe_singing_secret;

const fulfillOrder = async (session) => {
    // console.log('fulfilling order', session)
    return app.firestore().collection('users').doc(session.metadata.email).collection('orders').doc(session.id).set({
        amount: session.amount_total / 100,
        amount_shipping: session.total_details.amount_shipping / 100,
        images: JSON.parse(session.metadata.images),
        timestamp: admin.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        console.log(`SUCCESS: Order ${session.id} had been added to the DB`)
    })
}

export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];

    let event;
    //verify that the event posted came from stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.log("ERREUR", err);
      return res.status(400).send(`Webhook error: ${err.message}`);
    }

    //Handle checkout.session completed event
    if(event.type === 'checkout.session.completed'){
        const session = event.data.object;
        // fulfill the order... put it in a database
        return fulfillOrder(session).then(() => res.status(200)).catch(err => res.status(400).send(`Webhook Error: ${err.message}`))
    }
  }
};

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true
    }
}
