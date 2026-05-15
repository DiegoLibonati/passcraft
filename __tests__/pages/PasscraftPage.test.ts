import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { Page } from "@/types/pages";

import PasscraftPage from "@/pages/PasscraftPage/PasscraftPage";

const renderPage = (): Page => {
  const element = PasscraftPage();
  document.body.appendChild(element);
  return element;
};

describe("PasscraftPage", () => {
  let mockAlert: jest.SpyInstance;
  let mockClipboardWriteText: jest.SpyInstance;

  beforeEach(() => {
    mockAlert = jest.spyOn(window, "alert").mockImplementation(() => undefined);
    mockClipboardWriteText = jest
      .spyOn(navigator.clipboard, "writeText")
      .mockResolvedValue(undefined);
  });

  afterEach(() => {
    document.body.innerHTML = "";
    jest.restoreAllMocks();
  });

  describe("rendering", () => {
    it("should render a main element", () => {
      const page = renderPage();
      expect(page.tagName).toBe("MAIN");
    });

    it("should render the password output input", () => {
      renderPage();
      expect(
        screen.getByRole("textbox", { name: /generated password/i })
      ).toBeInTheDocument();
    });

    it("should render the password output input as readonly", () => {
      renderPage();
      expect(
        screen.getByRole("textbox", { name: /generated password/i })
      ).toHaveAttribute("readonly");
    });

    it("should render the generate password button", () => {
      renderPage();
      expect(
        screen.getByRole("button", { name: /generate password/i })
      ).toBeInTheDocument();
    });

    it("should render the password length option", () => {
      renderPage();
      expect(screen.getByLabelText("Password Length")).toBeInTheDocument();
    });

    it("should render the uppercase checkbox option", () => {
      renderPage();
      expect(
        screen.getByLabelText("Contain Uppercase Letters")
      ).toBeInTheDocument();
    });

    it("should render the lowercase checkbox option", () => {
      renderPage();
      expect(
        screen.getByLabelText("Contain Lowercase Letters")
      ).toBeInTheDocument();
    });

    it("should render the numbers checkbox option", () => {
      renderPage();
      expect(screen.getByLabelText("Contain Numbers")).toBeInTheDocument();
    });

    it("should render the symbols checkbox option", () => {
      renderPage();
      expect(screen.getByLabelText("Contain Symbols")).toBeInTheDocument();
    });
  });

  describe("password generation", () => {
    describe("when no options are selected", () => {
      it("should display 'Use any check.' in the output", async () => {
        const user = userEvent.setup();
        renderPage();
        await user.click(
          screen.getByRole("button", { name: /generate password/i })
        );
        expect(
          screen.getByRole("textbox", { name: /generated password/i })
        ).toHaveValue("Use any check.");
      });
    });

    describe("when uppercase is selected", () => {
      it("should generate a password with only uppercase letters", async () => {
        const user = userEvent.setup();
        renderPage();
        await user.click(screen.getByLabelText("Contain Uppercase Letters"));
        await user.clear(screen.getByLabelText("Password Length"));
        await user.type(screen.getByLabelText("Password Length"), "10");
        await user.click(
          screen.getByRole("button", { name: /generate password/i })
        );
        const passwordInput = screen.getByRole<HTMLInputElement>("textbox", {
          name: /generated password/i,
        });
        expect(passwordInput.value).toMatch(/^[A-Z]+$/);
        expect(passwordInput.value).toHaveLength(10);
      });
    });

    describe("when lowercase is selected", () => {
      it("should generate a password with only lowercase letters", async () => {
        const user = userEvent.setup();
        renderPage();
        await user.click(screen.getByLabelText("Contain Lowercase Letters"));
        await user.clear(screen.getByLabelText("Password Length"));
        await user.type(screen.getByLabelText("Password Length"), "8");
        await user.click(
          screen.getByRole("button", { name: /generate password/i })
        );
        const passwordInput = screen.getByRole<HTMLInputElement>("textbox", {
          name: /generated password/i,
        });
        expect(passwordInput.value).toMatch(/^[a-z]+$/);
        expect(passwordInput.value).toHaveLength(8);
      });
    });

    describe("when numbers is selected", () => {
      it("should generate a password with only digits", async () => {
        const user = userEvent.setup();
        renderPage();
        await user.click(screen.getByLabelText("Contain Numbers"));
        await user.clear(screen.getByLabelText("Password Length"));
        await user.type(screen.getByLabelText("Password Length"), "6");
        await user.click(
          screen.getByRole("button", { name: /generate password/i })
        );
        const passwordInput = screen.getByRole<HTMLInputElement>("textbox", {
          name: /generated password/i,
        });
        expect(passwordInput.value).toMatch(/^[0-9]+$/);
        expect(passwordInput.value).toHaveLength(6);
      });
    });

    describe("when symbols is selected", () => {
      it("should generate a password with only symbols", async () => {
        const user = userEvent.setup();
        renderPage();
        await user.click(screen.getByLabelText("Contain Symbols"));
        await user.clear(screen.getByLabelText("Password Length"));
        await user.type(screen.getByLabelText("Password Length"), "5");
        await user.click(
          screen.getByRole("button", { name: /generate password/i })
        );
        const passwordInput = screen.getByRole<HTMLInputElement>("textbox", {
          name: /generated password/i,
        });
        expect(passwordInput.value).toHaveLength(5);
        expect(passwordInput.value).toMatch(/^[!#$%&/()=?¡]+$/);
      });
    });

    describe("when all options are selected", () => {
      it("should generate a password of the requested length", async () => {
        const user = userEvent.setup();
        renderPage();
        await user.click(screen.getByLabelText("Contain Uppercase Letters"));
        await user.click(screen.getByLabelText("Contain Lowercase Letters"));
        await user.click(screen.getByLabelText("Contain Numbers"));
        await user.click(screen.getByLabelText("Contain Symbols"));
        await user.clear(screen.getByLabelText("Password Length"));
        await user.type(screen.getByLabelText("Password Length"), "20");
        await user.click(
          screen.getByRole("button", { name: /generate password/i })
        );
        const passwordInput = screen.getByRole<HTMLInputElement>("textbox", {
          name: /generated password/i,
        });
        expect(passwordInput.value).toHaveLength(20);
        expect(passwordInput.value).not.toBe("Use any check.");
      });
    });

    describe("when password length is empty", () => {
      it("should generate an empty password", async () => {
        const user = userEvent.setup();
        renderPage();
        await user.click(screen.getByLabelText("Contain Uppercase Letters"));
        await user.click(
          screen.getByRole("button", { name: /generate password/i })
        );
        expect(
          screen.getByRole("textbox", { name: /generated password/i })
        ).toHaveValue("");
      });
    });

    describe("when getRandomIndex returns an out-of-bounds index", () => {
      it("should not append undefined characters to the password", async () => {
        jest.spyOn(Math, "random").mockReturnValue(1.0);
        const user = userEvent.setup();
        renderPage();
        await user.click(screen.getByLabelText("Contain Uppercase Letters"));
        await user.clear(screen.getByLabelText("Password Length"));
        await user.type(screen.getByLabelText("Password Length"), "5");
        await user.click(
          screen.getByRole("button", { name: /generate password/i })
        );
        expect(
          screen.getByRole("textbox", { name: /generated password/i })
        ).toHaveValue("");
      });
    });
  });

  describe("clipboard copy", () => {
    it("should copy the password to the clipboard when the output is clicked", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(screen.getByLabelText("Contain Uppercase Letters"));
      await user.clear(screen.getByLabelText("Password Length"));
      await user.type(screen.getByLabelText("Password Length"), "8");
      await user.click(
        screen.getByRole("button", { name: /generate password/i })
      );
      const passwordValue = screen.getByRole<HTMLInputElement>("textbox", {
        name: /generated password/i,
      }).value;
      await user.click(
        screen.getByRole("textbox", { name: /generated password/i })
      );
      expect(mockClipboardWriteText).toHaveBeenCalledWith(passwordValue);
    });

    it("should show an alert with the copied text", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(screen.getByLabelText("Contain Uppercase Letters"));
      await user.clear(screen.getByLabelText("Password Length"));
      await user.type(screen.getByLabelText("Password Length"), "8");
      await user.click(
        screen.getByRole("button", { name: /generate password/i })
      );
      const passwordValue = screen.getByRole<HTMLInputElement>("textbox", {
        name: /generated password/i,
      }).value;
      await user.click(
        screen.getByRole("textbox", { name: /generated password/i })
      );
      expect(mockAlert).toHaveBeenCalledWith(
        `Copied the text: ${passwordValue}`
      );
    });
  });

  describe("cleanup", () => {
    it("should expose a cleanup method", () => {
      const page = renderPage();
      expect(typeof page.cleanup).toBe("function");
    });

    it("should stop generating passwords after cleanup", async () => {
      const user = userEvent.setup();
      const page = renderPage();
      page.cleanup?.();
      await user.click(screen.getByLabelText("Contain Uppercase Letters"));
      await user.clear(screen.getByLabelText("Password Length"));
      await user.type(screen.getByLabelText("Password Length"), "8");
      await user.click(
        screen.getByRole("button", { name: /generate password/i })
      );
      expect(
        screen.getByRole("textbox", { name: /generated password/i })
      ).toHaveValue("");
    });

    it("should stop copying to clipboard after cleanup", async () => {
      const user = userEvent.setup();
      const page = renderPage();
      await user.click(screen.getByLabelText("Contain Uppercase Letters"));
      await user.clear(screen.getByLabelText("Password Length"));
      await user.type(screen.getByLabelText("Password Length"), "8");
      await user.click(
        screen.getByRole("button", { name: /generate password/i })
      );
      page.cleanup?.();
      await user.click(
        screen.getByRole("textbox", { name: /generated password/i })
      );
      expect(mockClipboardWriteText).not.toHaveBeenCalled();
    });
  });
});
