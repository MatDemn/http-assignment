import dotenv from "dotenv"

dotenv.config();

import ping from "ping";

import apiFetch from "./lib/api";
import { ContentTypeError, ResponseStatusError, SchemaError } from "./errors/apiErrors";
import * as log4js from "log4js";
import env from "./lib/validateEnv";
import { runLoopedWithTimeout } from "./utils/timeoutRunner";

log4js.configure('./config/log4js.json');

const fileLogger = log4js.getLogger();

const runApp = async () => {
        const startTime = new Date(); 
        try {
            const fetchResult = await apiFetch();
            const endTime = new Date();
            const deltaTime = endTime.getTime()-startTime.getTime();
            fileLogger.info(`Time: ${deltaTime}, statusCode: 200, contentType: ${env.API_CONTENT_TYPE}, data: ${JSON.stringify(fetchResult)}`);
            return;
        } catch (error) {
            if(error instanceof ResponseStatusError) {
                fileLogger.error(`Response returned with wrong Status: ${error.status}`);
                return;
            }

            if(error instanceof ContentTypeError) {
                fileLogger.error(`Response returned with wrong Content-Type: ${error.contentType}`);
                return;
            }

            if(error instanceof SchemaError) {
                console.log(error.zodError.errors[0].path.flat());
                fileLogger.error(`Response returned with wrong Schema: ${error.zodError.errors[0].path.flat()}`);
                return;   
            }

            fileLogger.error(`Response returned with unknown error: ${error}`); 
            return;
        }
}

const runPing = async () => {
    const result = await ping.promise.probe(env.PING_URL, {min_reply: env.PING_PACKETS});
    return result;  
} 

const runMain = async () => {
    const pingPromise = runPing();

    const appPromises = [];

    for(let i = 0; i<env.X; i++) {
        appPromises.push(new Promise((resolve, reject) => resolve(runApp())));
    }

    await Promise.all(appPromises).finally(async () => {
        await pingPromise.then(data => {
            const pingResult = data;
            if(!pingResult.alive) {
                fileLogger.error(`PING FAILED - HOST IS NOT ALIVE`);
                return;
            }
            const lostPercent = parseFloat(pingResult.packetLoss)/100; 
            const totalPackets = pingResult.times.length;
            const lostPacketsNumber = totalPackets*lostPercent;
            fileLogger.info(`PING RESULT - SENT: ${totalPackets} ` 
                + `RECEIVED: ${totalPackets-lostPacketsNumber} LOST: ${lostPacketsNumber} `
                + `MIN_TIME: ${pingResult.min} MAX_TIME: ${pingResult.max} AVG_TIME: ${pingResult.avg}`
            );
        })
        .catch(error => {
            fileLogger.error(`PING FAILED - ERROR OCURRED: ${error}`);
        });
    });
}

runLoopedWithTimeout(env.Y*1000, runMain);



