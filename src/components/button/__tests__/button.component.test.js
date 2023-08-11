import { render, screen } from "@testing-library/react";
import Button, { BUTTON_CLASSES } from "../button.component";

describe('button tests', () => {
  test('should render base button when nothing is passed', () => {
    render(<Button>Test</Button>);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveStyle('background-color: ButtonFace');
  });

  test('should be disabled if isLoading is true', () => {
    render(<Button isLoading={true}>Test</Button>);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeDisabled();
  });
})