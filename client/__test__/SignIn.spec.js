import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { SignIn } from "../src/components/SignIn";

import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

describe("Componente SignIn", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      myState: "sample text",
    });
  });

  it("Ha cambiado el renderizado de componente?", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <SignIn />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
