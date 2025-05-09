import React from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import CountryCard from '../components/CountryCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useCountries } from '../contexts/CountryContext';
import { getPageTitle } from '../utils/helpers';
import { getBorderCountriesText } from '../utils/helpers';

const HomePage: React.FC = () => {
    const {
        loading,
        error,
        getFilteredCountries,
        searchTerm,
        independenceFilter } = useCountries();

    const filteredCountries = getFilteredCountries();
    console.log("Got " + filteredCountries.length + " countries after filtering");

    if (loading) {
        console.log("Still loading countries");
        return (
            <Container>
                <LoadingSpinner />
            </Container>
        );
    }

    if (error) {
        console.log("Error fetching countries");
        return (
            <Container>
                <Alert variant='danger'>
                    {error}
                </Alert>
            </Container>
        );
    }

    const pageTitle = getPageTitle(searchTerm, independenceFilter);


    return (
        <Container>
            <h1 className="mb-4">
                {pageTitle}
            </h1>



            {filteredCountries.length === 0 ? (
                <Alert variant='info'>
                    No Countries found matching criteria
                </Alert>
            ) : (
                <>
                    <p className='text-muted mb-4'>
                        showing {getBorderCountriesText(filteredCountries.length)}
                    </p>

                    <Row xs={1} sm={2} md={3} lg={4} className='g-4 mb-5'>
                        {filteredCountries.map(function (country) {
                            return (
                                <Col key={country.cca3}>
                                    <CountryCard country={country} />
                                </Col>
                            );
                        })}
                    </Row>
                </>
            )}
        </Container>

    )
}

export default HomePage;