import "@/styles/globals.css";
import Navbar from "components/Navbar";
import { AuthProvider } from "context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <ToastContainer />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}
