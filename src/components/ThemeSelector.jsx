import React from "react";

const THEME_SELECTOR = ["vs", "vs-dark", "hc-black", "hc-light"]; // Possible themes

const ThemeSelector = ({ theme, onSelect }) => {
  const handleSelect = (selectedTheme, detailsElement) => {
    onSelect(selectedTheme); // Notify the parent of the selected theme
    detailsElement.removeAttribute("open"); // Close the dropdown
  };

  return (
    <div>
      <details className="dropdown">
        <summary className="btn m-1 bg-gray-900 text-white border-none hover:bg-slate-700">
          {theme}
        </summary>
        <ul className="menu dropdown-content bg-gray-800 text-white rounded-box z-[1] w-52 p-2 shadow">
          {THEME_SELECTOR.map((themeOption) => (
            <li key={themeOption}>
              <a
                onClick={
                  (e) => handleSelect(themeOption, e.target.closest("details")) // Pass the parent details element
                }
                className="hover:bg-gray-700 px-2 py-1 rounded cursor-pointer"
              >
                {themeOption}
              </a>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
};

export default ThemeSelector;
