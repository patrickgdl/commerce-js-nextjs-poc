import CommerceSDK from "@chec/commerce.js";

const client = new CommerceSDK(process.env.NEXT_PUBLIC_CHECK_PUBLIC_API_KEY);

export default client;
