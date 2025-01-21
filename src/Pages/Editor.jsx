import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "../components/LanguageSelector";
import { LANGUAGE_STARTERS } from "../components/constants";
import Output from "../components/Output";
import Navbar from "../components/Navbar";
import ThemeSelector from "../components/ThemeSelector"; // Import ThemeSelector

const CodeEditor = () => {
  const [language, setLanguage] = useState("javascript");
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [isWordWrapEnabled, setIsWordWrapEnabled] = useState(true); // Default: wrapping enabled
  const [theme, setTheme] = useState("vs-dark"); // Default: dark theme

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
    editor.updateOptions({
      wordWrap: isWordWrapEnabled ? "on" : "off", // Apply wrapping state
    });
  };

  const toggleWordWrap = () => {
    setIsWordWrapEnabled((prevState) => !prevState); // Toggle the word wrap state
  };

  const onSelect = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    setValue(LANGUAGE_STARTERS[selectedLanguage]);
  };

  const onSelectTheme = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  useEffect(() => {
    // Update word wrap option dynamically when isWordWrapEnabled changes
    if (editorRef.current) {
      editorRef.current.updateOptions({
        wordWrap: isWordWrapEnabled ? "on" : "off",
      });
    }
  }, [isWordWrapEnabled]);

  return (
    <div className="w-full h-screen flex flex-col gap-4 justify-center items-center bg-zinc-700 pt-5 ">
      <Navbar />
      <div className=" h-full w-screen px-10 py-3 border-2 rounded-xl ">
        <div className="flex space-x-4 h-full">
          {/* First Diff */}
          <div className="flex-1">
            <div className="editor-actions flex gap-2">
              <LanguageSelector language={language} onSelect={onSelect} />
              {/* Toggle Word Wrap Button */}
              <button
                onClick={toggleWordWrap}
                className="btn m-1 bg-gray-900 text-white border-none hover:bg-slate-700"
              >
                {isWordWrapEnabled ? "Disable Word Wrap" : "Enable Word Wrap"}
              </button>
              <ThemeSelector theme={theme} onSelect={onSelectTheme} />{" "}
              {/* Use ThemeSelector */}
            </div>

            <Editor
              height="70vh"
              theme={theme} // Dynamically set the theme
              language={language}
              value={value}
              onChange={(value) => setValue(value)}
              onMount={onMount}
            />
          </div>
          {/* Second Diff */}
          <div className="flex-1">
            <Output editorRef={editorRef} language={language} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
