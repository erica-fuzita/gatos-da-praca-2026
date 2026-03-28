// setAdminRole.js
import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import fs from "fs";

// 🔧 Lê o arquivo JSON manualmente (corrige o erro do assert)
const serviceAccount = JSON.parse(fs.readFileSync("./serviceAccountKey.json", "utf8"));

// Inicializa o Firebase Admin SDK
initializeApp({
  credential: cert(serviceAccount),
});

const email = "admin@outlook.com"; // 👈 coloque aqui o e-mail do admin

getAuth()
  .getUserByEmail(email)
  .then((user) => {
    return getAuth().setCustomUserClaims(user.uid, { admin: true });
  })
  .then(() => {
    console.log(`✅ Usuário ${email} agora é administrador!`);
    process.exit();
  })
  .catch((error) => {
    console.error("❌ Erro ao definir admin:", error);
  });
