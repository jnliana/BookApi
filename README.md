# Study application for improving skills and understanding in writing clean code
## Book Api
### Basic idea
This application is a tool for digitally managing and making use of a library. 
As a `librarian` you can add, change and remove books.
As a noramal user (`reader`) you can borrow and return books.

### Install
Just run `npm install`.

### Build
It's just NodeJs, no need to build anything!

### Start
Create a local `.env` file and adjust it if need be by taking a look at the supplied `example.env` file. Or just copy the contents and be done with it :)
Make sure that both the `.json` files for books and users exist and that the path is set correctly (relative to the `.env` file.)

If the config is setup just run `npm start`.

Alternatively run `npm run start:dev` to start the application in development mode (it just uses `nodemon` for auto restart on soure code changes).

### Structure
This project tries to follow a clean architecture. At the top level it is split up into `core` and `adapters`, inspired by the hexagon architecture.
`core` contains, well, the core functionality of the app. `adapters` are like plug-in aspects of the app, supposed to be interchangeable. Stuff in `adapters` should depend on stuff in `core`. Through dependency injection some of the stuff in `adapters` goes into `core` though.

Within `core` the entities and the operations with/on them are defined, i.e. the use cases. Those are defined through various `UseCase` classes.
Since this is ultimately a web application, the use cases are made available through a web framework, namely `express`. This is implemented as an `adapter`. The advantage here is that the core app is not actually reliant on it being a web application, it could also be an application for the command line if another `adapter` is written, or something else entirely. So all the `http` stuff that makes a web framework is treated as nothing more than an I/O device within this project. 

Same goes for the database access layer. Albeit that this aspect - namely persistant storage - is actually essential to the application. Therefore the adapter for data storage is more baked into the application and is indeed referred to in `core` as well. BUT, the implementation detail of how data is stored is abstracted into an adapter (here we simply use `.json` files instead of a database!).

A `UseCase` takes a `request` in the constructor and has an asynchronous `execute()` method. This runs the code required to fulfill the use case. The `request` contains parameters or input data guiding the use case. Data access and storage is managed in the `gateway`s.

Beware inheritance and makeshift abstract classes!

### Tools
This project uses `express` for all things `http` (plus some cool modules for making `express` better and easier to use like `helmet`), `jsonwebtoken` for authentication and `nodemailer` for sending mails. `bcryptjs` is used for hashing and `uuid` for making ids. Besides that `dotenv` is used for making environment dependend configuratiom just a tad more easy.

### Other notes
Note that in order to become a `librarian` or an `admin` you need to manually edit the `users.json` file and change `role`.