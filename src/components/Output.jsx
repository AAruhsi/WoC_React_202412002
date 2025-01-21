import React, { useState } from "react";
import { executeCode } from "./api";

const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const response = await executeCode(language, sourceCode); // pass language and sourceCode correctly
      response.stdout
        ? setOutput(response.stdout.split("\n"))
        : setOutput(response.stderr.split("\n")); // Output or handle the result
      response.stderr ? setError(true) : setError(false);
    } catch (error) {
      console.error("Error executing code:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button className="btn btn-outline btn-accent " onClick={runCode}>
        {isLoading && <span className="loading loading-spinner"></span>}
        Run code
      </button>
      <div
        className={`box bg-zinc-600 p-3 mt-2 h-[70vh] ${
          isError ? "text-red-400" : "text-zinc-200 "
        } `}
      >
        {output
          ? output.map((line, i) => <p key={i}>{line}</p>)
          : "Click Run Code to see the output"}
      </div>
    </div>
  );
};

export default Output;
