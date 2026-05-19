import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { chatRouter } from "./routes/chat";
import { projectsRouter } from "./routes/projects";
import { projectChatRouter } from "./routes/projectChat";
import { documentsRouter } from "./routes/documents";
import { tabularRouter } from "./routes/tabular";
import { workflowsRouter } from "./routes/workflows";
import { userRouter } from "./routes/user";
import { downloadsRouter } from "./routes/downloads";
import stripeRouter from "./routes/stripe";

const app = express();
const PORT = process.env.PORT ?? 3001;

// 1. Configurar cabeçalhos de segurança (Helmet)
app.use(helmet());

// 2. Limitador de Taxa de Requisições (Rate Limiting para evitar abusos/DDoS)
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 300, // limite de 300 requisições por IP a cada minuto
  standardHeaders: true,
  legacyHeaders: false,
  message: { detail: "Muitas requisições originadas deste IP. Tente novamente em 1 minuto." },
});
app.use(limiter);

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// 3. CORS Hardening - Origens estritas de produção e desenvolvimento
const allowedOrigins = [
  "https://doqs.com.br",
  "https://www.doqs.com.br",
];
if (process.env.NODE_ENV !== "production") {
  allowedOrigins.push("http://localhost:3000");
}

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Não permitido pelas regras de segurança CORS do Doqs"));
      }
    },
    credentials: true,
  }),
);

app.use("/stripe", stripeRouter);

app.use(express.json({ limit: "50mb" }));

app.use("/chat", chatRouter);
app.use("/projects", projectsRouter);
app.use("/projects/:projectId/chat", projectChatRouter);
app.use("/single-documents", documentsRouter);
app.use("/tabular-review", tabularRouter);
app.use("/workflows", workflowsRouter);
app.use("/user", userRouter);
app.use("/users", userRouter);
app.use("/download", downloadsRouter);

app.get("/health", (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`LucaLex backend running on port ${PORT}`);
});
