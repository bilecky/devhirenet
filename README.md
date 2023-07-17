# DevHireNet

<p align="center">

   <a href="https://deviceframes.com/templates/iphone-13"> <img src = "https://github.com/bilecky/devhirenet/assets/51762310/f90cef92-5c8a-4d4e-bec6-322be47f31cd"></a>
 
</p>

DevHireNet is a job board for the IT industry, built using React, Tailwind CSS, React Router, and AWS (including Lambda and Amplify). A live demo version is available below.

 [LIVE DEMO](https://bilecky.github.io/devhirenet/)

## Updates 

> **Note**: **VERSION 1.1** -  this update was made on 16.07.2023

DevHireNet has been updated to provide enhanced user data storage and **improved integration with the backend services**. With the latest version, each user now has their **job offers stored in a dedicated database, leveraging AWS Lambda functions (node.js powered), DynamoDB, and a REST API provided by AWS API Gateway**.

## Features

- **User authentication:** Users can register and log in to view job offers thanks to the Amplify backend.
- **Data retrieval:** Data is provided to the application via a custom API and Lambda functions.
- **Dark mode:** A dark mode is available for improved user experience.
- **Filtering:** Users can filter job offers by job level, company, and technologies.
- **Favorites:** Users can add and remove job offers from their favorites. Notifications are displayed when an offer is added or removed, improving the user experience.
- **Loading spinners:** Loading spinners are displayed while data is being retrieved, improving the user experience.
- ~~**Local storage:** Data is always available thanks to local storage. Users only need to log in to access their data.~~ (look at update)
- **Mobile-first approach and Responsive Design (RWD):** The project is built with a mobile-first approach, ensuring optimal user experience on various devices and screen sizes.

## Technologies

This project was built using the following technologies:
- React
- Tailwind CSS
- React Router
- AWS (Lambda, Amplify, API Gateway)

## Getting Started

To get started with DevHireNet, follow these steps:

1. Clone the repository to your local machine.
2. Install the dependencies by running `npm install`.
3. Start the development server by running `npm run dev`

## Contributing

Contributions to DevHireNet are welcome! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes and commit them to your branch.
4. Push your changes to your forked repository.
5. Open a pull request to merge your changes into the main repository.

## License

MIT.
