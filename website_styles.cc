body {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgb(135, 8, 135);
  margin: 0;
  min-height: 200vh;
}

  li {
    display: inline;
  }

  .search-box {
    display: inline;
    align-items: center;
    background: linear-gradient(to left, rgb(135, 8, 135), #ff8800); /* Gradient background */
    color: black;
    padding: 12px;
    border-radius: 25px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
  }

  .search-box::placeholder {
    color: rgb(62, 62, 62); 
    opacity: 80%;
  }

  button {
    background: linear-gradient(to left, rgb(135, 8, 135), #ff8800ce); /* Gradient background */
    color: white;
    border: 2px solid rgb(135, 8, 135);
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
    size: 20px;
  }
  
  button:hover {
    background: #ff8800;
    color: black;
  }
