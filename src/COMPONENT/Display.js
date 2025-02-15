import React, { useEffect, useRef, useState } from "react";
import { renderAsync } from "docx-preview";

function Display() {
  const [selectedOption, setSelectedOption] = useState("Option 1");
  const [docData, setDocData] = useState(null);
  const docRef = useRef(null);

  useEffect(() => {
    fetch("/HRM 523 - Assignment 2.docx")
      .then((res) => res.arrayBuffer())
      .then((data) => {
        setDocData(data); // Store original DOCX data
        renderDoc(data); // Render initial DOCX
      })
      .catch((err) => console.error("Error loading DOCX:", err));
  }, [setSelectedOption]);

  const renderDoc = (data) => {
    if (docRef.current) {
      docRef.current.innerHTML = ""; // Clear previous render
      renderAsync(data, docRef.current);
    }
  };

  // Function to replace "Objective" with selected dropdown value
  const handleReplaceText = () => {
    if (!docData) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      let text = new TextDecoder().decode(event.target.result);
      text = text.replace(/members/g, selectedOption); // Replace all occurrences
      const updatedData = new TextEncoder().encode(text);
      renderDoc(updatedData); // Re-render updated DOCX
    };

    reader.readAsArrayBuffer(new Blob([docData]));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Document Viewer with Editable Sections</h2>

      {/* Dropdown for selection */}
      <label>Select an Option:</label>
      <select onChange={(e) => setSelectedOption(e.target.value)} value={selectedOption}>
        <option value="Option">Option 1</option>
        <option value="Option 2">Option 2</option>
        <option value="Option 3">Option 3</option>
      </select>

      {/* Button to apply changes */}
      <button onClick={handleReplaceText} style={{ marginLeft: "10px" }}>Apply Changes</button>

      {/* DOCX Viewer */}
      <div ref={docRef} style={{ border: "1px solid gray", marginTop: "20px", padding: "10px" }} />
    </div>
  );
}

export default Display;
