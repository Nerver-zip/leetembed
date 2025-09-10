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

    // Dificuldade emoji
    let diffEmoji = '';
    switch (data.difficulty.toLowerCase()) {
        case 'easy': diffEmoji = '🟢'; break;
        case 'medium': diffEmoji = '🟡'; break;
        case 'hard': diffEmoji = '🔴'; break;
    }

    const titleWithNumber = data.number ? `${data.number}. ${data.title}` : data.title;

    const metaDescriptionContent = `${diffEmoji} ${data.difficulty} | Tags: ${data.tags} \n\n${safeDesc}`;

    const statsFooter = `👍 ${data.likes} | 👎 ${data.dislikes} | 📊 ${data.acceptance}`;

    const leetCodeLogoUrl = "https://leetembed.vercel.app/assets/leetcode-small.png";

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="${leetCodeLogoUrl}">
    
    <meta property="og:title" content="${titleWithNumber}" />
    <meta property="og:description" content="${metaDescriptionContent}" />
    <meta property="og:url" content="${data.url}" />
    
    <meta property="og:image" content="${leetCodeLogoUrl}" />
    
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${statsFooter}" />
    
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${titleWithNumber}" />
    <meta name="twitter:description" content="${metaDescriptionContent}" />
    <meta name="twitter:image" content="${leetCodeLogoUrl}" />

    <meta http-equiv="refresh" content="0; url = ${data.url}" />

    <title>${titleWithNumber}</title>
</head>
<body>
    <h1>Redirecionando para o problema do LeetCode...</h1>
    <a href="${data.url}">Clique aqui se o redirecionamento não funcionar.</a>
</body>
</html>
`;
}

module.exports = { renderEmbedHTML };
