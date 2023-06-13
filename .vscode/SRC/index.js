const express = require("express")
const fs = require("fs")
const { getDatabaseInstance } = require("./database")

const app = express()

app.use(express.static(__dirname + '/public'))

app.use("/create", async (req, res) => { 
  const { title, source, description, thumb } = req.query
  const bd = await getDatabaseInstance() 
  const resut = await bd.run(`
    INSERT INTO movies(title, source, description, thumb) VALUES(?, ?, ?, ?)`,
    [title, source, description, thumb]
  )
  res.send(resut)
})

app.use("/read", async (req, res) => { 
  const { id } = req.query
  const bd = await getDatabaseInstance()
  const result = await bd.get(`
    SELECT * FROM movies WHERE id=?`,
    [id])
  res.send(result)
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

app.listen(3000, () => console.log("Servidor rodando!"))