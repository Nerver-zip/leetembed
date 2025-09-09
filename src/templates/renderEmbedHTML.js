function renderEmbedHTML(data) {
    // Escape for meta tags
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

    // Build preview text (meta)
    const metaDesc = `${diffEmoji} ${data.difficulty}\nTags: ${data.tags}\n\n${safeDesc}`;

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta property="og:title" content="${titleWithNumber}" />
    <meta property="og:description" content="${metaDesc}" />
    <meta property="og:url" content="${data.url}" />
    <meta property="og:image" content="https://leetembed.vercel.app/assets/leetcode.png" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="description" content="${metaDesc}" />
    <title>${titleWithNumber}</title>
</head>
<body>
    <h1>${titleWithNumber}</h1>
    <p><strong>Difficulty:</strong> ${diffEmoji} ${data.difficulty}</p>
    <p><strong>Tags:</strong> ${data.tags}</p>
    <p>${safeDesc}</p>
    <a href="${data.url}">Open on LeetCode</a>
</body>
</html>
`;
}
