import Layout from "@/layout";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import store from "@/store/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <div>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar
            closeOnClick
            newestOnTop
            style={{ fontSize: "14px", fontFamily: "Poppins" }}
          />
        </Layout>
      </div>
    </Provider>
  );
}
