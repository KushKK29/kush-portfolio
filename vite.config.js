import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import chatHandler from "./api/chat.js";

function chatDevMiddleware() {
  return {
    name: "chat-dev-middleware",
    configureServer(server) {
      server.middlewares.use("/api/chat", async (req, res, next) => {
        if (req.method !== "POST") {
          next();
          return;
        }

        let body = "";
        req.on("data", (chunk) => {
          body += chunk;
        });

        req.on("end", async () => {
          try {
            const parsedBody = body ? JSON.parse(body) : {};
            const headers = new Map();
            Object.entries(req.headers).forEach(([key, value]) => {
              if (Array.isArray(value)) {
                headers.set(key.toLowerCase(), value.join(", "));
              } else if (value != null) {
                headers.set(key.toLowerCase(), String(value));
              }
            });

            const requestLike = {
              method: req.method,
              headers: {
                get(name) {
                  return headers.get(String(name).toLowerCase()) ?? null;
                },
              },
              json: async () => parsedBody,
            };

            const response = await chatHandler(requestLike);

            res.statusCode = response.status;
            response.headers.forEach((value, key) => {
              res.setHeader(key, value);
            });

            if (!response.body) {
              res.end();
              return;
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            const pump = async () => {
              while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = typeof value === "string" ? value : decoder.decode(value, { stream: true });
                res.write(chunk);
              }
              res.end();
            };

            pump().catch((error) => {
              server.config.logger.error(error);
              if (!res.headersSent) {
                res.statusCode = 500;
              }
              res.end("Internal server error");
            });
          } catch (error) {
            server.config.logger.error(error);
            if (!res.headersSent) {
              res.statusCode = 500;
            }
            res.end(JSON.stringify({ error: "Failed to process chat request" }));
          }
        });
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  Object.assign(process.env, env);

  return {
    plugins: [react(), chatDevMiddleware()],
  };
});
