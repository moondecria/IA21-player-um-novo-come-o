const express = require("express")
const fs = require("fs")
const app = express()

app.use(express.static(__dirname + '/public'))

app.use("/create", (req, res) => { 
  const { file, texto } = req.query
  fs.writeFileSync(file, texto)
  res.send("Criado!!")
})

app.use("/read", (req, res) => { 
  const { file } = req.query
  const texto = fs.readFileSync(file)
  res.send(texto.toString()) /
})

app.use("/update", (req, res) => { 
  const { file, texto } = req.query
  fs.appendFileSync(file, texto)
  res.send("Atualizado!!")
})

app.use("/delete", (req, res) => { 
  const { file } = req.query
  fs.rmSync(file)
  res.send("Deletado!!")
})

app.listen(8080, () => console.log("Servidor funcionando!"))