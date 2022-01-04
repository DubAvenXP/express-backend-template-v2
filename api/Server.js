const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.origin = process.env.ORIGIN;
        this.paths = {
            biographies: '/api/biographies',
            companies: '/api/companies',
            departments: '/api/departments',
            messages: '/api/messages',
            roles: '/api/roles',
            services: '/api/services',
            subscribers: '/api/subscribers',
            users: '/api/users',
            clients: '/api/clients',
        };

        this.connectDB();
        this.middlewares();
        this.routes();
    }

    async connectDB() {
        try {
            dbConnection();
        } catch (error) {
            console.error(error);
        }
    }

    middlewares() {
        this.app.use(cors({
            origin: this.origin,
            optionsSuccessStatus: 200,
        }));
        this.app.use(express.json());
        this.app.use(helmet());
    }

    routes() {
        this.app.use(this.paths.biographies, require('../api/biographies/routes'));
        this.app.use(this.paths.companies, require('../api/companies/routes'));
        this.app.use(this.paths.departments, require('../api/departments/routes'));
        this.app.use(this.paths.messages, require('../api/messages/routes'));
        this.app.use(this.paths.roles, require('../api/roles/routes'));
        this.app.use(this.paths.services, require('../api/company-services/routes'));
        this.app.use(this.paths.subscribers, require('../api/subscribers/routes'));
        this.app.use(this.paths.users, require('../api/users/routes'));
        this.app.use(this.paths.clients, require('../api/company-clients/routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Application running on http://localhost:${this.port}`);
        });
    }
}

module.exports = Server;