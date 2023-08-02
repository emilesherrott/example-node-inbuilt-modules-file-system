const express = require("express")
const fs = require("fs")
const cors = require("cors")

const logger = require("./logger")

const app = express()

app.use(express.json())
app.use(cors())
app.use(logger)

app.get("/", (req, res) => {
  // 1st Argument: A path to file
  // 2nd Argument: Encoding for the result
  // 3rd Argument: Callback Function  
    // @param ‘data’ is the response
  fs.readFile("./pokemon.json", "utf8", (err, data) => {
    if (err) {
      console.log(err)
    } else {
      // Converts JSON -> JavaScript
      const pokemonData = JSON.parse(data)
      // Converts JavaScript -> JSON
      //  Maintains cleanliness of code
      res.json({
        success: true,
        message: pokemonData,
      })
    }
  })
})

app.post("/", (req, res) => {
  // New Pokemon Information
  let newPokemonData = req.body
  // 1st Argument: A path to file
  // 2nd Argument: Encoding for the result
  // 3rd Argument: Callback Function  
    // @param ‘data’ is the response
  fs.readFile("./pokemon.json", "utf8", (err, data) => {
    if (err) {
      res.json({
        success: false,
        message: err,
      })
    } else {
      try {
        // Converts JSON -> JavaScript
        const pokemonData = JSON.parse(data)
        // Adds new object to array
        pokemonData["pokemonArray"].push(newPokemonData)
        // Convert updated data back to JSON
          // @param ‘pokemonData’ the data to convert
          // @param ‘null’ choosing specific properties to be stringified 
          // @param ‘2’ amount of indentation   
        const updatedPokemonData = JSON.stringify(pokemonData, null, 2)

        // 1st Argument: A path to file
        // 2nd Argument: Data to insert into file
        // 3rd Argument: Encoding for the result
        // 4th Argument: Callback Function
        fs.writeFile("./pokemon.json", updatedPokemonData, "utf8", (err) => {
          if (err) {
            console.log(err)
          } else {
            res.json({
              success: true,
              message: "New Pokemon Data Added",
            })
          }
        })
      } catch (err) {
        res.json({
          success: false,
          message: err,
        })
      }
    }
  })
})

module.exports = app