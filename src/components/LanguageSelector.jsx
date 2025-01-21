import React from "react";
import { LANGUAGE_VERSIONS } from "./constants";

const LanguageSelector = ({ language, onSelect }) => {
  const languages = Object.entries(LANGUAGE_VERSIONS);

  const handleSelect = (lang, detailsElement) => {
    onSelect(lang); // Notify the parent of the selected language
    detailsElement.removeAttribute("open"); // Close the dropdown
  };

  return (
    <div>
      <details className="dropdown">
        <summary className="btn m-1 bg-gray-900 text-white border-none hover:bg-slate-700">
          {language}
        </summary>
        <ul className="menu dropdown-content bg-gray-800 text-white rounded-box z-[1] w-52 p-2 shadow">
          {languages.map(([lang, version]) => (
            <li key={lang}>
              <a
                onClick={
                  (e) => handleSelect(lang, e.target.closest("details")) // Pass the parent details element
                }
                className="hover:bg-gray-700 px-2 py-1 rounded cursor-pointer"
              >
                {lang}{" "}
                <span className="text-zinc-500 text-[12px]">({version})</span>
              </a>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
};

export default LanguageSelector;
