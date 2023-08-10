CREATE TABLE patient
(
    id                       BIGINT PRIMARY KEY AUTO_INCREMENT,
    name                     VARCHAR(255),
    date_of_birth            DATE,
    gender                   VARCHAR(255),
    address                  VARCHAR(255),
    patient_contact_number   VARCHAR(255),
    emergency_contact_number VARCHAR(255),
    medical_history          VARCHAR(2000)
);

INSERT INTO patient (name, date_of_birth, gender, address, patient_contact_number, emergency_contact_number,
                     medical_history)
VALUES ('John Doe', '1985-06-15', 'Male', '123 Main St, London', '+441234567890', '+449876543210',
        'No known allergies. Had surgery in 2010 for appendicitis.'),
       ('Jane Smith', '1990-02-25', 'Female', '456 Elm St, Manchester', '+441234567891', '+449876543211',
        'Allergic to penicillin. Diagnosed with asthma in 2015.'),
       ('Alice Johnson', '1978-11-12', 'Female', '789 Maple St, Birmingham', '+441234567892', '+449876543212',
        'Diabetic. No other known medical conditions.'),
       ('Bob Williams', '2000-03-30', 'Male', '101 Pine St, Liverpool', '+441234567893', '+449876543213',
        'No known medical conditions. Vaccinated for flu in 2022.'),
       ('Charlie Brown', '1995-07-07', 'Male', '202 Oak St, Bristol', '+441234567894', '+449876543214',
        'Allergic to nuts. Had chickenpox in 2005.');

