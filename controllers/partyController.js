const PartyModel = require('../models/Party')

const checkPartyBudget = (budget, services) => {

    const priceSum = services.reduce((sum, service) => sum + service.price, 0)

    console.log(priceSum, budget)

    if(priceSum > budget) {
        return false
    }
    return true

}

const partyController = {

    create: async(req, res) => {
        try {

            const party = {
                title: req.body.title, 
                owner: req.body.owner,
                description: req.body.description,
                budget: req.body.budget,
                image: req.body.image,
                services: req.body.services,
            }

            console.log(party)

            if (party.services && !checkPartyBudget(party.budget, party.services)) {
                res.status(406).json({message: 'Seu orçamento é insuficiente'})
                return
            }

            const response = await PartyModel.create(party)
            res.status(201).json({response, message: 'Festa criada com sucesso'})

        } catch(e) {
            console.log(e)
        }
    },

    getAll: async(_req, res) => {
        try {

            const parties = await PartyModel.find()
            res.status(200).json(parties)

        } catch(e) {
            console.log(e)
        }
    },

    get: async(req, res) => {
        try {

            const id = req.params.id
            const party = await PartyModel.findById(id)

            if(!party) {
                res.status(404).json({message: 'Serviço não encontado!'})
                return
            }

            res.status(200).json(party)

        } catch(e) {
            console.log(e)
        }
    },

    delete: async(req, res) => {
        try {

            const id = req.params.id
            const party = await PartyModel.findById(id)

            if(!party) {
                res.status(404).json({message: 'Serviço não encontado!'})
                return
            }

            const deleteParty = await PartyModel.findByIdAndDelete(id)
            res.status(200).json({deleteParty, message: 'Serviço excluido com sucesso'})

        } catch(e) {
            console.log(e)
        }
    },
}

module.exports = partyController