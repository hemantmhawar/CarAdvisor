import { useState } from "react";
import axios from "axios";

function CarAdvisor() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return alert("Please enter a search term");

    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/CarAdvisor/search", {
        params: { query: searchTerm },
      });

      const mappedResults = response.data?.map((item) => ({
        title: item.title,
        snippet: item.snippet,
        link: item.link,
        image: item.thumbnail || item.image || null,
      })) || [];

      setResults(mappedResults);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Something went wrong. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center text-primary mb-4">🚗 Car Advisor</h1>

      {/* Minimal Search Box */}
      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Type your car query..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Results */}
      <div className="row">
        {results.length === 0 && !loading && (
          <p className="text-center text-secondary">No results yet.</p>
        )}

        {results.map((item, index) => (
          <div className="col-md-6 mb-3" key={index}>
            <div className="card shadow-sm h-100">
              {item.image && (
                <img
                  src={item.image}
                  className="card-img-top"
                  alt={item.title}
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title text-primary">{item.title}</h5>
                <p className="card-text">{item.snippet}</p>
                <a
                  href={item.link}
                  className="btn btn-outline-primary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit Link
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarAdvisor;
