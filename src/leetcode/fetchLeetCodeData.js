const { fetchGraphQL } = require('./fetchGraphQL.js');
const { cleanDescription } = require('../utils/cleanDescription.js');

async function fetchLeetCodeData(slug) {
    const question = await fetchGraphQL(slug);
    
    if (!question) {
        return {
            number: null,
            title: "Question not found",
            difficulty: "N/A",
            tags: "N/A",
            description: "Description not available.",
            url: `https://leetcode.com/problems/${slug}/`,
        };
    }

    return {
        number: question.questionFrontendId, 
        title: question.title,
        difficulty: question.difficulty,
        tags: question.topicTags.map(tag => tag.name).join(', '),
        description: cleanDescription(question.content) || "Description not available.",
        url: `https://leetcode.com/problems/${slug}/`,
    };
}

module.exports = { fetchLeetCodeData };
