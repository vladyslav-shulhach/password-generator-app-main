import { useEffect, useState } from "react";
import { FiFile } from "react-icons/fi";

// Main App Component
function App() {
  // State variables
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [warning, setWarning] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [copied, setCopied] = useState(false);

  // Update document title and password strength on relevant changes
  useEffect(() => {
    document.title = "Password Generator App | Vladyslav Shulhach";

    // Clear warning if any character type is selected
    if (
      includeUppercase ||
      includeLowercase ||
      includeNumbers ||
      includeSymbols
    ) {
      setWarning("");
    }

    // Update password strength
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

  // Generate a new password based on selected options
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

    // Show warning if no character type is selected
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

    // Generate password
    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters[randomIndex];
    }

    setPassword(generatedPassword);
  };

  // Determine password strength
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

  // Password strength levels for visual bar
  const strengthLevels = {
    Weak: { count: 1, className: "strength-bar__rect--weak" },
    Medium: { count: 2, className: "strength-bar__rect--medium" },
    Moderate: { count: 3, className: "strength-bar__rect--moderate" },
    Strong: { count: 4, className: "strength-bar__rect--strong" },
  };

  // Handle copy to clipboard
  const handleCopy = () => {
    if (password && !warning) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  };

  // Handle keyboard copy (Enter/Space)
  const handleCopyKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === " ") && password && !warning) {
      handleCopy();
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <h1>Password Generator</h1>
      </header>

      {/* Main Window */}
      <main className="app-window">
        {/* Password Showcase */}
        <section className="password-showcase">
          <div className="password-showcase__row">
            <input
              type="text"
              value={warning ? warning : password}
              readOnly
              className="password-output"
              placeholder="Your secure password"
            />
            {/* Copy Icon with duplicate on copy/hover/focus */}
            <span
              className={`copy-icon${copied ? " copied" : ""}`}
              title="Copy password"
              tabIndex={password && !warning ? 0 : -1}
              role="button"
              aria-label="Copy password"
              onClick={handleCopy}
              onKeyDown={handleCopyKeyDown}
              style={{
                cursor: password && !warning ? "pointer" : "not-allowed",
                opacity: password && !warning ? 1 : 0.5,
                position: "relative",
              }}
            >
              <FiFile size={32} />
              {(copied || undefined) && (
                <FiFile
                  size={32}
                  className="copy-icon-duplicate"
                  style={{
                    position: "absolute",
                    left: "6px",
                    top: "-6px",
                    pointerEvents: "none",
                  }}
                />
              )}
            </span>
          </div>
          {/* Copy feedback */}
          {copied && <span className="copy-feedback">Copied!</span>}
        </section>

        {/* Password Options Form */}
        <form
          className="password-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleGenerate();
          }}
        >
          {/* Length Slider */}
          <div className="form-group form-group--length">
            <label htmlFor="length-slider">Character Length</label>
            <span className="length-value">{length}</span>
          </div>
          <input
            id="length-slider"
            type="range"
            min="6"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="length-slider"
            style={{ marginBottom: "1.2rem" }}
          />

          {/* Character Type Options */}
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

          {/* Password Strength Bar */}
          <div className="password-strength">
            <span>Strength:</span>
            <div className="strength-bar">
              <span className="strength-value">{passwordStrength || "-"}</span>
              {[0, 1, 2, 3].map((index) => {
                const level = strengthLevels[passwordStrength];
                return (
                  <div
                    key={index}
                    className={
                      "strength-bar__rect" +
                      (level && index < level.count
                        ? ` ${level.className}`
                        : "")
                    }
                  ></div>
                );
              })}
            </div>
          </div>

          {/* Generate Button */}
          <button type="submit" className="button">
            Generate <span className="arrow">&rarr;</span>
          </button>
        </form>
      </main>

      {/* Footer */}
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
