import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { store } from '@/redux/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

let persistor = persistStore(store);

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <SessionProvider session={pageProps.session}>
                <PersistGate persistor={persistor}>
                    <ToastContainer />
                    <Component {...pageProps} />
                </PersistGate>
            </SessionProvider>
        </Provider>
    );
}
