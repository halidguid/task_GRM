import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";

const list = [
  {
    position: 1,
    name: "item1",
    score: 0,
  },
  {
    position: 2,
    name: "item2",
    score: 0,
  },
  {
    position: 3,
    name: "item3",
    score: 0,
  },
  {
    position: 4,
    name: "item4",
    score: 0,
  },
  {
    position: 5,
    name: "item5",
    score: 0,
  },
  {
    position: 6,
    name: "item6",
    score: 0,
  },
];

function Task() {
  const [itemList, setItemList] = useState(list);
  const [combinationsList, setCombinationsList] = useState([]);
  const [randomItems, setRandomItems] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    let tmp = [...itemList];
    setRandomItems(tmp.sort(() => 0.5 - Math.random()).slice(0, 2));
    setShow(true);
  };

  const handleSubmit = () => {
    let equals = false;
    for (let i = 0; i < combinationsList.length; i++) {
      if (
        combinationsList[i] ===
        randomItems[0].position + randomItems[1].position
      ) {
        console.log("err");
        equals = true;
        return;
      }
    }
    if (!equals) {
      let arr = randomItems[0].position + randomItems[1].position;
      setCombinationsList([...combinationsList, arr]);
      if (randomItems[0].value > randomItems[1].value) {
        for (let i = 0; i < itemList.length; i++) {
          if (itemList[i].position === randomItems[0].position) {
            itemList[i].score = itemList[i].score + 1;
          }
        }
      } else {
        for (let i = 0; i < itemList.length; i++) {
          if (itemList[i].position === randomItems[1].position) {
            itemList[i].score = itemList[i].score + 1;
          }
        }
      }
      let tmp = itemList;
      tmp.sort((a, b) => b.score - a.score);
      setItemList(tmp);
    }
    handleClose();
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {randomItems.length > 0 ? (
            <div>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={randomItems[0].name}
                  disabled
                ></Form.Control>
                <Form.Label>Score</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => {
                    randomItems[0].value = e.target.value;
                    let arr = randomItems;
                    setRandomItems(arr);
                  }}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={randomItems[1].name}
                  disabled
                ></Form.Control>
                <Form.Label>Score</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => {
                    randomItems[1].value = e.target.value;
                    let arr = randomItems;
                    setRandomItems(arr);
                  }}
                ></Form.Control>
              </Form.Group>
            </div>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Position</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {itemList.map((item, key) => (
            <tr key={key}>
              <td>{item.position}</td>
              <td>{item.name}</td>
              <td>{item.score}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={() => handleShow()}>Open</Button>
    </div>
  );
}

export default Task;
