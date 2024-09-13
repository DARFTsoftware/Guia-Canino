const express = require("express");
const router = express.Router();

require('firebase/firestore');
const { getFirestore, doc, getDoc, collection, query, where, getDocs } = require('firebase/firestore');

router.get("/getUser", async function (req, res) {
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require("node-localstorage").LocalStorage;
        localStorage = new LocalStorage("./scratch");
    }
    const userID = localStorage.getItem("userID");
    if (!userID) {
        return res.json("Nenhum ID encontrado no localStorage");
    }
    try {
        const db = getFirestore();
        const docRef = doc(db, "user", userID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          res.json(docSnap.data());
        } else {
          // docSnap.data() will be undefined in this case
          res.json("Nenhum documento encontrado");
        }
        /*
        const userDoc = await db.collection("user").doc(userID).get();
        if (userDoc.exists) {
            res.json(userDoc.data());
        } else {
            res.json(userID);
        }*/
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
    }
    
});

router.post("/", function (req, res) {
    const { user, idade,  } = req.body;
    
});

router.get("/", function (req, res, next) {
    res.render("perfil");
});

module.exports = router;
