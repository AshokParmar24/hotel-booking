import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { CompletePayment } from "@/service/api"; // Adjust if necessary
import { useRouter } from "next/router";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(""); // State for handling errors
  const [loading, setLoading] = useState(false); // State for loading status
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Reset any previous errors
    setLoading(true); // Start loading state during submission

    // Ensure Stripe.js and Elements are properly loaded
    if (!stripe || !elements) {
      setError("Stripe.js hasn't loaded yet. Please try again later.");
      setLoading(false);
      return;
    }

    // Confirm payment with Stripe
    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/settings", // Redirect URL after 3D Secure confirmation
      },
      redirect: "if_required", // Handle redirection only if necessary
    });

    // Handle any Stripe errors
    if (stripeError) {
      setError(stripeError?.message);
    } else {
      console.log("paymentIntent :>> ", paymentIntent);
      // Proceed with completing the payment
      CompletePayment({ paymentIntentId: paymentIntent.id })
        .then((result) => {
          router.push("/settings"); // Redirect after successful payment
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to complete payment. Please try again.");
          setLoading(false);
        });
    }

    setLoading(false); // End loading state
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Stripe Payment Element for displaying the payment form */}
      <PaymentElement />

      {/* Display error message if there is one */}
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {/* Submit button, disabled if loading or Stripe isn't ready */}
      <Button
        variant="contained"
        type="submit"
        fullWidth
        disabled={!stripe || loading}
        sx={{ mt: 2 }}
      >
        {loading ? "Processing..." : "Submit"}
      </Button>
    </form>
  );
};

export default CheckoutForm;
