import React, { useEffect, useState } from "react"; //imports React and two hooks, useEffect and useState, from the "react" library, enabling stateful logic and side effect handling in functional components.

export default function App() {
  // Exporting the default function component named App
  const [items, setItems] = useState([]); // Creating a state variable 'items' with initial value an empty array, and a function 'setItems' to update its value
  const [inputText, setInputText] = useState(""); // Creating a state variable 'inputText' with initial value an empty string, and a function 'setInputText' to update its value

  // Fetch the list of items from the backend when the component mounts
  useEffect(() => {
    fetchItems();
  }, []);

  // Function to fetch the list of items from the backend
  async function fetchItems() {
    try {
      const response = await fetch("http://localhost:3002");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }

  // Function to add a new item to the list
  async function addItem() {
    try {
      const response = await fetch("http://localhost:3002", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });
      await response.text();
      setInputText("");
      fetchItems();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  }

  // Function to mark item as completed
  async function completeItem(id, text) {
    const confirmComplete = window.confirm(
      `Tandai item "${text}" sebagai selesai?`,
    );
    if (!confirmComplete) return;

    try {
      const response = await fetch(`http://localhost:3002/${id}/complete`, {
        method: "PUT",
      });
      await response.text();
      alert(`Item "${text}" telah ditandai selesai ✅`);
      fetchItems(); // Refresh data
    } catch (error) {
      console.error("Error marking item as completed:", error);
    }
  }

  // Function to delete an item from the list
  async function deleteItem(id) {
    try {
      const response = await fetch(`http://localhost:3002/${id}`, {
        method: "DELETE",
      });
      await response.text();
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  const dStyle = {
    margin: "10px",
  };

  return (
    // Container div for the entire To-Do List application
    <div className="container">
      {/* Heading section */}
      <div className="heading">
        <h1>To-Do List</h1>
      </div>

      {/* Form section */}
      <div className="form">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        {/* Button to add a new To-Do item */}
        <button onClick={addItem}>
          <span>Add</span>
        </button>
      </div>

      {/* List section */}
      <ul>
        {/* Map over the items array to render each To-Do item */}
        {items.map((item) => (
          // Each To-Do item is represented as an <li> element with a unique key
          <li key={item.id}>
            {/* Display text with strikethrough if completed */}
            <span
              style={{
                textDecoration: item.completed ? "line-through" : "none",
              }}>
              {item.text}
            </span>
            {/* Button Telah Selesai */}
            {!item.completed && (
              <button
                style={dStyle}
                onClick={() => completeItem(item.id, item.text)}>
                <span>Telah Selesai</span>
              </button>
            )}{" "}
            {/* Button to delete the current To-Do item */}
            <button style={dStyle} onClick={() => deleteItem(item.id)}>
              <span>Delete</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
