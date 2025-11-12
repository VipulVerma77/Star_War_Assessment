import CryptoJS from "crypto-js";

export const loginUser = async (email, password) => {
  const validEmail = import.meta.env.VITE_APP_EMAIL;
  const validPassword = import.meta.env.VITE_APP_PASSWORD;
  const jwtToken = import.meta.env.VITE_APP_JWT_KEY;

  if (email === validEmail && password === validPassword) {
    const payload = JSON.stringify({ email, exp: Date.now() + 3600 * 1000 });
    const token = CryptoJS.AES.encrypt(payload, jwtToken).toString();
    return { token };
  } else {
    throw new Error("Invalid credentials");
  }
};

export const verifyJwtToken = (token) => {
  try {
    const jwtToken = import.meta.env.VITE_APP_JWT_KEY;
    const bytes = CryptoJS.AES.decrypt(token, jwtToken);
    const decoded = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    if (Date.now() > decoded.exp) return null;
    return decoded;
  } catch {
    return null;
  }
};
