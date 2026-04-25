import { screen } from "@testing-library/dom";

import type { OptionNumberProps } from "@/types/props";
import type { OptionNumberComponent } from "@/types/components";

import OptionNumber from "@/components/OptionNumber/OptionNumber";

const defaultProps: OptionNumberProps = {
  id: "test-number",
  label: "Test Number Label",
};

const renderComponent = (
  props: Partial<OptionNumberProps> = {}
): OptionNumberComponent => {
  const element = OptionNumber({ ...defaultProps, ...props });
  document.body.appendChild(element);
  return element;
};

describe("OptionNumber", () => {
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
      expect(screen.getByText("Test Number Label")).toBeInTheDocument();
    });

    it("should render a label linked to the input id", () => {
      renderComponent();
      expect(screen.getByText("Test Number Label")).toHaveAttribute(
        "for",
        "test-number"
      );
    });

    it("should render a number input", () => {
      renderComponent();
      expect(screen.getByRole("spinbutton")).toBeInTheDocument();
    });

    it("should render the number input with the correct id", () => {
      renderComponent();
      expect(screen.getByRole("spinbutton")).toHaveAttribute(
        "id",
        "test-number"
      );
    });
  });

  describe("className", () => {
    it("should apply base class with appended empty string when no className provided", () => {
      const element = renderComponent();
      expect(element).toHaveClass("option-number");
    });

    it("should apply base class and custom className when provided", () => {
      const element = renderComponent({ className: "custom-class" });
      expect(element).toHaveClass("option-number");
      expect(element).toHaveClass("custom-class");
    });
  });

  describe("classNameLabel", () => {
    it("should apply classNameLabel to the label when provided", () => {
      renderComponent({ classNameLabel: "custom-label" });
      const label = screen.getByText("Test Number Label");
      expect(label).toHaveClass("custom-label");
    });

    it("should always apply base label class", () => {
      renderComponent();
      const label = screen.getByText("Test Number Label");
      expect(label).toHaveClass("option-number__label");
    });

    it("should apply both base and custom label class when classNameLabel is provided", () => {
      renderComponent({ classNameLabel: "extra-label" });
      const label = screen.getByText("Test Number Label");
      expect(label).toHaveClass("option-number__label");
      expect(label).toHaveClass("extra-label");
    });
  });
});
