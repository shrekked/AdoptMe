/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions/v2");

// Set the maximum instances to 10 for all functions
setGlobalOptions({ maxInstances: 10 });

exports.keys = onRequest((request, response) => {
	response.send(
		JSON.stringify({
			key: process.env.PETFINDER_API_KEY,
			secret: process.env.PETFINDER_SECRET_KEY,
		})
	);
});
