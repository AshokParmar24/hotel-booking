import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/stripe/CheckoutForm";

const StripePayment = ({ clientSecrete }) => {
  const options = {
    clientSecret: clientSecrete,
  };

  // Ensure environment variable is correctly accessed
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

  return (
    <>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm />
      </Elements>
    </>
  );
};

export default StripePayment;
