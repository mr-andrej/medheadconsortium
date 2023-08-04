# MedHead Consortium Hospital Microservice

This is a Java Spring Boot microservice for managing hospital data for the MedHead Consortium. It provides RESTful APIs for creating, retrieving, updating, and deleting hospital data.

## Features

- CRUD operations for hospital data
- H2 in-memory database for development and testing
- PostgreSQL database for production (WIP)
- Spring Security for authentication and authorization
- Exception handling
- Logging
- Validation
- Unit and integration tests

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Java 17
- Maven
- PostgreSQL (for production)

## Deployment

Add additional notes about how to deploy this on a live system.

## Built With

- [Spring Boot](https://spring.io/projects/spring-boot) - The web framework used
- [Maven](https://maven.apache.org/) - Dependency Management
- [H2 Database](https://www.h2database.com/) - In-memory database
- [PostgreSQL](https://www.postgresql.org/) - Open-Source relational database

## Authors

- Andrej ILIEVSKI ([mrandrej](https://github.com/mrandrej)) - Lead
### Installing and Running the Application

1. **Clone the repository**

   Use the following command to clone the repository to your local machine:

    ```bash
    git clone https://github.com/mrandrej/haventcreatedthisyet.git
    ```

2. **Navigate into the project directory**

   Change your current directory to the project's directory:

    ```bash
    cd haventcreatedthisyet
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

   The application will be accessible at `http://localhost:9000`.

### Running the tests

To run the tests, use the following command:

```bash
mvn test
