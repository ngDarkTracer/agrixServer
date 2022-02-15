const express = require('express')
const http = require('http')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { Client } = require('pg')

const connectionString = `postgres://hoqpbchfbscqma:f626de7c47772920114a99b32e40c8c5641bc9b0ce40f9640b42e01b712437f5@ec2-34-206-148-196.compute-1.amazonaws.com:5432/dbkiju5113kh5n`

client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
});

client.connect()

app.get('/plante', (request, response) => {
    client.query(`SELECT * FROM "LL"."plante"`, (err, res) => {
        if (res) {
            response.writeHead(200, { 'content-type': 'application/json' })
            response.end(JSON.stringify(res.rows))
        } else {
            response.statusCode = 404
            response.end('Error...')
        }
    })
})

app.get('/agriculteur', (request, response) => {
    client.query(`SELECT * FROM "LL"."agriculteur"`, (err, res) => {
        if (res) {
            response.writeHead(200, { 'content-type': 'application/json' })
            response.end(JSON.stringify(res.rows))
        } else {
            response.statusCode = 404
            response.end('Error...')
        }
    })
})

app.get('/projet', (request, response) => {
    client.query(`SELECT * FROM "LL"."projet"`, (err, res) => {
        if (res) {
            response.writeHead(200, { 'content-type': 'application/json' })
            response.end(JSON.stringify(res.rows))
        } else {
            response.statusCode = 404
            response.end('Error...')
        }
    })
})

app.post('/savePlant', (request, response) => {

    nom = request.body.nom
    periodicite = request.body.periodicite
    type_de_semence = request.body.type_de_semence

    client.query(`INSERT INTO "LL"."plante" (nom, periodicite, type_de_semence) VALUES ('${nom}', ${periodicite}, '${type_de_semence}')`, (err, res) => {
        if (res) {
            response.end('Plant saved successfully')
        } else {
            response.end(err)
        }
    })
})

app.post('/saveAgri', (request, response) => {

    nom = request.body.nom
    sexe = request.body.sexe
    age = request.body.age
    telephone = request.body.telephone
    whatsapp = request.body.whatsapp
    email = request.body.email
    agrix = request.body.possede_agrix
    biographie = request.body.biographie
    source = request.body.source


    client.query(`INSERT INTO "LL"."agriculteur" (nom, sexe, age, telephone, wha, email, agrix, biographie, source)
        VALUES ('${nom}', '${sexe}', ${age}, '${telephone}', '${whatsapp}', '${email}', '${agrix}', '${biographie}', '${source}')`, (err, res) => {
        if (res) {
            response.end('agri saved successfully')
        } else {
            response.end(err)
        }
    })
})

app.post('/saveProject', (request, response) => {

    nom = request.body.nom
    etat = request.body.etat
    pays = request.body.pays
    region = request.body.region
    superficie = request.body.superficie
    localisation = request.body.localisation
    datecontact = new Date(request.body.datecontact).toLocaleDateString('en-GB').split('/').reverse().join('')
    datesemis = new Date(request.body.datesemis).toLocaleDateString('en-GB').split('/').reverse().join('')
    dateanticiperecolte = new Date(request.body.dateanticiperecolte).toLocaleDateString('en-GB').split('/').reverse().join('')
    agriculteur = request.body.agriculteur
    plante = request.body.plante

    client.query(`INSERT INTO "LL"."projet" (nom, etat, pays, region, superficie, localisation, datecontact, datesemi, dateanticipederecolte, agriculteur, plante)
        VALUES ('${nom}', '${etat}', '${pays}', '${region}', ${superficie}, '${localisation}', TO_DATE('${datecontact}', 'YYYYMMDD'), TO_DATE('${datesemis}', 'YYYYMMDD'), TO_DATE('${dateanticiperecolte}', 'YYYYMMDD'), ${agriculteur}, ${plante})`, (err, res) => {
        if (res) {
            response.end('project saved successfully')
        } else {
            response.end(err)
        }
    })
})

app.post('/updatePlant', (request, response) => {

    id = request.body.id
    nom = request.body.nom
    periodicite = request.body.periodicite
    type_de_semence = request.body.type_de_semence

    client.query(`UPDATE "LL"."plante" SET nom = '${nom}', periodicite = '${periodicite}', type_de_semence = '${type_de_semence}' WHERE id = '${id}'`, (err, res) => {
        if (res) {
            response.end('Plant updated')
        } else {
            response.end(err)
        }
    })
})

app.post('/updateProject', (request, response) => {

    id = request.body.id
    nom = request.body.nom
    etat = request.body.etat
    pays = request.body.pays
    region = request.body.region
    superficie = request.body.superficie
    localisation = request.body.localisation
    datecontact = new Date(request.body.datecontact).toLocaleDateString('en-GB').split('/').reverse().join('')
    datesemis = new Date(request.body.datesemis).toLocaleDateString('en-GB').split('/').reverse().join('')
    dateanticiperecolte = new Date(request.body.dateanticiperecolte).toLocaleDateString('en-GB').split('/').reverse().join('')
    agriculteur = request.body.agriculteur
    plante = request.body.plante


    client.query(`UPDATE "LL"."projet" SET nom = '${nom}', etat = '${etat}',
 pays = '${pays}', region = '${region}', superficie = ${superficie},
  localisation = '${localisation}', datecontact = TO_DATE('${datecontact}', 'YYYYMMDD'),
   datesemi = TO_DATE('${datecontact}', 'YYYYMMDD'),
    dateanticipederecolte = TO_DATE('${datecontact}', 'YYYYMMDD'),
     agriculteur = ${agriculteur}, plante = ${plante} WHERE id = '${id}'`, (err, res) => {
        if (res) {
            response.end('Project updated')
        } else {
            response.end(err)
        }
    })
})

app.post('/updateAgri', (request, response) => {

    id = request.body.id
    nom = request.body.nom
    sexe = request.body.sexe
    age = request.body.age
    telephone = request.body.telephone
    whatsapp = request.body.whatsapp
    email = request.body.email
    agrix = request.body.possede_agrix
    biographie = request.body.biographie
    source = request.body.source

    client.query(`UPDATE "LL"."agriculteur" SET nom = '${nom}', sexe = '${sexe}', age = '${age}', telephone = '${telephone}', wha = '${whatsapp}', email = '${email}', agrix = '${agrix}', biographie = '${biographie}', source = '${source}' WHERE id = '${id}'`, (err, res) => {
        if (res) {
            response.end('agri updated')
        } else {
            response.end(err)
        }
    })
})

app.get('/deletePlant/:id', (request, response) => {

    client.query(`DELETE FROM "LL"."plante" WHERE id = ${request.params.id}`, (err, res) => {
        if (res) {
            response.end('Plant deleted')
        } else {
            response.end(err)
        }
    })
})

app.get('/deleteProject/:id', (request, response) => {

    client.query(`DELETE FROM "LL"."projet" WHERE id = ${request.params.id}`, (err, res) => {
        if (res) {
            response.end('Project deleted')
        } else {
            response.end(err)
        }
    })
})

app.get('/deleteAgri/:id', (request, response) => {

    client.query(`DELETE FROM "LL"."agriculteur" WHERE id = ${request.params.id}`, (err, res) => {
        if (res) {
            response.end('Plant deleted')
        } else {
            response.end(err)
        }
    })
})

http.createServer(app).listen(3000);
