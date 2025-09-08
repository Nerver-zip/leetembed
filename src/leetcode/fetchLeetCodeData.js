const { fetchGraphQL } = require('./graphql');
const { cleanDescription } = require('../utils/cleanDescription.js');

async function fetchLeetCodeData(slug) {
    const question = await fetchGraphQL(slug);
    
    if (!question) {
        return {
            title: "Questão não encontrada",
            difficulty: "N/A",
            tags: "N/A",
            description: "Não foi possível recuperar a descrição dessa questão.",
            url: `https://leetcode.com/problems/${slug}/`,
        };
    }

    return {
        title: question.title,
        difficulty: question.difficulty,
        tags: question.topicTags.map(tag => tag.name).join(', '),
        description: cleanDescription(question.content) || "Descrição indisponível.",
        url: `https://leetcode.com/problems/${slug}/`,
    };
}

module.exports = { fetchLeetCodeData };
