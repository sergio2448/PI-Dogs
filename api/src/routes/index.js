const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
  getAllDogs,
  getDogById,
  getAllTemperament,
  createDog,
  filterTemperament,
  newTemperament,
} = require("../controllers/controller");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/dogs", getAllDogs);

router.get("/dogs/:id", getDogById);

router.get("/temperament", getAllTemperament);

router.post("/dog", createDog);

router.get("/filteredTemperament/:temperament", filterTemperament);

router.post("/newtemp", newTemperament)

module.exports = router;
