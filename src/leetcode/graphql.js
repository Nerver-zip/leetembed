async function fetchGraphQL(slug) {
    const query = `
        query getQuestionDetail($titleSlug: String!) {
            question(titleSlug: $titleSlug) {
                title
                difficulty
                topicTags {
                    name
                }
                content
            }
        }
    `;

    const variables = { titleSlug: slug };

    const response = await fetch('https://leetcode.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Referer': 'https://leetcode.com/',
        },
        body: JSON.stringify({ query, variables }),
    });

    const json = await response.json();
    return json.data.question;
}

module.exports = { fetchGraphQL };
