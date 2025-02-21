"use client";
import { useState } from "react";
import axios from "axios";
import MultipleSelector, { Option } from "./ui/multiInput";

const OPTIONS: Option[] = [
  { label: "Numbers", value: "numbers" },
  { label: "Highest Alphabet", value: "highest-alpha" },
];

export default function DataProcessor() {
  const [inputData, setInputData] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  // Handle selection change
  const handleSelectionChange = (options: Option[]) => {
    setSelectedOptions(options);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Parse JSON input
      const parsedData = JSON.parse(inputData);

      const requestBody = {
        data: parsedData.data, // Send 'data' as per API requirement
        selectedOptions: selectedOptions.map((option) => option.value),
      };

      console.log("Sending request:", requestBody);

      // Send API request
      const res = await axios.post(
        "http://localhost:3000/api/annexure",
        requestBody
      );
      setResponse(res.data);
      setError(null);
    } catch (err) {
      console.error("Error:", err);
      //@ts-ignore
      setError("Invalid JSON or API request failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4">Data Processing API</h1>

      <form className="w-full max-w-lg space-y-4" onSubmit={handleSubmit}>
        <textarea
          className="w-full p-3 rounded-md border-gray-500"
          rows={5}
          placeholder='Enter JSON here (e.g. { "data": ["A", "C", "z"] })'
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />

        <div className="w-full z-10">
          <MultipleSelector
            defaultOptions={OPTIONS}
            placeholder="Select options..."
            onChange={handleSelectionChange}
            emptyIndicator={
              <p className="text-center text-lg leading-10 text-white bg-black">
                No results found.
              </p>
            }
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
        >
          Process Data
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {response && (
        <div className="mt-6 w-full max-w-lg p-4 bg-gray-800 rounded-md">
          <h2 className="text-lg font-semibold">Response:</h2>
          <pre className="text-sm text-green-400">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
