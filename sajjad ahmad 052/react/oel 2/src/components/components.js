import "./component.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function Component() {
  const [listOfCars, setListOfCars] = useState([]);
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    Axios.get("http://localhost:3003/getCars").then((response) => {
      setListOfCars(response.data);
    });
  }, []);

  const addCar = () => {
    if(name&detail &price){
      Axios.post("http://localhost:3003/addCar", {
        name: name,
        detail: detail,
        price: price,
      }).then((response) => {
        setListOfCars([
          ...listOfCars,
          {
              name: name,
              detail: detail,
              price: price,
          },
        ]);
        setName("");
        setDetail("");
        setPrice("");
        alert("car added successfully");
      });
    }
    else{
      alert('input all values')
    }
    
  };

  return (
    <div className="App">
      <h2>Cars</h2>

      <div className="addCarDiv">
        <h4>Add New Cars</h4>
        <input
          type="text"
          placeholder="Name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        /><br/><br/>
        <input
          type="text"
          placeholder="Detail"
          onChange={(event) => {
            setDetail(event.target.value);
          }}
        /><br/><br/>
        <input
          type="number"
          placeholder="Price"
          onChange={(event) => {
            setPrice(event.target.value);
          }}
        /><br/><br/>
        <button onClick={addCar}> Add New Car </button><br/><br/>
      </div>

      <div className="usersDisplay">
        <h4>Cars List</h4>
        {listOfCars.map((car) => {
          return (
            <div className="car">
              <p>Name: {car.name}</p>
              <p>Detail: {car.detail}</p>
              <p>Price: {car.price}</p>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default Component;