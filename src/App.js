import "./styles.css";
import { useState } from "react";

export default function App() {
  const [Data, setData] = useState([]);
  const [formData, setformData] = useState({ name: "", address: "" });
  const [EditClick, SetEditClick] = useState(false);
  const [EditId, setEditId] = useState(0);

  const handleData = () => {
    if (EditClick == false) {
      setData([...Data, formData]);
      console.log(Data);
      setformData({ name: "", address: "" });
      SetEditClick(false);
    } else {
      const studata = Data.map((item, index) => {
        if (index === EditId) {
          return {
            ...formData,
            name: formData.name,
            address: formData.address
          };
        }
        return item;
      });
      setData(studata);
      setformData({ name: "", address: "" });
      SetEditClick(false);
    }
  };

  const EditData = (id) => {
    setEditId(id);
    return Data.map((item, index) => {
      if (index === id) {
        setformData({ name: item.name, address: item.address });
      }
    });
  };

  const DeleteData = (id) => {
    return setData(Data.filter((item, index) => index !== id));
  };
  return (
    <div className="Container">
      <input
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        value={EditClick ? "Update" : "Add"}
      />
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Student Form
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                name="name"
                className="txt_name"
                value={formData.name}
                onChange={(e) =>
                  setformData({ ...formData, name: e.target.value })
                }
                placeholder="Enter the Name"
              />
              <textarea
                className="txt_address"
                value={formData.address}
                onChange={(e) =>
                  setformData({ ...formData, address: e.target.value })
                }
                placeholder="Enter the Address"
              ></textarea>
            </div>
            <div class="modal-footer">
              <input
                type="button"
                class="btn btn-primary"
                onClick={handleData}
                value={EditClick ? "Update" : "Add"}
              />
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <table className="table table-striped mt-5">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>

        <tbody>
          {Data?.map((item, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.address}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => {
                      SetEditClick(true);
                      EditData(index);
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => DeleteData(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
