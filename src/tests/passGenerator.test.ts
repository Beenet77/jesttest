import { PasswordGenerator } from "../components/PassGenerator";

describe("PasswordGenerator", () => {
  it("should generate a password of at least 8 characters", () => {
    const generatedPassword: string = PasswordGenerator.generatePassword(8);
    expect(generatedPassword.length).toBeGreaterThanOrEqual(8);
  });

  it("should generate a password of specified length", () => {
    const length: number = 12;
    const generatedPassword: string =
      PasswordGenerator.generatePassword(length);
    expect(generatedPassword.length).toBe(length);
  });

    // Add additional test
});
