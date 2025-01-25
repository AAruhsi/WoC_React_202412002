import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "../components/LanguageSelector";
import { LANGUAGE_STARTERS } from "../components/constants";
import Output from "../components/Output";
import Navbar from "../components/Navbar";
import ThemeSelector from "../components/ThemeSelector";

const SideModal = ({ clientFiles, onFileClick }) => {
  return (
    <div className="bg-gray-900 text-white h-full w-64 fixed top-0 left-0">
      <ul className="menu bg-gray-900 text-white min-h-full p-4">
        <li className="text-lg font-bold pb-4">Client Files</li>
        {clientFiles.map((file, index) => (
          <li
            key={index}
            className="py-2 px-4 rounded-md hover:bg-gray-700 cursor-pointer"
            onClick={() => onFileClick(file)}
          >
            {file.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

const CodeEditor = () => {
  const [language, setLanguage] = useState("javascript");
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [isWordWrapEnabled, setIsWordWrapEnabled] = useState(true);
  const [theme, setTheme] = useState("vs-dark");
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Simulating user login status
  const [clientFiles, setClientFiles] = useState([
    { name: "file1.js", content: "// JavaScript content here" },
    { name: "file2.html", content: "<!-- HTML content here -->" },
    { name: "file3.css", content: "/* CSS content here */" },
  ]); // Mock client files

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
    editor.updateOptions({
      wordWrap: isWordWrapEnabled ? "on" : "off",
    });
  };

  const toggleWordWrap = () => {
    setIsWordWrapEnabled((prevState) => !prevState);
  };

  const onSelect = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    setValue(LANGUAGE_STARTERS[selectedLanguage]);
  };

  const onSelectTheme = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  const handleFileClick = (file) => {
    console.log(file);
    setValue(file.content);
    // Optionally, set language dynamically based on the file extension
    const extension = file.name.split(".").pop();
    const languageMap = {
      js: "javascript",
      html: "html",
      css: "css",
    };
    setLanguage(languageMap[extension] || "plaintext");
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.updateOptions({
        wordWrap: isWordWrapEnabled ? "on" : "off",
      });
    }
  }, [isWordWrapEnabled]);

  return (
    <div className="h-screen w-full bg-gray-900 text-white flex flex-col">
      {/* Navbar */}
      <Navbar className="w-full bg-gray-800 text-white p-4" />

      <div className="flex flex-1">
        {/* Sidebar */}
        {isLoggedIn && (
          <SideModal clientFiles={clientFiles} onFileClick={handleFileClick} />
        )}

        {/* Main Content */}
        <div className="flex-1 ml-64 p-4 flex">
          {/* Editor Section */}
          <div className="flex-1 flex flex-col pr-4">
            <div className="flex items-center justify-between pb-4">
              {/* Editor Controls */}
              <div className="flex items-center gap-4">
                <LanguageSelector language={language} onSelect={onSelect} />
                <button
                  onClick={toggleWordWrap}
                  className="bg-gray-800 hover:bg-gray-700 text-white py-1 px-3 rounded-md"
                >
                  {isWordWrapEnabled ? "Disable Word Wrap" : "Enable Word Wrap"}
                </button>
                <ThemeSelector theme={theme} onSelect={onSelectTheme} />
              </div>
            </div>

            {/* Code Editor */}
            <Editor
              height="calc(100% - 4rem)"
              theme={theme}
              language={language}
              value={value}
              onChange={(value) => setValue(value)}
              onMount={onMount}
              className="rounded-md border border-gray-700 flex-1"
            />
          </div>

          {/* Output Section */}
          <div className="flex-1 bg-gray-800 rounded-md p-4 border border-gray-700">
            <Output editorRef={editorRef} language={language} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
