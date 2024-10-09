import Axios from "./axios";

export const Singin = async (data) => {
  return await Axios.post("/user/singin", data);
};

export const CreatePaymentIntent = async (data) => {
  return await Axios.post("/stripe/create-payment-intent", data);
};

export const CompletePayment = async (data) => {
  return await Axios.post("/stripe/complete-payment", data);
};

export const GetUserProfile = async (data) => {
  return await Axios.get("/user/profile", data);
};
