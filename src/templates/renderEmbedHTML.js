function renderEmbedHTML(data) {
    const rawDesc = data.description || '';
    const safeDesc = rawDesc
        .replace(/<[^>]*>?/gm, '') 
        .replace(/\n/g, ' ')      
        .replace(/&/g, '&amp;')   
        .replace(/</g, '&lt;')    
        .replace(/>/g, '&gt;')    
        .replace(/"/g, '&quot;')  
        .trim();

    // Difficulty emoji
    let diffEmoji = '';
    switch ((data.difficulty || '').toLowerCase()) {
        case 'easy': diffEmoji = '🟢'; break;
        case 'medium': diffEmoji = '🟡'; break;
        case 'hard': diffEmoji = '🔴'; break;
    }

    // Title with number
    const titleWithNumber = data.number ? `${data.number}. ${data.title}` : data.title;

    // Meta description: difficulty, tags, stats + text
    const metaDescriptionContent = 
        `${diffEmoji} ${data.difficulty} | Tags: ${data.tags}\n` +
        `👍 ${data.likes} | 👎 ${data.dislikes} | 📊 Acceptance: ${data.acceptance}\n\n` +
        `${safeDesc}\n\nLeetEmbed • ${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}`;

    const leetCodeLogoUrl = "https://leetembed.vercel.app/assets/leetcode-small.png";

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Open Graph -->
    <meta property="og:title" content="${titleWithNumber}" />
    <meta property="og:description" content="${metaDescriptionContent}" />
    <meta property="og:url" content="${data.url}" />
    <meta property="og:image" content="${leetCodeLogoUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="LeetEmbed" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${titleWithNumber}" />
    <meta name="twitter:description" content="${metaDescriptionContent}" />
    <meta name="twitter:image" content="${leetCodeLogoUrl}" />

    <!-- Fallback redirection -->
    <meta http-equiv="refresh" content="0; url=${data.url}" />

    <title>${titleWithNumber}</title>
</head>
<body>
    <header style="display:flex;align-items:center;gap:10px;">
        <img src="${leetCodeLogoUrl}" alt="LeetCode" width="50" height="50"/>
        <h1>${titleWithNumber}</h1>
    </header>

    <p><strong>Difficulty:</strong> ${diffEmoji} ${data.difficulty}</p>
    <p><strong>Tags:</strong> ${data.tags}</p>

    <blockquote>${safeDesc}</blockquote>

    <footer>
        👍 ${data.likes} &nbsp; | &nbsp; 👎 ${data.dislikes} &nbsp; | &nbsp; 📊 Acceptance: ${data.acceptance}
    </footer>

    <br/>
    <a href="${data.url}">Open on LeetCode</a>
</body>
</html>
`;
}

module.exports = { renderEmbedHTML };
