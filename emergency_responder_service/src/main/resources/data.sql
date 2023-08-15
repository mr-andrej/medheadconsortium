CREATE TABLE IF NOT EXISTS emergency_responder
(
    id               BIGINT PRIMARY KEY AUTO_INCREMENT,
    name             VARCHAR(255),
    organization     VARCHAR(255),
    contact_number   VARCHAR(255),
    specialization   VARCHAR(255),
    location         VARCHAR(255),
    notes            VARCHAR(2000)
);

-- Dummy data
INSERT INTO emergency_responder (name, organization, contact_number, specialization, location, notes)
VALUES
    ('Bobby Pop', 'Ursa Major Health', '+1234567890', 'Cardiac Emergencies', 'Central Station', 'Experienced in urban rescues.'),
    ('Janey Willow', 'Emergency Expert Systems', '+0987654321', 'Trauma', 'Downtown Clinic', 'Specializes in trauma cases, especially road accidents.'),
    ('Robert White', 'Ursa Major Health', '+1122334455', 'Pediatric Emergencies', 'Eastside Station', 'Has a calm demeanor, good with children.'),
    ('Emily Brown', 'Emergency Expert Systems', '+5566778899', 'Burns and Scalds', 'Westside Clinic', 'Worked in burn units for over 5 years.');
