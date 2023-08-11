import { screen, fireEvent } from "@testing-library/react";
// import * as reactRedux from "react-redux";

import { renderWithProviders } from "../../../utils/test/test.utils";
import Navigation from "../navigation.component";
// import { signOutStart } from "../../../store/user/user.reducer";
import * as actions from "../../../store/user/user.reducer";


jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => jest.fn(),
 }));

describe('Navigation tests', () => {
  test('It should render a Sign In Link if there is no currentUser', () => {
    renderWithProviders(<Navigation/>, {
      preloadedState: {
        user: {
          currentUser: null,
        }
      }
    });

    const signInElement = screen.getByText(/sign in/i);
    expect(signInElement).toBeInTheDocument();
    const signOutElement = screen.queryByText(/sign out/i);
    expect(signOutElement).toBeNull();
  });

  test('It should render a Sign Out Link if there is a currentUser', () => {
    renderWithProviders(<Navigation/>, {
      preloadedState: {
        user: {
          currentUser: {},
        }
      }
    });

    const signOutElement = screen.getByText(/sign out/i);
    expect(signOutElement).toBeInTheDocument();
    const signInElement = screen.queryByText(/sign in/i);
    expect(signInElement).toBeNull();
  });

  test('It should not render a cart dropdown if isCartOpen is false', () => {
    renderWithProviders(<Navigation/>, {
      preloadedState: {
        cart: {
          isCartOpen: false,
          cartItems: []
        }
      }
    });

    const dropdownTextElement = screen.queryByText(/Your cart is empty/i);
    expect(dropdownTextElement).toBeNull();
  });

  test('It should render a cart dropdown if isCartOpen is true', () => {
    renderWithProviders(<Navigation/>, {
      preloadedState: {
        cart: {
          isCartOpen: true,
          cartItems: []
        }
      }
    });

    const dropdownTextElement = screen.queryByText(/Your cart is empty/i);
    expect(dropdownTextElement).toBeInTheDocument();
  });

  test('it should dispatch signOutStart action when clicking on the sign out link', async () => {
    const signOutStartAction = jest.spyOn(actions, 'signOutStart');

    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: {},
        }
      }
    });
    const signOutLinkElement = screen.getByText(/sign out/i);
    expect(signOutLinkElement).toBeInTheDocument();

    await fireEvent.click(signOutLinkElement);
    expect(signOutStartAction).toHaveBeenCalled();
  });
  
})