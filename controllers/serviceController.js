const { Service: ServiceModel } = require('../models/Service')

const serviceController = {

    create: async(req, res) => {
        try {
    
            const service = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image
            }

            const response = await ServiceModel.create(service)
            res.status(201).json({ response, message: 'Serviço criado com sucesso!' })

        } catch(e) {
            res.status(404).json({ message: 'Erro na aplicação' })
        } 
    },

    getAll: async(_req, res) => {
        try {

            const services = await ServiceModel.find()
            res.status(200).json(services)

        } catch(e) {
            console.log(`Erro: ${e}`)
        }
    },

    get: async(req, res) => {
        try {

            const id = req.params.id
            const service = await ServiceModel.findById(id)

            if(!service) {
                res.status(404).json({message: 'Serviço não encontado!'})
                return
            }
            res.status(200).json(service)

        } catch(e) {
            res.status(404).json({ message: 'Erro na aplicação' })
        }
    },

    delete: async(req, res) => {
        try {

            const id = req.params.id
            const service = await ServiceModel.findById(id)

            if(!service) {
                res.status(404).json({message: 'Serviço não encontado!'})
                return
            }

            const deleteService = await ServiceModel.findByIdAndDelete(id)
            res.status(200).json({deleteService, message: 'Serviço excluido com sucesso'})

        } catch(e) {
            res.status(404).json({ message: 'Erro na aplicação' })
        }
    },

    update: async(req, res) => {
        try {

            const id = req.params.id

            const service = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image
            }

            const updateService = await ServiceModel.findByIdAndUpdate(id, service)

            if(!updateService) {
                res.status(404).json({message: 'Serviço não encontado!'})
                return
            }

            res.status(200).json({service, message: 'Serviço atualizado com sucesso!'})

        } catch(e) {
            res.status(404).json({ message: 'Erro na aplicação' })
        }
    }
}

module.exports = serviceController