import { CalculatorSocket } from "./gateways/Socket";
import * as express from "express";
import { ApplicationServer } from "./ApplicationServer";
import { DataStore } from "./dataStore/DataStore";

const dataStore = new DataStore();
const applicationServer = new ApplicationServer(express());
const server = applicationServer.prepareServer();
const socket = new CalculatorSocket(server, dataStore);
socket.connect();
applicationServer.start(server);
