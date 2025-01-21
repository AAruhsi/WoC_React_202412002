import { LANGUAGE_VERSIONS } from "./constants";
import axios from "axios";

// Judge0 API Endpoint
const JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com";
const RAPIDAPI_KEY = "e521450261msh98ff2bb99bdca98p1099c9jsn30ffa423f407";

export const executeCode = async (language, sourceCode) => {
  try {
    // Step 1: Submit code for execution
    const submissionResponse = await axios.post(
      `${JUDGE0_API_URL}/submissions`,
      {
        source_code: sourceCode,
        language_id: LANGUAGE_VERSIONS[language], // Map your language to Judge0 ID
        stdin: "123", // Optional input if required
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          "X-RapidAPI-Key": RAPIDAPI_KEY,
        },
      }
    );

    // Extract submission token
    const { token } = submissionResponse.data;

    console.log(`Submission Token: ${token}`);

    // Step 2: Poll for result
    const resultResponse = await axios.get(
      `${JUDGE0_API_URL}/submissions/${token}?base64_encoded=false`,
      {
        headers: {
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          "X-RapidAPI-Key": RAPIDAPI_KEY,
        },
      }
    );

    // Step 3: Handle result
    console.log("Execution Result:", resultResponse.data);

    return resultResponse.data; // Return result to the caller
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
};
