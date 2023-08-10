CREATE TABLE IF NOT EXISTS hospital
(
    id                         BIGINT PRIMARY KEY AUTO_INCREMENT,
    name                       VARCHAR(255),
    location                   VARCHAR(255),
    number_of_all_beds         INT,
    number_of_available_beds   INT,
    number_of_unavailable_beds INT
);

CREATE TABLE IF NOT EXISTS hospital_specializations
(
    hospital_id     BIGINT,
    specializations VARCHAR(255)
);

-- Hospitals
INSERT INTO hospital (name, location, number_of_all_beds, number_of_available_beds, number_of_unavailable_beds)
VALUES ('St. Mary Hospital', 'Praed St, Paddington, London', 500, 320, 180),
       ('Manchester Royal Infirmary', 'Oxford Rd, Manchester', 600, 420, 180),
       ('Queen Elizabeth Hospital', 'Mindelsohn Way, Birmingham', 700, 500, 200),
       ('Royal Liverpool Hospital', 'Prescot St, Liverpool', 550, 375, 175),
       ('Bristol Royal Infirmary', 'Upper Maudlin St, Bristol', 480, 300, 180);

-- Hospital Specializations
-- St. Mary Hospital
INSERT INTO hospital_specializations (hospital_id, specializations)
VALUES (1, 'Cardiology'),
       (1, 'Neurology'),
       (1, 'Orthopedics');

-- Manchester Royal Infirmary
INSERT INTO hospital_specializations (hospital_id, specializations)
VALUES (2, 'Gastroenterology'),
       (2, 'Dermatology'),
       (2, 'Pediatrics');

-- Queen Elizabeth Hospital
INSERT INTO hospital_specializations (hospital_id, specializations)
VALUES (3, 'Oncology'),
       (3, 'Rheumatology'),
       (3, 'Urology');

-- Royal Liverpool Hospital
INSERT INTO hospital_specializations (hospital_id, specializations)
VALUES (4, 'Endocrinology'),
       (4, 'Nephrology'),
       (4, 'Pulmonology');

-- Bristol Royal Infirmary
INSERT INTO hospital_specializations (hospital_id, specializations)
VALUES (5, 'Ophthalmology'),
       (5, 'Hematology'),
       (5, 'Radiology');
