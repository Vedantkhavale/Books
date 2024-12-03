import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Table } from 'react-bootstrap';
import Form from "react-bootstrap/Form";
import countryList from 'react-select-country-list';
import Select from 'react-select';
import { XCircle } from 'react-bootstrap-icons';

export default function BookList() {
    const [data, setData] = useState([]); // Holds the fetched data
    const [updateDisplay, setUpdateDisplay] = useState(false); // Tracks visibility of the form
    const [bookId, setBookId] = useState(0);
    const [author, setAuthor] = useState("");
    const [country, setCountry] = useState(null);
    const options = countryList().getData();
    const [language, setLanguage] = useState("");
    const [link, setLink] = useState("");
    const [pages, setPages] = useState(0);
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [msg, setMsg] = useState('Success');
    const [msgVisible, setMsgVisible] = useState(false);
    const url = 'http://64.227.142.191:8080/application-test-v1.1/books';

    const getData = async () => {
        try {
            const result = await axios.get(url);
            setData(result.data.data);
        } catch (error) {
            console.log('error', error);
        }
    };

    const handleUpdate = (id) => {
        setBookId(id);
        console.log(`Update clicked for ID: ${id}`);
        const selectedBook = data.find((book) => book.id === id);
        if (selectedBook) {
            setAuthor(selectedBook.author || "");
            setCountry(options.find((option) => option.label === selectedBook.country) || null);
            setLanguage(selectedBook.language || "");
            setLink(selectedBook.link || "");
            setPages(selectedBook.pages || 0);
            setTitle(selectedBook.title || "");
            setYear(selectedBook.year || "");
            setUpdateDisplay(true); // Show the form when Update button is clicked
        }
    };

    const handleFormUpdate = async (e) => {
        e.preventDefault();
        try {
            const bookdata = { author, country: country?.label, language, link, pages, title, year };
            const updateRecord = await axios.put(`${url}/${bookId}`, bookdata);
            if (updateRecord) {
                setMsg('Record Updated Successfully');
                setMsgVisible(true);
                setTimeout(() => {
                    setMsgVisible(false);
                    clearSearch();
                }, 3000);
            }
        } catch (error) {
            setMsg('Error Updating Record');
            setMsgVisible(true);
            setTimeout(() => {
                setMsgVisible(false);
            }, 3000);
        }
    };

    const clearSearch = () => {
        setUpdateDisplay(false);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="d-flex justify-content-between">
            {/* Table of books */}
            <div style={{ flex: 1 }}>
                {Array.isArray(data) && data.length > 0 ? (
                    <Table className='ms-5' responsive>
                        <thead>
                            <tr>
                                <th>Author</th>
                                <th>Country</th>
                                <th>Language</th>
                                <th>Link</th>
                                <th>Pages</th>
                                <th>Title</th>
                                <th>Year</th>
                                <th>Id</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.author}</td>
                                    <td>{item.country}</td>
                                    <td>{item.language}</td>
                                    <td>{item.link}</td>
                                    <td>{item.pages}</td>
                                    <td>{item.title}</td>
                                    <td>{item.year}</td>
                                    <td>{item.id}</td>
                                    <td>
                                        <Button onClick={() => handleUpdate(item.id)} className="me-3">
                                            Update
                                        </Button>
                                        <Button>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <p>No data</p>
                )}
            </div>

            {/* Conditionally render the form on the right */}
            {updateDisplay && (
                <div style={{ width: "30rem",height:'43rem' }} className="card p-4">
                    <Button variant='outline-danger' onClick={clearSearch} className='ms-5 position-absolute' style={{ top: '10px', right: '10px' }}>
                        <XCircle />
                    </Button>
                    <h2>Update Book</h2>
                    {msgVisible && (
                        <Alert className="p-0 ps-2 bg-success">{msg}</Alert>
                    )}
                    <Form onSubmit={handleFormUpdate}>
                        <Form.Group className="mb-1" controlId="formBasicAuthor">
                            <Form.Label>Author</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Author Name"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-1" controlId="formBasicCountry">
                            <Form.Label>Country</Form.Label>
                            <Select
                                placeholder="Select Country"
                                options={options}
                                value={country}
                                onChange={setCountry}
                                style={{ marginBottom: "10px", width: "100%" }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-1" controlId="formBasicLanguage">
                            <Form.Label>Language</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Language"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-1" controlId="formBasicLink">
                            <Form.Label>Link</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Link"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-1" controlId="formBasicPage">
                            <Form.Label>Page</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter No Pages"
                                value={pages}
                                onChange={(e) => setPages(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-1" controlId="formBasicTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Title Name"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-1" controlId="formBasicYear">
                            <Form.Label>Year</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Year"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                            />
                        </Form.Group>

                        <Button type="submit" size='lg'>Update to Books List</Button>
                    </Form>
                </div>
            )}
        </div>
    );
}
