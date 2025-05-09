import React from "react";
import { Card, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MapPin, Flag, Globe2 } from "lucide-react";
import { Country } from "../types/index";
import "../styles/CountryCard.css";
import { encodeForUrl } from '../utils/helpers';

interface CountryCardProps {
  country: Country;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  const navigate = useNavigate();

  function handleCardClick(): void {
    console.log("clicked on country: " + country.name.common);
    navigate(`/country/${encodeForUrl(country.name.common)}`);
  }

  return (
    <Card className="country-card" onClick={handleCardClick}>
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
          className="country-card-img"
        />

        <div className="country-card-badge-container">
          <Badge
            bg={country.independent ? "success" : "warning"}
            className="rounded-pill"
          >
            {country.independent ? "Independent" : "Dependent"}
          </Badge>
        </div>
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title className="country-card-title">
          <Flag size={18} className="text-primary"></Flag>
          {country.name.common}
        </Card.Title>

        <div className="country-card-info">
          <div className="country-card-info-row">
            <Globe2 size={16} className="text-secondary" />
            <span>{country.region}</span>
          </div>

          <div className="country-card-info-row">
            <MapPin className="text-secondary" size={16} />
            <span>{country.cca3}</span>
          </div>
        </div>

        {country.borders && country.borders.length > 0 && (
          <div className="mt-auto">
            <small className="text-muted d-block mb-2">Borders with:</small>
            <div className="border-countries ">
              {country.borders.slice(0, 3).map((border) => (
                <Badge
                  key={border}
                  bg="light"
                  text="dark"
                  className="border-badge"
                >
                  {border}
                </Badge>
              ))}

              {country.borders.length > 3 ? (
                <Badge bg="light" text="dark" className="border-badge">
                  + {country.borders.length - 3}
                </Badge>
              ) : null}
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default CountryCard;
