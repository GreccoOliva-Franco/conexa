// External modules
import dotenv from "dotenv";
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

// Handlers
import { endpointNotFoundHandler } from "./shared/handlers/error.handler";

// Routes
import apiRoutes from "./api.routes";

dotenv.config({ path: "./.env" });

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", apiRoutes);

app.use('*', endpointNotFoundHandler);

const port = parseInt(process.env.APP_PORT) || 3001;

mongoose.connection
	.on('connected', () => {
		console.log('[MS Login]: connected to database');

		app.listen(port, () => {
			console.log(`[MS Login]: running on port ${port}`);
		});

		app.on('error', (err) => console.log(err));
	})
	.on('error', (err) => console.log(err));
mongoose.connect(process.env.MONGO_URI!, { authSource: 'admin' });