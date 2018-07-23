let config = require('../config')
let db = require('../providers/sqlserver')

//------------------------------------------------
exports.RecEventos = async function (req, res) {
    try {
        var spData = {}

        db.query('', spData).then(result => {
            res.status(200).json(result.recordsets[0])
        }).catch(err => {
            res.status(500).json({
                error: true,
                description: err
            })
        })
    }
    catch (exception) {
        console.log(exception);
    }
}

exports.InsEvento = async function (req, res) {
    try {
        var spData = {
            id: req.params.id,
            agrupar: req.body
        }

        db.query('', spData).then(result => {
            res.status(200).json(result.recordsets[0])
        }).catch(err => {
            res.status(500).json({
                error: true,
                description: err
            })
        })
    }
    catch (exception) {
        console.log(exception);
    }
}