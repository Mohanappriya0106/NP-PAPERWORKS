// backend/routes/proposalRoutes.js

import express from "express";
import { initiateProposal, confirmProposal } from "../controllers/proposalController.js";

const router = express.Router();

// Route for initiating the proposal and sending the email
router.post("/proposal", initiateProposal);

// Route for confirming the proposal (e.g., partner accepts the request)
router.post("/confirm", confirmProposal); // ✅ new route added

export default router;

