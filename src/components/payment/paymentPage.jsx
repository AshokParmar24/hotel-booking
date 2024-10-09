import { Box, Button } from "@mui/material";
import StripePayment from "@/components/stripe/stripePayment";
import { useState } from "react";
import { CreatePaymentIntent } from "@/service/api";
import { useSelector } from "react-redux";

const PaymentPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [clientSecrete, setClientSecrete] = useState(null);

  const profileData = useSelector((state) => state?.userProfileReducer?.user);
  console.log("profileData :>> ", profileData);
  const generateClientseCrete = () => {
    CreatePaymentIntent({
      amount: 1099, // Amount in paise (smallest unit of INR, 1 INR = 100 paise)
      currency: "inr",
      description: "Purchase of digital marketing services",
      userId: "",
    })
      .then((result) => {
        if (result?.data?.status) {
          setIsOpen(true);
          setClientSecrete(result?.data?.clientSecret);
        }
      })
      .catch((err) => {
        console.log("error :>> ", err);
      });
  };
  return (
    <Box>
      Payment
      {!isOpen ? (
        <Box>
          <Button
            variant="contained"
            onClick={() => generateClientseCrete()}
            sx={{ mt: 2 }}
          >
            Payment
          </Button>
        </Box>
      ) : (
        <Box>
          {" "}
          <StripePayment clientSecrete={clientSecrete} />
        </Box>
      )}
    </Box>
  );
};

export default PaymentPage;
