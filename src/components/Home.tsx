import React,{ useEffect, useState } from "react";
import { Container,Row } from "react-bootstrap";
import Cardone from "./Card";
import "./Home.css";

const Home:React.FC = () =>{
    const [ users, setUsers ] = useState<any[]>([]);

    let API :string ="https://jsonplaceholder.typicode.com/photos";

    const fetchingApiData = async (url:string) =>{
        try {
          const res = await fetch(url);
          const data = await res.json();
          setUsers(data);
          console.log(users)
        } catch (error) {
          console.log("error is getting")
        }
      }

    useEffect(()=>{
        fetchingApiData(API)
    },[])

    //for delete function
    const handleDelete = (id: number) => {
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
      }
     //for edit and update function
      const handleUpdate = (id: number, newTitle: string) => {
        const updatedUsers = users.map((user) =>
          user.id === id ? { ...user, title: newTitle } : user
        );
        setUsers(updatedUsers);
      };
  
    return(
        <>
        <Container fluid className="homeclass">
        <Container>
            <Row>
            <Cardone users={users} onDelete={handleDelete} onUpdate={handleUpdate} />
            </Row>
        </Container>
        </Container>
        </>
    )
}

export default Home;