import React, { useEffect, useRef, useState } from "react";
import { FaPlay, FaSpinner } from "react-icons/fa";
import "../../codemirror/lib/codemirror.js";
import "../../codemirror/lib/codemirror.css";
import "../../codemirror/mode/clike/clike.js";
import "../../codemirror/theme/dracula.css";
import "../../codemirror/addon/edit/closebrackets.js";
import axios from "axios";
import { themeConfig } from "../components/constants.js";
import { languagesConfig } from "../components/constants.js";

const CodeEditor = () => {
  const editorRef = useRef(null);
  const editorInstance = useRef(null);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("dracula");
  const [loading, setLoading] = useState(false);

  const handleLanguageChange = (e) => {
    const languageKey = e.target.value; // Get the selected language key
    setSelectedLanguage(languageKey);

    if (editorInstance.current && languagesConfig[languageKey]) {
      editorInstance.current.setOption(
        "mode",
        languagesConfig[languageKey].mode
      );

      // set the codeSnippet for the selected language
      setCode(languagesConfig[languageKey].codeSnippet);
      editorInstance.current.setValue(languagesConfig[languageKey].codeSnippet);
    }
  };
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  const handleRunCode = async (e) => {
    setLoading(true);
    // Directly fetch the latest code value from the editor instance
    const currentCode = editorInstance.current.getValue();

    // Prepare the data object with the latest code
    const data = {
      language: selectedLanguage,
      version: languagesConfig[selectedLanguage].version,
      sourceCode: currentCode, // Use the current code value
      codeInput: input || "",
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/code/execute-code",
        data
      );

      if (response.data.stdout === "") {
        setOutput(response.data.stderr || "Error occurred.");
      } else {
        setOutput(response.data.stdout);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };
  const handleThemeChange = (e) => {
    const theme = e.target.value;
    setSelectedTheme(theme);

    if (editorInstance.current) {
      editorInstance.current.setOption("theme", theme); // Apply theme directly
    }
  };

  //Default Intilization of langugae
  useEffect(() => {
    const defaultLanguage = "cpp"; // Set a default language
    setSelectedLanguage(defaultLanguage);
    setCode(languagesConfig[defaultLanguage]?.codeSnippet);
  }, []);

  useEffect(() => {
    if (!editorInstance.current && editorRef.current) {
      // Initialize CodeMirror
      editorInstance.current = CodeMirror.fromTextArea(
        document.getElementById("editor"),
        {
          mode: languagesConfig[selectedLanguage]?.mode || "text/plain",
          theme: selectedTheme || "default", // Use the selected theme or fallback to default
          lineNumbers: true,
          autoCloseBrackets: true,
        }
      );
      editorInstance.current.setSize("100%", "94%");
    } else if (editorInstance.current) {
      const languageConfig = languagesConfig[selectedLanguage];
      if (languageConfig) {
        editorInstance.current.setOption("mode", languageConfig.mode);
      }
      editorInstance.current.setOption("theme", selectedTheme);
      editorInstance.current.setValue(
        languagesConfig[selectedLanguage].codeSnippet
      );
    }
  }, [selectedLanguage, selectedTheme]);

  return (
    <div className="bg-black w-full h-screen overflow-hidden">
      <div className="h-[90%] grid grid-cols-5 gap-2 mt-10 ">
        {/* sidebar opening section */}
        <div className="sidebar  w-full h-[100%]  col-span-1 ">
          <ul className="w-full h-full bg-zinc-200 py-4 px-2 text-left text-lg ">
            <li className="py-3 px-2 font-bold rounded-lg hover:bg-zinc-400 hover:text-white ">
              file1.c
            </li>
            <li className="py-3 px-2 font-bold rounded-lg hover:bg-zinc-400 hover:text-white ">
              file2
            </li>
            <li className="py-3 px-2 font-bold rounded-lg hover:bg-zinc-400 hover:text-white ">
              file3
            </li>
          </ul>
        </div>
        {/* main editor writing section */}
        <div className="codeeditorarea  h-full w-full col-span-3 p-3">
          <div className="editor-options  w-full h-[3rem] flex justify-between place-items-start gap-5 ">
            <span className="flex justify-center items-center gap-3">
              <select
                value={selectedLanguage}
                onChange={handleLanguageChange}
                id="languageSelector"
                className="px-3 py-2 bg-zinc-600 text-white rounded-md"
              >
                {Object.keys(languagesConfig).map((key) => (
                  <option value={key} key={key}>
                    {languagesConfig[key].name}
                  </option>
                ))}
              </select>

              <select
                id="themeSelector"
                onChange={handleThemeChange}
                value={selectedTheme}
                className="px-3 py-2 bg-zinc-600 text-white rounded-md"
              >
                {Object.keys(themeConfig).map((theme) => (
                  <option key={theme} value={theme}>
                    {theme}
                  </option>
                ))}
              </select>
            </span>

            {/* Run Button */}
            <button
              onClick={handleRunCode}
              disabled={loading} // Disable button while loading
              className={`${
                loading ? "bg-gray-600" : "bg-green-800 hover:bg-green-500"
              } text-white flex justify-center items-center p-3 rounded-lg`}
            >
              {loading ? (
                <FaSpinner className="animate-spin" /> // Spinner while loading
              ) : (
                <FaPlay />
              )}
            </button>
          </div>
          <textarea ref={editorRef} id="editor" className=" h-[50%]"></textarea>
        </div>
        {/* input output boxes */}
        <div className="inputoutputarea bg-zinc-800  w-full col-span-1 flex justify-center items-between flex-col gap-2 px-5 py-3">
          <div className="input-container  w-full h-1/2 p-4">
            <h2 className="text-white text-xl font-firacode mb-2">Input</h2>
            <textarea
              className="input-text-area bg-white w-full h-[90%] rounded-xl p-2 "
              value={input}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="output-container  w-full h-1/2 p-4">
            <h2 className="text-white text-xl font-firacode mb-2">Output</h2>
            <textarea
              className="output-text-area bg-white w-full h-[90%] rounded-xl p-2"
              value={output}
              readOnly
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
