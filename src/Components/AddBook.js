import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button'
import Select from "react-select";
import countryList from "react-select-country-list";
import axios from "axios";
import { Alert } from "react-bootstrap";

export default function AddBook() {
  const [author, setAuthor] = useState("");
  const [country, setCountry] = useState(null);
  const options = countryList().getData();
  const [language, setLanguage] = useState("");
  const [link, setLink] = useState("");
  const [pages, setPages] = useState(0);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [msg,setMsg]=useState('Success');
  const [msgVisible,setMsgVisible]=useState(true);
  const url='http://64.227.142.191:8080/application-test-v1.1/books'

  const handleForm=async (e)=>{
    e.preventDefault();
    const data = { author, country:country?.label, language, link, pages, title, year };
    try {
       const res=await axios.post(url,data);
       if(res){
        setMsg('Data added successfully.');
        setMsgVisible(true); 
        setTimeout(() => {
            setMsgVisible(false);
        }, 3000);
    };
    } catch (error) {
       setMsg('Error Adding Book.');
       setMsgVisible(true);
       setTimeout(()=>{
           setMsgVisible(false);
       },3000)
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="card p-2" style={{ width: "40rem" }}>
      <h2 className="text-center mb-2">Add Book</h2>
     {msgVisible && (
        <Alert className="p-0 ps-2 bg-success" >{msg}</Alert>
     )}
      <Form onSubmit={handleForm}>
      <Form.Group className="mb-3" controlId="formBasicAuthor">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Author Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCountry">
        <Form.Label>Country</Form.Label>
        <Select
          placeholder="Select Country"
          options={options}
          value={country}
          onChange={setCountry}
          style={{ marginBottom: "10px", width: "100px" }}
        />
         </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLanguage">
          <Form.Label>Language</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLink">
          <Form.Label>Link</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPage">
          <Form.Label>Page</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter No Pages"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicYear">
          <Form.Label>Year</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" size='lg'>Add to Books List</Button>
      </Form>
    </div>
    </div>
    
  );
}
