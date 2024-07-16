import Layout from "@/layout";
import store from "@/store/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <div>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </Provider>
  );
}
