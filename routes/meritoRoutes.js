const express = require('express');
const { getMeritos, createMerito, updateMerito, deleteMerito } = require('../controllers/meritoController');
const router = express.Router();

router.get('/', getMeritos);
router.post('/', createMerito);
router.put('/:id', updateMerito);
router.delete('/:id', deleteMerito);

module.exports = router;
