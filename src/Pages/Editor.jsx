import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaSpinner } from "react-icons/fa";
import "../../codemirror/lib/codemirror.js";
import "../../codemirror/lib/codemirror.css";
import "../../codemirror/addon/edit/closebrackets.js";
import axios from "axios";
import { themeConfig } from "../components/constants.js";
import { languagesConfig } from "../components/constants.js";
import Navbar from "../components/Navbar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setUserFiles } from "../Redux/fileSlice.js";
import { login } from "../Redux/authSlice.js";
import { IoMdAdd } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { addFile } from "../Redux/fileSlice.js";
import { db, addDoc, saveCodeToFirestore } from "../components/firebase.js";
import { doc, collection, getDoc, getDocs } from "firebase/firestore";
import { LogIn, FilePlus2, Terminal } from "lucide-react";

const CodeEditor = () => {
  const editorRef = useRef(null);
  const editorInstance = useRef(null);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("dracula");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(null); // Track the timer
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const selectedFileIdRef = useRef(null);

  //Redux Authentication
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userId = useSelector((state) => state.auth.userId);

  //Redux file bar
  const files = useSelector((state) => state.files?.files || []);

  const dispatch = useDispatch();

  const handleCodeChange = useCallback(() => {
    const newCode = editorInstance.current.getValue();
    setCode(newCode);
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(() => {
      if (userId && selectedFileIdRef.current) {
        saveCodeToFirestore(userId, selectedFileIdRef.current, newCode);
      }
    }, 3000);
    setTimer(newTimer);
  }, [userId, timer, saveCodeToFirestore]);

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

  const handleRunCode = useCallback(async () => {
    setLoading(true);
    const currentCode = editorInstance.current.getValue();
    const data = {
      language: selectedLanguage,
      version: languagesConfig[selectedLanguage].version,
      sourceCode: currentCode,
      codeInput: input || "",
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/code/execute-code",
        data
      );
      setOutput(
        response.data.stdout || response.data.stderr || "Error occurred."
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [selectedLanguage, input]);

  const handleThemeChange = (e) => {
    const theme = e.target.value;
    setSelectedTheme(theme);

    if (editorInstance.current) {
      editorInstance.current.setOption("theme", theme); // Apply theme directly
    }
  };

  useEffect(() => {
    return () => {
      // Save the code when the component unmounts
      if (userId && selectedFileIdRef.current) {
        const currentCode = editorInstance.current.getValue();
        saveCodeToFirestore(userId, selectedFileIdRef.current, currentCode);
      }
    };
  }, [userId]);

  //fetching default file
  const [fileContents, setFileContents] = useState({}); // Store content per file

  const handleFileClick = async (file) => {
    if (selectedFileIdRef.current) {
      // Save the currently open file's content before switching
      const currentCode = editorInstance.current.getValue();
      setFileContents((prev) => ({
        ...prev,
        [selectedFileIdRef.current]: currentCode, // Save changes locally
      }));
      await saveCodeToFirestore(userId, selectedFileIdRef.current, currentCode);
    }

    selectedFileIdRef.current = file.id; // Set new selected file ID

    setLoading(true);

    try {
      const fileRef = doc(db, "Users", userId, "files", file.id);
      const fileDoc = await getDoc(fileRef);
      if (fileDoc.exists()) {
        const fileData = fileDoc.data();
        const fileContent = fileData.content || ""; // Ensure no undefined content

        console.log("Fetched file data:", fileContent);

        // Set local state, so it persists when switching files
        setFileContents((prev) => ({
          ...prev,
          [file.id]: fileContent,
        }));

        setSelectedLanguage(fileData.type || ""); // Set language

        // If the editor is initialized, update it with the fetched content
        if (editorInstance.current) {
          editorInstance.current.setValue(fileContent);
        }
      } else {
        console.log("No such file!");
      }
    } catch (error) {
      console.log("Error fetching file content:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!editorInstance.current && editorRef.current) {
      // Initialize CodeMirror
      editorInstance.current = CodeMirror.fromTextArea(
        document.getElementById("editor"),
        {
          mode: languagesConfig[selectedLanguage]?.mode || "text/plain",
          theme: selectedTheme || "default",
          lineNumbers: true,
          autoCloseBrackets: true,
        }
      );
      editorInstance.current.setSize("100%", "94%");

      // Add change listener to track code updates
      editorInstance.current.on("change", handleCodeChange);
    } else if (editorInstance.current) {
      const languageConfig = languagesConfig[selectedLanguage];
      if (languageConfig) {
        editorInstance.current.setOption("mode", languageConfig.mode);
      }
      editorInstance.current.setOption("theme", selectedTheme);
    }

    // Ensure that when switching files, the correct content is loaded
    if (editorInstance.current && selectedFileIdRef.current) {
      const savedContent = fileContents[selectedFileIdRef.current];
      if (savedContent !== undefined) {
        editorInstance.current.setValue(savedContent);
      }
    }
  }, [selectedLanguage, selectedTheme, fileContents]); // Depend on `fileContents` to update on file switch

  useEffect(() => {
    if (isAuthenticated && userId) {
      const fetchUserFiles = async () => {
        try {
          const filesCollectionRef = collection(db, "Users", userId, "files");
          const fileSnapshot = await getDocs(filesCollectionRef);
          const fileList = fileSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          dispatch(setUserFiles(fileList)); // Dispatch the fetched files
        } catch (error) {
          console.log("Error fetching files:", error);
        }
      };

      fetchUserFiles();
    }
  }, [isAuthenticated, userId, dispatch]);

  const handleLogin = () => {
    if (isAuthenticated) {
      dispatch(logout());
      navigate("/");
    } else {
      navigate("/signup");
    }
  };
  return (
    <div className="h-screen bg-zinc-900 flex flex-col">
      <header className="border-b border-zinc-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1
              className="text-xl font-semibold text-white cursor-pointer"
              onClick={() => navigate("/")}
            >
              CodeCanvas
            </h1>
            <div className="flex items-center gap-2">
              {/* language selection */}
              <select
                value={selectedLanguage}
                onChange={handleLanguageChange}
                id="languageSelector"
                className="bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-md border border-zinc-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.keys(languagesConfig).map((key) => (
                  <option value={key} key={key}>
                    {languagesConfig[key].name}
                  </option>
                ))}
              </select>

              {/* theme selection */}
              <select
                id="themeSelector"
                onChange={handleThemeChange}
                value={selectedTheme}
                className="bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-md border border-zinc-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.keys(themeConfig).map((theme) => (
                  <option key={theme} value={theme}>
                    {theme}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isAuthenticated && (
              <button
                className="flex items-center gap-2 px-3 py-1.5 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
                onClick={handleLogin}
              >
                <LogIn className="w-4 h-4" />
                <span className="text-sm">Sign In</span>
              </button>
            )}
            <button className="p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-md transition-colors">
              {/* <Settings className="w-5 h-5" /> */}
            </button>

            {/* Run Button */}
            <button
              onClick={handleRunCode}
              disabled={loading} // Disable button while loading
              className={`${
                loading ? "bg-gray-600" : "bg-green-800 hover:bg-green-500"
              } text-white px-4 py-1.5 rounded-md text-sm font-medium flex items-center gap-2 transition-colors`}
            >
              {loading ? (
                <FaSpinner className="animate-spin" /> // Spinner while loading
              ) : (
                <FaPlay />
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Sidebar - Only shown when authenticated */}
        {isAuthenticated && (
          <div
            className="w-64 border-r border-zinc-800 flex flex-col"
            ref={sidebarRef}
          >
            {/* First section: Files header */}
            <div className="p-4 border-b border-zinc-800">
              <div className="flex items-center justify-between">
                <h2 className="text-zinc-200 font-medium">Files</h2>
                <button
                  className="p-1 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-md transition-colors"
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                >
                  <FilePlus2 color="#ffffff" className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Files List */}
            <ul className="flex-grow overflow-y-auto py-2 px-1 text-left text-md">
              {files.map((file) => (
                <li
                  key={file.id}
                  onClick={() => handleFileClick(file)} // Pass the file to the handler
                  className={`py-3 px-2 text-white rounded-md hover:bg-zinc-400 hover:text-white cursor-pointer ${
                    file.id === selectedFileIdRef.current
                      ? "bg-zinc-600 text-white"
                      : ""
                  }`}
                >
                  {file.name}.{file.type}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className=" w-full flex flex-col">
          <div className={`codeeditorarea h-full w-full  p-3 pb-0`}>
            <textarea
              ref={editorRef}
              id="editor"
              className=" h-[50%] "
            ></textarea>
          </div>

          {/* input output boxes */}
          <div className="inputoutputarea h-80 border-t border-zinc-800 flex">
            {/* Input Panel */}
            <div className="input-container  flex-1 border-r border-zinc-800">
              <div className="flex items-center justify-between p-2 border-b border-zinc-800">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Terminal className="w-4 h-4" />
                  <span className="text-sm">Input</span>
                </div>
              </div>
              <div className="p-4 h-[calc(100%-41px)]">
                <textarea
                  value={input}
                  onChange={handleInputChange}
                  className=" input-text-area w-full h-full bg-zinc-800 text-zinc-200 p-3 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            {/* <div className="inputoutputarea bg-zinc-800  w-full col-span-1 flex justify-center items-between flex-col gap-2 px-5 py-3"> */}
            {/* <div className="input-container  w-full h-1/2 p-4">
            <h2 className="text-white text-xl font-firacode mb-2">Input</h2>
            <textarea
              className="input-text-area bg-white w-full h-[90%] rounded-xl p-2 "
              value={input}
              onChange={handleInputChange}
            ></textarea>
          </div> */}

            {/* Output Panel */}
            <div className="output-container flex-1">
              <div className="flex items-center justify-between p-2 border-b border-zinc-800">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Terminal className="w-4 h-4" />
                  <span className="text-sm">Output</span>
                </div>
              </div>
              <div className="p-4 h-[calc(100%-41px)]">
                <textarea
                  className="output-text-area w-full h-full bg-zinc-800 text-zinc-200 p-3 rounded-lg font-mono text-sm overflow-auto"
                  value={output}
                  readOnly
                ></textarea>
                {/* <div className="w-full h-full bg-zinc-800 text-zinc-200 p-3 rounded-lg font-mono text-sm overflow-auto">
                {output || "No output yet..."}
              </div> */}
              </div>
            </div>

            {/* <div className="output-container  w-full h-1/2 p-4">
            <h2 className="text-white text-xl font-firacode mb-2">Output</h2>
            <textarea
              className="output-text-area bg-white w-full h-[90%] rounded-xl p-2"
              value={output}
              readOnly
            ></textarea>
          </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;

export const CreateFile = () => {
  const dispatch = useDispatch();
  const [fileName, setFileName] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const userId = useSelector((state) => state.auth.userId);
  // Close modal
  const closeModal = () => {
    document.getElementById("my_modal_1").close();
  };

  const handleCreateFile = async () => {
    if (fileName.trim() && selectedLanguage) {
      const newFile = {
        name: fileName,
        type: selectedLanguage,
        content: languagesConfig[selectedLanguage]?.codeSnippet || "", // Default content based on language
      };

      try {
        const filesRef = collection(db, "Users", userId, "files");
        const docRef = await addDoc(filesRef, newFile);

        console.log("Document written with ID: ", docRef.id);
        dispatch(addFile({ ...newFile, id: docRef.id }));

        closeModal();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      alert("File Name and Type cannot be empty!");
    }
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value); // Get the selected language key
  };

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Create a New File</h3>

        <div className="py-4">
          {/* Input for file name */}
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="file_name"
          >
            File Name
          </label>
          <input
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            id="file_name"
            type="text"
            placeholder="Enter file name"
            className="input input-bordered w-full mt-1"
          />
        </div>

        <div className="py-4">
          {/* Dropdown for file type */}
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="file_type"
          >
            File Type
          </label>
          <select
            id="file_type"
            className="select select-bordered w-full mt-1"
            value={selectedLanguage}
            onChange={handleLanguageChange}
          >
            {Object.keys(languagesConfig).map((key) => (
              <option value={key} key={key}>
                {languagesConfig[key].name}
              </option>
            ))}
          </select>
        </div>

        <div className="modal-action">
          <button onClick={handleCreateFile} className="btn btn-primary">
            Create
          </button>

          <form method="dialog">
            {/* Close button */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};
