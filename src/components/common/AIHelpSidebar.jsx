import { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

export default function AIHelpSidebar({ open, onClose }) {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(350); // initial width in px
  const isResizing = useRef(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("http://localhost:4000/api/v1/ai/ai-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      setResponse(data.answer);
    } catch (err) {
      console.error(err);
      setResponse("An error occurred while fetching the response.");
    }

    setLoading(false);
  };

  // Resize handlers
  const handleMouseDown = () => {
    isResizing.current = true;
  };

  const handleMouseMove = (e) => {
    if (!isResizing.current) return;
    const newWidth = window.innerWidth - e.clientX;
    if (newWidth >= 300 && newWidth <= 600) {
      setWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
  };

  // Attach global listeners
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseup", handleMouseUp);

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-richblack-900 shadow-lg z-[2000] transition-transform duration-300 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ width: `${width}px` }}
    >
      {/* Resizer Bar */}
      <div
        className="absolute top-0 left-0 h-full w-2 cursor-ew-resize z-10"
        onMouseDown={handleMouseDown}
      />

      {/* Sidebar Content */}
      <div className="flex justify-between items-center p-4 border-b border-richblack-700">
        <h3 className="text-lg font-bold text-white">AI-Help</h3>
        <button onClick={onClose} className="text-white text-xl">
          &times;
        </button>
      </div>
      <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-2">
        <textarea
          className="w-full h-24 p-2 rounded bg-richblack-800 text-white"
          placeholder="Ask your coding question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2"
          disabled={loading}
        >
          {loading ? "Asking..." : "Ask"}
        </button>
      </form>
      <div className="p-4 text-white overflow-y-auto h-[calc(100%-180px)]">
        {response && (
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {response}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}
