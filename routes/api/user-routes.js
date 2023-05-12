const express = require('express')
const router = express.Router()
const {validateBody} = require('../../utils')
const {schemas} = require('../../models')
const { users: controllers } = require('../../controllers')
const {isValidIdMyPet, authenticate} = require("../../middlewares")

// router.get('/', authenticate, controllers.getAllContacts)



// authenticate
router.post('/user/pets', validateBody(schemas.addMyPetSchema), controllers.addMyPet)

// authenticate
router.delete('/:myPetId', isValidIdMyPet, controllers.removeMyPetById)

module.exports = router