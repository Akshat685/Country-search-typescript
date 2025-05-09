import React from 'react';
import { Container, Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Globe, Search } from 'lucide-react';
import { useCountries } from '../contexts/CountryContext';
import { IndependenceFilterType } from '../types';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { 
    searchTerm, 
    setSearchTerm, 
    independenceFilter, 
    setIndependenceFilter 
  } = useCountries();

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    navigate('/');
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setIndependenceFilter(e.target.value as IndependenceFilterType);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <Globe size={24} className="me-2" />
          Country Explorer
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbar-nav" />
        
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/country-region">Regions</Nav.Link>
          </Nav>
          
          <Form className="d-flex flex-grow-1 mx-lg-4" onSubmit={handleSubmit}>
            <div className="d-flex flex-column flex-lg-row w-100">
              <div className="d-flex mb-2 mb-lg-0 me-lg-2 flex-grow-1 " style={{ justifyContent: 'flex-end' }}>
                <FormControl
                  type="search"
                  placeholder="Search countries..."
                  className="me-2"
                  value={searchTerm}
                  style={{ width: '30%' }}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {/* <Button variant="outline-light" type="submit">
                  <Search size={18} />
                </Button> */}
              </div>
              
              <Form.Select 
                className="bg-dark text-light border-secondary"
                value={independenceFilter}
                onChange={handleFilterChange}
                style={{ width: '20%' }}
              >
                <option value="all">All Countries</option>
                <option value="independent">Independent Only</option>
                <option value="dependent">Dependent Only</option>
              </Form.Select>
            </div>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;