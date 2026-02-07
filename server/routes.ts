import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post(api.submissions.create.path, async (req, res) => {
    try {
      const input = api.submissions.create.input.parse(req.body);
      const submission = await storage.createSubmission(input);
      res.status(201).json(submission);
    } catch (err) {
      console.error("Error creating submission:", err);
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.message });
        return;
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get(api.submissions.list.path, async (req, res) => {
    try {
      const submissions = await storage.getSubmissions();
      res.json(submissions);
    } catch (err) {
      console.error("Error listing submissions:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
