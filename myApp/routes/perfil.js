const express = require("express");
const router = express.Router();

const { getFirestore } = require("firebase/firestore");

router.post("/", async function (req, res) {
    const db = getFirestore();

    async function getUserData() {
        if (typeof localStorage === "undefined" || localStorage === null) {
            var LocalStorage = require("node-localstorage").LocalStorage;
            localStorage = new LocalStorage("./scratch");
        }

        const userID = localStorage.getItem("userID");
        if (!userID) {
            console.log("Nenhum ID encontrado no localStorage");
            return;
        }
        try {
            const userDoc = await db.collection("user").doc(userID).get();
            if (userDoc.exists) {
                console.log("Dados de usuário:", userDoc.data());
            } else {
                console.log(
                    "Nenhum documento com está ID foi encontrado:",
                    userID,
                );
            }
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    }
});

router.get("/", function (req, res, next) {
    res.render("perfil");
});

module.exports = router;
