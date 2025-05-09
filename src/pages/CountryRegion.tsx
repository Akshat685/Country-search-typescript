import React from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { useCountries } from "../contexts/CountryContext";
import { RegionBackgroundsType } from "../types/index";
import "../styles/CountryRegion.css";
import { encodeForUrl } from "../utils/helpers";

const regionBackGrounds: RegionBackgroundsType = {
    Africa: "https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg",
    Americas:
        "https://images.pexels.com/photos/1563256/pexels-photo-1563256.jpeg",
    Asia: "https://images.pexels.com/photos/1031700/pexels-photo-1031700.jpeg",
    Europe: "https://images.pexels.com/photos/967292/pexels-photo-967292.jpeg",
    Oceania: "https://images.pexels.com/photos/1802268/pexels-photo-1802268.jpeg",
    Antarctic:
        "https://images.pexels.com/photos/48178/mountains-ice-bergs-antarctica-berg-48178.jpeg",
};

const CountryRegion: React.FC = () => {
    const { getAllRegions, loading, error } = useCountries();
    const navigate = useNavigate();
    const regions = getAllRegions();

    const handleRegionClick = (region: string): void => {
        navigate(`/region/${encodeForUrl(region)}`);
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
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="country-region-container">
            <h1 className="mb-4">Explore Regions</h1>
            <p className="text-muted mb-4">
                Select a region to view all countries within that area
            </p>

            <Row className="g-4 mb-4">
                {regions.map((region) => (
                    <Col key={region} md={6} lg={4}>
                        <div
                            className="region-card"
                            style={{
                                backgroundImage: `url(${regionBackGrounds[region] || regionBackGrounds["Europe"]
                                    })`,
                            }}
                            onClick={() => handleRegionClick(region)}
                        >
                            <span className="region-label">{region}</span>
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default CountryRegion;
