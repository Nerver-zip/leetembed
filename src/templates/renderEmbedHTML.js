function renderEmbedHTML(data) {
    // Escapa caracteres para HTML
    const safeDesc = data.description
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/\n/g, ' ');

    // Define cor da dificuldade
    let diffEmoji = '';
    switch (data.difficulty.toLowerCase()) {
        case 'easy': diffEmoji = '🟢'; break;
        case 'medium': diffEmoji = '🟡'; break;
        case 'hard': diffEmoji = '🔴'; break;
        default: diffEmoji = '';
    }

    // Número + título
    const titleWithNumber = data.number ? `${data.number}. ${data.title}` : data.title;

    return `
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8" />
    <meta property="og:title" content="${titleWithNumber} - ${data.difficulty}" />
    <meta property="og:description" content="${safeDesc}" />
    <meta property="og:url" content="${data.url}" />
    <meta property="og:image" content="https://leetembed.vercel.app/assets/leetcode.png" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="description" content="${safeDesc}" />
    <title>${titleWithNumber}</title>
</head>
<body>
    <h1>${titleWithNumber}</h1>
    <p><strong>Dificulty:</strong> ${diffEmoji} ${data.difficulty}</p>
    <p><strong>Tags:</strong> ${data.tags}</p>
    <p>${safeDesc}</p>
    <a href="${data.url}">Open on LeetCode</a>
</body>
</html>
`;
}

module.exports = { renderEmbedHTML };
