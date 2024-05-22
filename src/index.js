import React from "react";
import ReactDOM from "react-dom/client";
import "./blog-app.css" 
import App from "./App.js";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Store, persistor } from "./Blog-app/store/Store";
import ThemeProvider from "./Blog-app/components/themeProvider";
import { ErrorBoundary } from "./Blog-app/utils/ErrorBoundary.js";
import { PersistGate } from "redux-persist/integration/react";
import ScrollToTop from "./Blog-app/components/ScrollToTop.jsx"; 
const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
      <ErrorBoundary>
            <BrowserRouter>
                  <ScrollToTop/>
                        <PersistGate persistor={persistor}>
                              <Provider store={Store}>
                                    <ThemeProvider>
                                          <App /> 
                                    </ThemeProvider>
                              </Provider>
                        </PersistGate> 
            </BrowserRouter>
      </ErrorBoundary>
)  
