import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Paginationone from "./Pagination";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./Card.css";
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import { MdFileDownloadDone } from "react-icons/md";


interface User {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface CartProps {
  users: User[];
  onDelete: (id: number) => void;
  onUpdate: (id: number, newTitle: string) => void;
}

const Cardone: React.FC<CartProps> = ({ users, onDelete, onUpdate }) => {
  //for search functionality
  const [search, setSearch] = useState<string>("");
  //for edit userid and title
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editedUserId, setEditedUserId] = useState<number>(0);

  //for pagination 
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  //for input search bar 
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value.toLowerCase();
    setSearch(searchQuery);
    setCurrentPage(1);
  }

  //this is search function 
  const filteredUsers = users.filter((user) =>
    user.title.toLowerCase().includes(search.toLowerCase())
  );

  //for edit and update 
  const handleEdit = (id: number, title: string) => {
    setEditedUserId(id);
    setEditedTitle(title);
  };

  const handleUpdate = () => {
    onUpdate(editedUserId, editedTitle);
    setEditedUserId(0);
    setEditedTitle("");
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  //pagination 
  const handlePaginationClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  }

  //calculation for pagination 
  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <Container>
        {/* this is using for search bar  */}
        <div id="SearchBar">
          <input className="w-50" type="text" name="search by title" id="search" value={search}
            onChange={handleSearch} placeholder="SEARCH TEXT (ENTER TITLE VALUE)" />
        </div>
      </Container><br />
      {/* this is using for showing api data  */}
      {currentItems.map((user, index) => {
        const isEditing = user.id === editedUserId;
        return (
          <Col sm={12} md={6} lg={4} key={user.id} className="mb-4 d-flex justify-content-center align-items-center">
            <Card style={{ width: '18rem' }} key={index} id="maincard">
              <Card.Title id="title"> {user.id} {" "}
                {isEditing ? (
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={handleTitleChange}
                  />
                ) : (
                  user.title
                )}
                <Button
                  variant="primary"
                  id="buttonedit"
                  onClick={() =>
                    isEditing ? handleUpdate() : handleEdit(user.id, user.title)
                  }
                >
                  {isEditing ? <MdFileDownloadDone /> : <AiOutlineEdit />}
                </Button>
              </Card.Title>
              <Card.Body>
                <Container className="CardbodyUpper">
                  <Row>
                    <Col>
                      <Card.Img variant="top" src={user.url} className="img-fluid" />
                    </Col>
                    <Col>
                      <Card.Img variant="top" src={user.thumbnailUrl} className="img-fluid" />
                    </Col>
                  </Row>
                </Container>
                <br />
                <Button variant="primary" onClick={() => onDelete(user.id)}> <AiFillDelete /> </Button>
              </Card.Body>
            </Card>
          </Col>
        )
      })}
      <Container className="d-flex justify-content-center">
        <Paginationone
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePaginationClick} />
      </Container>

    </>
  )
}

export default Cardone;