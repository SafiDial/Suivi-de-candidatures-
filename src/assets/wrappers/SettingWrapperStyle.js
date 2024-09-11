import styled from "styled-components";

const Wrapper = styled.div`
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .controls {
    display: flex;
    gap: 10px;
  }

  .btn {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
  }

  .btn:hover {
    background-color: #0056b3;
  }

  .event-form {
    position: absolute;
    top: 10%;
    left: 10%;
    width: 80%;
    padding: 20px;
    background: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    z-index: 1000;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .form-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }

  .color-palette {
    display: flex;
    gap: 10px;
  }

  .color-option {
    cursor: pointer;
  }

  .event-details {
    position: absolute;
    top: 10%;
    left: 10%;
    width: 80%;
    padding: 20px;
    background: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    z-index: 1000;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .event-actions {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }
`;

export default Wrapper;
