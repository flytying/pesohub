import { describe, it, expect } from "vitest";
import { validateEmail } from "./validate-email";

describe("validateEmail", () => {
  it("accepts well-formed real addresses", () => {
    for (const e of [
      "juan.delacruz@gmail.com",
      "maria+news@yahoo.com.ph",
      "r.hilario@pesohub.ph",
      "a_b-c@sub.domain.co",
    ]) {
      expect(validateEmail(e).valid, e).toBe(true);
    }
  });

  it("normalises case and surrounding whitespace", () => {
    expect(validateEmail("  Juan@Gmail.Com  ").valid).toBe(true);
  });

  it("rejects malformed addresses", () => {
    for (const e of ["", "notanemail", "no@domain", "a@b.c", "x@@y.com", "a b@x.com", "a@x..com"]) {
      expect(validateEmail(e).valid, e).toBe(false);
    }
  });

  it("rejects disposable/throwaway domains", () => {
    for (const e of ["foo@mailinator.com", "bar@10minutemail.com", "baz@yopmail.com"]) {
      expect(validateEmail(e).valid, e).toBe(false);
    }
    expect(validateEmail("foo@mailinator.com").reason).toMatch(/disposable/i);
  });

  it("rejects placeholder/dummy addresses", () => {
    for (const e of ["test@test.com", "asdf@asdf.com", "user@example.com", "noreply@gmail.com", "abc@domain.com"]) {
      expect(validateEmail(e).valid, e).toBe(false);
    }
    expect(validateEmail("test@test.com").reason).toMatch(/real email/i);
  });

  it("returns a reason string only when invalid", () => {
    expect(validateEmail("juan@gmail.com").reason).toBe("");
    expect(validateEmail("").reason).not.toBe("");
  });
});
