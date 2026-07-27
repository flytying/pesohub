import { describe, it, expect } from "vitest";
import { validateMessage } from "./validate-message";

describe("validateMessage", () => {
  it("accepts ordinary messages", () => {
    for (const m of [
      "The USD/PHP rate looks wrong, please check.",
      "Please fix the SSS pension calculator.",
      "Rates wrong",
      "Congratulations on the new calculator, very helpful!",
    ]) {
      expect(validateMessage(m).valid, m).toBe(true);
    }
  });

  it("rejects empty or too-short messages", () => {
    for (const m of ["", "   ", "hi", "help"]) {
      expect(validateMessage(m).valid, m).toBe(false);
    }
  });

  it("rejects single-token keyboard mash", () => {
    for (const m of ["shasbsahvbsvnkdbvdasb", "asdfghjklqwertyuiop"]) {
      expect(validateMessage(m).valid, m).toBe(false);
    }
  });

  it("rejects low-vowel / long-consonant-run gibberish", () => {
    expect(validateMessage("qwrtplkjh ffff ghghg").valid).toBe(false);
  });

  it("returns a reason only when invalid", () => {
    expect(validateMessage("This is a genuine message.").reason).toBe("");
    expect(validateMessage("x").reason).not.toBe("");
  });
});
