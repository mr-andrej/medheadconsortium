CREATE TABLE hospital
(
    id                      BIGINT PRIMARY KEY AUTO_INCREMENT,
    name                    VARCHAR(255),
    location                VARCHAR(255),
    numberOfAllBeds         INT,
    numberOfAvailableBeds   INT,
    numberOfUnavailableBeds INT
);

CREATE TABLE hospital_specializations
(
    hospital_id     BIGINT,
    specializations VARCHAR(255)
);
