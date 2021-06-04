import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../app/store";
import { Currency } from "./";

describe("<Currency />", () => {
  it("renders the component", () => {
    render(
      <Provider store={store}>
        <Currency />
      </Provider>
    );

    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
