function renderEmbedHTML(data) {
    const safeDesc = data.description
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/\n/g, ' ');

    return `
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta property="og:title" content="${data.title} - ${data.difficulty}" />
    <meta property="og:description" content="${safeDesc}" />
    <meta property="og:url" content="${data.url}" />
    <meta property="og:image" content="https://leetembed.com/assets/leetcode.png" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="description" content="${safeDesc}" />
    <title>${data.title}</title>
</head>
<body>
    <h1>${data.title}</h1>
    <p>${safeDesc}</p>
    <a href="${data.url}">Open on LeetCode</a>
</body>
</html>
`;
}

module.exports = { renderEmbedHTML };

