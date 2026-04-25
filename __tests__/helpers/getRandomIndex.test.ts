import { getRandomIndex } from "@/helpers/getRandomIndex";

describe("getRandomIndex", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("return value", () => {
    it("should return a number", () => {
      const result = getRandomIndex(["a", "b", "c"]);
      expect(typeof result).toBe("number");
    });

    it("should return an integer", () => {
      const result = getRandomIndex(["a", "b", "c"]);
      expect(Number.isInteger(result)).toBe(true);
    });

    it("should return 0 for a single-element array", () => {
      const result = getRandomIndex(["only"]);
      expect(result).toBe(0);
    });
  });

  describe("range", () => {
    it("should always return an index within valid range", () => {
      const array = ["a", "b", "c", "d", "e"];
      for (let i = 0; i < 100; i++) {
        const index = getRandomIndex(array);
        expect(index).toBeGreaterThanOrEqual(0);
        expect(index).toBeLessThan(array.length);
      }
    });
  });

  describe("randomness", () => {
    it("should use Math.random to compute the index", () => {
      jest.spyOn(Math, "random").mockReturnValue(0.5);
      const array = ["a", "b", "c", "d"];
      const result = getRandomIndex(array);
      expect(result).toBe(2);
    });

    it("should return the last index when Math.random returns near 1", () => {
      jest.spyOn(Math, "random").mockReturnValue(0.99);
      const array = ["a", "b", "c"];
      const result = getRandomIndex(array);
      expect(result).toBe(2);
    });

    it("should return 0 when Math.random returns 0", () => {
      jest.spyOn(Math, "random").mockReturnValue(0);
      const array = ["a", "b", "c"];
      const result = getRandomIndex(array);
      expect(result).toBe(0);
    });
  });
});
