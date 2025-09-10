function renderEmbedHTML(data) {
    // Escape characters for meta tags
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

    // Footer stats (embedded in description for Discord)
    const statsLine = `👍 ${data.likes} | 👎 ${data.dislikes} | 📊 Acceptance: ${data.acceptance}`;

    // Full meta description
    const metaDesc = `${diffEmoji} ${data.difficulty}\nTags: ${data.tags}\n${statsLine}\n\n${safeDesc}`;

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    
    <!-- Twitter/Discord preview meta -->
    <meta property="og:title" content="${titleWithNumber}" />
    <meta property="og:description" content="${metaDesc}" />
    <meta property="og:url" content="${data.url}" />
    <meta property="og:image" content="https://leetembed.vercel.app/assets/leetcode-small.png" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="LeetEmbed" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${titleWithNumber}" />
    <meta name="twitter:description" content="${metaDesc}" />
    <meta name="description" content="${metaDesc}" />

    <title>${titleWithNumber}</title>
</head>
<body>
    <h1><a href="${data.url}">${titleWithNumber}</a></h1>
    <p><strong>Difficulty:</strong> ${diffEmoji} ${data.difficulty}</p>
    <p><strong>Tags:</strong> ${data.tags}</p>
    <p>${safeDesc}</p>

    <hr />
    <p>${statsLine}</p>

    <br/>
    <img src="https://leetembed.vercel.app/assets/leetcode-small.png" alt="LeetCode Logo" width="50" height="50" />
    <br/>
    <a href="${data.url}">Open on LeetCode</a>
</body>
</html>
`;
}

module.exports = { renderEmbedHTML };

