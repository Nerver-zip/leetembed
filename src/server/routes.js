const express = require('express');
const router = express.Router();
const { fetchLeetCodeData } = require('../leetcode/fetchLeetCodeData');
const { renderEmbedHTML } = require('../templates/renderEmbedHTML');

router.get('/:slug', async (req, res) => {
    const slug = req.params.slug;

    try {
        const data = await fetchLeetCodeData(slug);

        // Renderiza HTML com meta tags OG
        const html = renderEmbedHTML(data);
        res.send(html);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao buscar dados do LeetCode.');
    }
});

module.exports = router;
