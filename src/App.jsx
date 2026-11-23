
import { useEffect, useState } from "react";

function App() {
  const [offices, setOffices] = useState([]);
  const [search, setSearch] = useState("");

  function getOffices() {
    fetch("/api/offices/all")
      .then(response => response.json())
      .then(data => setOffices(data))
      .catch(error => console.log(error));
  }

  useEffect(() => {
    getOffices();
  }, []);

  const filteredOffices = offices.filter(office =>
    office.name.toLowerCase().includes(search.toLowerCase()) ||
    String(office.officeNumber).includes(search)
  );

  function deleteOffice(id) {
    if (window.confirm("Are you sure you want to delete this office?")) {
      fetch(`/api/offices/delete/${id}`, {
        method: "DELETE"
      })
        .then(response => {
          if (response.ok) {
            setOffices(offices.filter(office => office.id !== id));
          } else {
            alert("Could not delete office");
          }
        });
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Available Offices</h1>

      <input
        type="text"
        placeholder="Search office name or number"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Office Name</th>
            <th>Office Number</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredOffices.map(office => (
            <tr key={office.id}>
              <td>{office.name}</td>
              <td>{office.officeNumber}</td>
              <td>
                <button onClick={() => deleteOffice(office.id)}>
                  Delete
                </button>

                <button disabled>
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
