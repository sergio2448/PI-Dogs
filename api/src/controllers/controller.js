const axios = require("axios");
const { Dog, Temperament } = require("../db");

// De la API trae sólo la información necesaria
const getApiInfo = async () => {
  try {
    const apiUrl = await axios.get("https://api.thedogapi.com/v1/breeds");
    const apiInfo = await apiUrl.data.map((raza) => {
      return {
        id: raza.id,
        name: raza.name,
        weight: raza.weight.metric,
        height: raza.height.metric,
        life_span: raza.life_span,
        temperament: raza.temperament,
        image: raza.image.url,
      };
    });
    const olde = await apiInfo.filter((raza) => raza.id !== 179);
    return olde;
  } catch (error) {
    console.log(error.message);
  }
};

// Trae la información de la DB
const getDbInfo = async () => {
  try {
    const getdbInfo = await Dog.findAll({
      include: {
        model: Temperament,
        attributes: ["temperament"],
        through: {
          attributes: [],
        },
      },
    });
    const dbinfo = await getdbInfo.map((raza) => {
      return {
        id: raza.id,
        name: raza.name,
        weight: raza.weight,
        height: raza.height,
        life_span: raza.life_span,
        temperament: raza.temperaments[0].temperament,
        image: raza.image,
        createdInDb: raza.createdInDb,
      };
    });
    return dbinfo;
  } catch (error) {
    console.log(error.message);
  }
};

// Concatena la información de la api con la de la DB
const getAllInfoDogs = async () => {
  try {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
  } catch (error) {
    console.log(error.message);
  }
};

// GET --> '/dogs' y '/dogs?name='
// Unifica la ruta que trae toda la info con la que consulta por name
const getAllDogs = async (req, res) => {
  try {
    const name = req.query.name;
    let dogsTotal = await getAllInfoDogs();
    if (name) {
      let dogName = dogsTotal.filter((dog) =>
        dog.name.toLowerCase().includes(name.toLowerCase())
      );
      dogName.length
        ? res.status(200).send(dogName)
        : res.status(404).send("El perro no existe");
    } else {
      res.status(200).send(dogsTotal);
    }
  } catch (error) {
    console.log(error.message);
  }
};

// GET --> '/dogs/:id'
// Obtiene info por id
const getDogById = async (req, res) => {
  try {
    const id = req.params.id;
    const dogsTotal = await getAllInfoDogs();

    if (id) {
      var dogId = dogsTotal.filter((idd) => idd.id == id);

      dogId.length
        ? res.status(200).json(dogId)
        : res.status(400).send("No se encontró el perro");
    }
  } catch (error) {
    console.log(error.message);
  }
};

// GET --> '/temperament'
// Busca los distintos temperamentos y los almacena en la DB
const getAllTemperament = async (req, res) => {
  try {
    const apiTemp = await getApiInfo();
    const temperaments = await apiTemp.map((temp) => temp.temperament);
    const arrayTemp = temperaments
      .map((temp) => (temp ? temp.split(", ") : null))
      .flat();
    const temperamentUnique = [...new Set(arrayTemp)];
    temperamentUnique.forEach(
      async (temp) =>
        await Temperament.findOrCreate({
          where: { temperament: temp },
        })
    );

    const allTemperaments = await Temperament.findAll();
    res.send(allTemperaments);
  } catch (error) {
    console.log(error.message);
  }
};

// POST --> '/dog'
// Crea un ítem
const createDog = async (req, res) => {
  try {
    let { name, weight, height, life_span, temperament, image } = req.body;
    console.log("tempString", temperament.toString());
    let newDog = await Dog.create({
      name,
      weight,
      height,
      life_span,
      temperament,
      image,
    });
    let dogDb = await Temperament.findAll({
      where: { temperament: temperament },
    });
    console.log("dogDb", dogDb);
    newDog.addTemperament(dogDb);
    res.send("Perro creado con éxito");
  } catch (error) {
    console.log(error.message);
  }
};

// GET --> '/filteredTemperament/:temperament'
// Filtra por tipo de temperamento
const filterTemperament = async (req, res) => {
  try {
    const temperament = req.params.temperament;
    const dogsall = await getAllInfoDogs();
    let dogTemperament = dogsall.filter((dog) =>
      dog.temperament
        ? dog.temperament.toLowerCase().includes(temperament.toLowerCase())
        : null
    );
    res.status(200).send(dogTemperament);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getAllDogs,
  getDogById,
  getAllTemperament,
  createDog,
  filterTemperament,
};
