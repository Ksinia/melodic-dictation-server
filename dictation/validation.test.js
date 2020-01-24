const validation = require("./validation");

describe("Validate notes", () => {
  test("`userInput` is valid", () => {
    const userInput = [1, 2, 3];
    const originalNotes = [1, 2, 3];

    expect(validation(originalNotes, userInput)).toEqual([true, true, true]);
  });

  test("`userInput` is not valid", () => {
    // This is example for you
    // You can write it like previous test but for opposite result
    expect(1).toBe(1);
  });

  test("`userInput` shorter than `originalNotes`", () => {
    const userInput = [4, 5];
    const originalNotes = [1, 2, 3];

    expect(validation(originalNotes, userInput)).toHaveLength(3);
  });
});
