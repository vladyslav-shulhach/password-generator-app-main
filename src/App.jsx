import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [warning, setWarning] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");

  useEffect(() => {
    document.title = "Password Generator App | Vladyslav Shulhach";

    if (
      includeUppercase ||
      includeLowercase ||
      includeNumbers ||
      includeSymbols
    ) {
      setWarning("");
    }

    if (password) {
      setPasswordStrength(
        getPasswordStrength(password, {
          includeUppercase,
          includeLowercase,
          includeNumbers,
          includeSymbols,
        })
      );
    } else {
      setPasswordStrength("");
    }
  }, [
    password,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
  ]);

  // Password generation logic
  const handleGenerate = () => {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

    let characters = "";
    if (includeUppercase) characters += upper;
    if (includeLowercase) characters += lower;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;

    if (
      !includeUppercase &&
      !includeLowercase &&
      !includeNumbers &&
      !includeSymbols
    ) {
      setWarning("Please select at least one character type.");
      setPassword("");
      return;
    }

    setWarning("");

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters[randomIndex];
    }

    setPassword(generatedPassword);
  };

  // Password strength logic
  function getPasswordStrength(password, options) {
    let score = 0;
    if (options.includeUppercase) score++;
    if (options.includeLowercase) score++;
    if (options.includeNumbers) score++;
    if (options.includeSymbols) score++;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;

    if (score <= 2) return "Weak";
    if (score === 3) return "Medium";
    if (score === 4) return "Moderate";
    return "Strong";
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Password Generator</h1>
      </header>
      <main className="app-window">
        <section className="password-showcase">
          <input
            type="text"
            value={warning ? warning : password}
            readOnly
            className="password-output"
            placeholder="Your secure password"
          />
        </section>

        <form
          className="password-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleGenerate();
          }}
        >
          <div className="form-group">
            <label htmlFor="length-slider">
              Length: <strong>{length}</strong>
            </label>
            <input
              id="length-slider"
              type="range"
              min="6"
              max="32"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="length-slider"
            />
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="checkbox"
              />
              Include Uppercase Letters
            </label>
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                className="checkbox"
              />
              Include Lowercase Letters
            </label>
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="checkbox"
              />
              Include Numbers
            </label>
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="checkbox"
              />
              Include Symbols
            </label>
          </div>
          <div className="password-strength">
            <span>Strength: </span>
            <span className="strength-value">{passwordStrength || "-"}</span>
            <div className="strength-bar">
              <div
                className={`strength-bar__rect ${
                  passwordStrength === "Weak" ? "strength-bar__rect--weak" : ""
                }`}
              />
              <div
                className={`strength-bar__rect ${
                  passwordStrength === "Medium"
                    ? "strength-bar__rect--medium"
                    : ""
                }`}
              />
              <div
                className={`strength-bar__rect ${
                  passwordStrength === "Moderate"
                    ? "strength-bar__rect--moderate"
                    : ""
                }`}
              />
              <div
                className={`strength-bar__rect ${
                  passwordStrength === "Strong"
                    ? "strength-bar__rect--strong"
                    : ""
                }`}
              />
            </div>
          </div>
          <button type="submit" className="button">
            Generate <span className="arrow">&rarr;</span>
          </button>
        </form>
      </main>
      <footer className="app-footer">
        <small>
          &copy; {new Date().getFullYear()} Vladyslav Shulhach. All rights
          reserved.
        </small>
      </footer>
    </div>
  );
}

export default App;
