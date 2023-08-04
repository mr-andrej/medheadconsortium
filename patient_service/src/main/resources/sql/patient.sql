CREATE TABLE patient
(
    id                BIGINT PRIMARY KEY AUTO_INCREMENT,
    name              VARCHAR(255),
    date_of_birth     DATE,
    gender            VARCHAR(255),
    address           VARCHAR(255),
    patient_contact_number    VARCHAR(255),
    emergency_contact_number VARCHAR(255),
    medical_history   VARCHAR(2000)
);
