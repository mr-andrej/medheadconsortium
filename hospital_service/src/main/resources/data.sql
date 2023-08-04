CREATE TABLE hospital
(
    id                      BIGINT PRIMARY KEY AUTO_INCREMENT,
    name                    VARCHAR(255),
    location                VARCHAR(255),
    number_of_all_beds         INT,
    number_of_available_beds   INT,
    number_of_unavailable_beds INT
);

CREATE TABLE hospital_specializations
(
    hospital_id     BIGINT,
    specializations VARCHAR(255)
);

INSERT INTO hospital (name, location, number_of_all_beds, number_of_available_beds, number_of_unavailable_beds)
VALUES ('Hospital A', 'Location A', 100, 60, 40),
       ('Hospital B', 'Location B', 200, 120, 80),
       ('Hospital C', 'Location C', 150, 90, 60);

SET @hospitalAId = (SELECT id FROM hospital WHERE name = 'Hospital A');
SET @hospitalBId = (SELECT id FROM hospital WHERE name = 'Hospital B');
SET @hospitalCId = (SELECT id FROM hospital WHERE name = 'Hospital C');

INSERT INTO hospital_specializations (hospital_id, specializations)
VALUES (@hospitalAId, 'Cardiology'),
       (@hospitalAId, 'Neurology'),
       (@hospitalBId, 'Orthopedics'),
       (@hospitalBId, 'Radiology'),
       (@hospitalCId, 'Gastroenterology'),
       (@hospitalCId, 'Dermatology');
