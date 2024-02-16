import React from "react";

// Using a class for the password generator instead of a simple function offers advantages, especially in more complex scenarios or larger applications
class PasswordGenerator {
  static generatePassword(length: number): string {
    const uppercaseLetters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseLetters: string = "abcdefghijklmnopqrstuvwxyz";
    const digits: string = "0123456789";
    const specialChars: string = "!@#$%^&*";

    const allChars: string[] = [];
    if (length < 8) {
      throw new Error("Password length must be at least 8 characters.");
    }

    if (length >= 8) {
      allChars.push(...uppercaseLetters.split(""));
      allChars.push(...lowercaseLetters.split(""));
      allChars.push(...digits.split(""));
      allChars.push(...specialChars.split(""));
    }

    let password: string = "";
    for (let i = 0; i < length; i++) {
      const randomIndex: number = Math.floor(Math.random() * allChars.length);
      password += allChars[randomIndex];
    }

    return password;
  }
}

function PassGenerator() {
  const generatedPasswordLengh: number = 12;
  const [pass, setPass] = React.useState<string>("");

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);
  };

  const handleSubmit = () => {
    // Submit logic here
  };

  return (
    <>
      <h1>Password Generator</h1>
      <input
        onChange={onInputChange}
        placeholder="Password"
        style={{
          height: "34px",
          borderRadius: "6px",
          width: "300px",
          border: "1px solid #999",
        }}
        type="text"
        value={pass}
      />
      <button
        onClick={() =>
          setPass(PasswordGenerator.generatePassword(generatedPasswordLengh))
        }
      >
        Generate Password
      </button>
      <br />
      <button
        style={{ marginTop: "20px", backgroundColor: "gray", color: "#fff" }}
        onSubmit={handleSubmit}
      >
        Submit
      </button>
    </>
  );
}

export { PassGenerator, PasswordGenerator };
