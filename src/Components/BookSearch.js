import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { XCircle } from 'react-bootstrap-icons';
import axios from 'axios';


export default function BookSearch() {
                 
    const [searchText,setSearchText]=useState(''); //search input text
    const [books,setBooks]=useState([]); //state to hold search result
    const [search,setSearch]=useState(false); //verify if search button is clicked
    const [error,setError]=useState('');
    const [bookId,setBookId]=useState();
    const url='http://64.227.142.191:8080/application-test-v1.1/books';

    const searchBook=async()=>{
       if(!searchText.trim()){setError('Please enter a search query'); return}
        setError('');
        setSearch(true);
       try{
        const response=await axios.get(url,{params:{title:searchText}, //pass searchtext with url
        });
        setBooks(response.data.data || []); //set data getting from GET API in Books
       }
       catch(error){
        setError('Error while fetching book. Please try again');
       }
    } 

    const moreInfo=(id)=>{
       setBookId((prevId)=>(prevId===id ? null : id))
    }

    const clearSearch=()=>{
        setSearchText('');
        setBooks([]);
        setSearch(false);
        setError('');
        setBookId(null);
    }

  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Books</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1" ><Link to='/'>Home</Link></Nav.Link>
            <Nav.Link href="#action2" className="nav-link-hover"><Link style={{textDecoration:'none', color:'black'}} to='/list'>List</Link></Nav.Link>
            <Nav.Link href="#action2" className="nav-link-hover"><Link style={{textDecoration:'none', color:'black'}} to='/addBook'>Add to Books List</Link></Nav.Link>
          </Nav>
          <Form className="d-flex" onSubmit={(e)=>e.preventDefault()}>
            <Form.Control
              type="search"
              value={searchText}
              placeholder="Enter title name"
              className="me-2"
              aria-label="Search"
              onChange={(e)=>setSearchText(e.target.value)}
            />
            <Button variant="outline-success" onClick={searchBook}>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <Container className='mt-3'>
    {search && (<Button variant='outline-danger' onClick={clearSearch} className='ms-2'><XCircle /></Button>)}
    {books.length>0 && (
        <div>
            <h3>Search Results:</h3>
            {error && <p style={{color:'red'}}>{error}</p>}
            {books.map((book)=>(
                <div key={book.id}>
                    <h5><strong>Title: </strong>{book.title}</h5>
                    <p><strong>Author: </strong> {book.author}</p>
                    <p><strong>Year: </strong> {book.year}</p>
                    <p><strong>Language: </strong> {book.language}</p>
                    <p><strong>Description: </strong> {book.description || 'Description Not Available'}</p>
                    {bookId === book.id && (
                        <div>
                             <p>
                      <strong>Country: </strong> {book.country || 'Not Available'}
                    </p>
                    <p>
                      <strong>Pages: </strong> {book.pages || 'Not Available'}
                    </p>
                    <p>
                      <strong>Link: </strong>{' '}
                      <a href={book.link} rel="noopener noreferrer">
                        {book.link || 'No Link Available'}
                      </a>
                    </p>
                        </div>
                    )}
                    < Button onClick={()=>moreInfo(book.id)}>
                      {bookId === book.id ? 'Less Info' : 'More Info'}
                    </Button>
                   
                    <hr />

                </div>
            ))}
        </div>
    )}
    {search && !error && books.length === 0 && (
        <p>No result found. Try searching for another title</p>
    )}
    </Container>
    </>
  );
}

 