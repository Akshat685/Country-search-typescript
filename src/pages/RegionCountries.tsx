// src/pages/RegionCountries.tsx
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe } from 'lucide-react';
import CountryCard from '../components/CountryCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useCountries } from '../contexts/CountryContext';
import { Country } from '../types';
import { decodeFromUrl, getBorderCountriesText } from '../utils/helpers';

interface RegionCountriesParams {
  regionName: string;
  [key: string]: string | undefined;
}

const RegionCountries: React.FC = () => {
  const { regionName } = useParams<RegionCountriesParams>();
  const navigate = useNavigate();
  const { getCountriesByRegion, loading } = useCountries();

  const [countries, setCountries] = useState<Country[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (!regionName) {
        setError('Region name is required');
        return;
      }

      const decodedRegion = decodeFromUrl(regionName);
      const regionCountries = getCountriesByRegion(decodedRegion);

      if (regionCountries.length === 0) {
        setError(`No countries found in the ${decodedRegion} region`);
      } else {
        setCountries(regionCountries);
        setError(null);
      }
    } catch (err) {
      setError('Failed to fetch countries for this region');
      console.error(err);
    }
  }, [regionName, getCountriesByRegion]);

  const handleBackClick = (): void => {
    navigate('/country-region');
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Button
          variant="outline-primary"
          className="mb-4"
          onClick={handleBackClick}
        >
          <ArrowLeft size={18} className="me-2" /> Back to Regions
        </Button>
        <Alert variant="danger">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Button
        variant="outline-primary"
        className="mb-4"
        onClick={handleBackClick}
      >
        <ArrowLeft size={18} className="me-2" /> Back to Regions
      </Button>

      <div className="d-flex align-items-center mb-4">
        <Globe size={28} className="me-2 text-info" />
        <h1 className="mb-0">{regionName && decodeFromUrl(regionName)} Region</h1>
      </div>

      <p className="text-muted mb-4">
        Showing {getBorderCountriesText(countries.length)} in the {regionName && decodeFromUrl(regionName)} region.
      </p>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4 mb-5">
        {countries.map(country => (
          <Col key={country.cca3}>
            <CountryCard country={country} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RegionCountries;