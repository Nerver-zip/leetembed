function renderEmbedHTML(data) {
    // Escape for meta tags (OG + Twitter)
    const safeDesc = data.description
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/\n/g, ' ');

    // Difficulty emoji
    let diffEmoji = '';
    switch (data.difficulty.toLowerCase()) {
        case 'easy': diffEmoji = '🟢'; break;
        case 'medium': diffEmoji = '🟡'; break;
        case 'hard': diffEmoji = '🔴'; break;
    }

    // Title with number
    const titleWithNumber = data.number ? `${data.number}. ${data.title}` : data.title;

    // Header simulado (nome + username)
    const header = `LeetCode / Problem`;

    // Footer simulado
    const footer = `LeetCode • ${new Date().toLocaleDateString('en-US')}`;

    // Build meta description for OG / Twitter (body + footer)
    const metaDesc = 
      `${diffEmoji} ${data.difficulty}\n` +
      `Tags: ${data.tags}\n` +
      `👍 ${data.likes} | 👎 ${data.dislikes} | 📊 Acceptance: ${data.acceptance}\n\n` +
      `${safeDesc}\n\n${footer}`;

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <!-- Header + body -->
    <meta property="og:title" content="${titleWithNumber}" />
    <meta property="og:description" content="${metaDesc}" />
    <meta property="og:url" content="${data.url}" />
    <meta property="og:image" content="https://leetembed.vercel.app/assets/leetcode-small.png" />
    <meta property="og:type" content="website" />

    <!-- Twitter Card tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${titleWithNumber}" />
    <meta name="twitter:description" content="${metaDesc}" />
    <meta name="twitter:image" content="https://leetembed.vercel.app/assets/leetcode-small.png" />

    <meta name="description" content="${metaDesc}" />
    <title>${titleWithNumber}</title>
</head>
<body>
    <!-- Visualização básica no navegador -->
    <h1>${titleWithNumber}</h1>
    <p><strong>Difficulty:</strong> ${diffEmoji} ${data.difficulty}</p>
    <p><strong>Tags:</strong> ${data.tags}</p>
    <p>${safeDesc}</p>

    <hr />
    <footer>
      👍 ${data.likes} &nbsp; | &nbsp; 👎 ${data.dislikes} &nbsp; | &nbsp; 📊 Acceptance: ${data.acceptance}
    </footer>

    <br/>
    <img src="https://leetembed.vercel.app/assets/leetcode-small.png" alt="LeetCode Logo" width="50" height="50" />
    <br/>
    <a href="${data.url}">Open on LeetCode</a>
</body>
</html>
`;
}

module.exports = { renderEmbedHTML };

