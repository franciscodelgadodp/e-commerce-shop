import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from "../../store/root-reducers";
import { BrowserRouter } from "react-router-dom";

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: rootReducer,
      preloadedState
    }),
    ...renderOptions
  } = {}
) {
  const Wrapper = ({ children }) => {
    return (
      <BrowserRouter>
        <Provider store={store}>
          {children}
        </Provider>
      </BrowserRouter>
    )
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}