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
  const [passwordStrength, setPasswordStrength] = useState({
    label: "",
    level: 0,
  });
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

    // Update password strength based on actual password content
    setPasswordStrength(getPasswordStrength(password));
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

    let charSets = [];
    if (includeUppercase) charSets.push(upper);
    if (includeLowercase) charSets.push(lower);
    if (includeNumbers) charSets.push(numbers);
    if (includeSymbols) charSets.push(symbols);

    if (charSets.length === 0) {
      setWarning("Please select at least one character type.");
      setPassword("");
      return;
    }

    setWarning("");

    // Guarantee at least one character from each selected type
    let generatedPassword = charSets.map(
      (set) => set[Math.floor(Math.random() * set.length)]
    );

    // Fill the rest randomly
    let allChars = charSets.join("");
    for (let i = generatedPassword.length; i < length; i++) {
      generatedPassword.push(
        allChars[Math.floor(Math.random() * allChars.length)]
      );
    }

    // Shuffle the result
    generatedPassword = generatedPassword
      .sort(() => Math.random() - 0.5)
      .join("");

    setPassword(generatedPassword);
  };

  // Determine password strength
  function getPasswordStrength(password) {
    const length = password.length;
    let types = 0;
    if (/[A-Z]/.test(password)) types++;
    if (/[a-z]/.test(password)) types++;
    if (/[0-9]/.test(password)) types++;
    if (/[^A-Za-z0-9]/.test(password)) types++;

    if (length === 0) return { label: "", level: 0 };
    if (length < 8) return { label: "Too Short", level: 1 };
    if (length >= 24 && types === 4) return { label: "Very Strong", level: 5 };
    if ((length >= 18 && types >= 3) || (length >= 24 && types === 2))
      return { label: "Strong", level: 4 };
    if ((length >= 14 && types === 2) || (length >= 8 && types === 2))
      return { label: "Medium", level: 3 };
    if (length < 14 || types === 1) return { label: "Weak", level: 2 };
    return { label: "Medium", level: 3 };
  }

  // Password strength levels for visual bar
  const strengthLevels = [
    { label: "", className: "" },
    { label: "Too Short", className: "strength-bar__rect--short" },
    { label: "Weak", className: "strength-bar__rect--weak" },
    { label: "Medium", className: "strength-bar__rect--medium" },
    { label: "Strong", className: "strength-bar__rect--strong" },
    { label: "Very Strong", className: "strength-bar__rect--very-strong" },
  ];

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
              value={warning ? warning : copied ? "Copied!" : password}
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
                    left: 0,
                    top: 0,
                    pointerEvents: "none",
                    width: "100%",
                    height: "100%",
                  }}
                />
              )}
            </span>
          </div>
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
              <span className="strength-value">
                {passwordStrength.label || "-"}
              </span>
              {[1, 2, 3, 4, 5].map((index) => (
                <div
                  key={index}
                  className={
                    "strength-bar__rect" +
                    (passwordStrength.level >= index
                      ? ` ${strengthLevels[passwordStrength.level]?.className}`
                      : "")
                  }
                ></div>
              ))}
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
