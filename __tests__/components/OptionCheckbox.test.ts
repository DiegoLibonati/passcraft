import { screen } from "@testing-library/dom";

import type { OptionCheckboxProps } from "@/types/props";
import type { OptionCheckboxComponent } from "@/types/components";

import OptionCheckbox from "@/components/OptionCheckbox/OptionCheckbox";

const defaultProps: OptionCheckboxProps = {
  id: "test-checkbox",
  label: "Test Label",
};

const renderComponent = (
  props: Partial<OptionCheckboxProps> = {}
): OptionCheckboxComponent => {
  const element = OptionCheckbox({ ...defaultProps, ...props });
  document.body.appendChild(element);
  return element;
};

describe("OptionCheckbox", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render a div root element", () => {
      const element = renderComponent();
      expect(element.tagName).toBe("DIV");
    });

    it("should render a label with the correct text", () => {
      renderComponent();
      expect(screen.getByText("Test Label")).toBeInTheDocument();
    });

    it("should render a label linked to the input id", () => {
      renderComponent();
      expect(screen.getByText("Test Label")).toHaveAttribute(
        "for",
        "test-checkbox"
      );
    });

    it("should render a checkbox input", () => {
      renderComponent();
      expect(screen.getByRole("checkbox")).toBeInTheDocument();
    });

    it("should render the checkbox with the correct id", () => {
      renderComponent();
      expect(screen.getByRole("checkbox")).toHaveAttribute(
        "id",
        "test-checkbox"
      );
    });

    it("should render the checkbox with initial value 'off'", () => {
      renderComponent();
      expect(screen.getByRole("checkbox")).toHaveAttribute("value", "off");
    });

    it("should render the checkbox unchecked by default", () => {
      renderComponent();
      expect(screen.getByRole("checkbox")).not.toBeChecked();
    });
  });

  describe("className", () => {
    it("should apply only the base class when no className is provided", () => {
      const element = renderComponent();
      expect(element.className).toBe("option-checkbox");
    });

    it("should apply base class and custom className when provided", () => {
      const element = renderComponent({ className: "custom-class" });
      expect(element).toHaveClass("option-checkbox");
      expect(element).toHaveClass("custom-class");
    });

    it("should trim trailing space when empty className is provided", () => {
      const element = renderComponent({ className: "" });
      expect(element.className).toBe("option-checkbox");
    });
  });
});
