# MedHead Consortium Microservices

This repository contains the microservices for the MedHead Consortium project. The project aims to develop a new generation platform centered on the patient, capable of improving basic care offered, while being responsive, operational in real-time.

## Microservices

The repository includes the following microservices:

1. **Hospital Microservice**: Manages information about hospitals, including their location, number of beds, and specializations. (80%)

2. **Patient Microservice**: Manages information about patients. (80%)

3. **Web Application**: Allows the user to interact with the microservices. (20%)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Java 17
- Maven
- H2

### Installing and Running the Application

1. **Clone the repository**

    Use the following command to clone the repository to your local machine:

    ```bash
    git clone https://github.com/mr-andrej/medheadconsortium.git
    ```

2. **Navigate into the project directory**

    Change your current directory to the project's directory:

    ```bash
    cd medheadconsortium
    ```

3. **Build the project with Maven**

    Use Maven to build the project:

    ```bash
    mvn clean install
    ```

4. **Run the application**

    Start the application using the Spring Boot Maven plugin:

    ```bash
    mvn spring-boot:run
    ```

    The application will be accessible at `http://localhost:900X`. The X depends on the exact service you're running. The hospital service runs at 9000 while the patient service runs at 9001. 

### Running the tests

To run the tests, use the following command:

```bash
mvn test
