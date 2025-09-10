function renderEmbedHTML(data) {
    const rawContent = data.description || ''; // Certifique-se de que data.description existe
    const cleanContent = rawContent.replace(/<[^>]*>?/gm, '').replace(/\n/g, ' ').trim(); // Remover tags HTML e novas linhas
    const safeShortDesc = cleanContent.substring(0, 250); // Pegar os primeiros 250 caracteres como um resumo

    // Difficulty emoji
    let diffEmoji = '';
    switch (data.difficulty.toLowerCase()) {
        case 'easy': diffEmoji = '🟢'; break;
        case 'medium': diffEmoji = '🟡'; break;
        case 'hard': diffEmoji = '🔴'; break;
    }

    
    const titleWithNumber = data.number ? `${data.number}. ${data.title}` : data.title;

    const statsLine = `👍 ${data.likes} | 👎 ${data.dislikes} | 📊 ${data.acceptance}`;

    const metaDescForDiscord = `${diffEmoji} ${data.difficulty}\nTags: ${data.tags}`;

    const leetCodeLogoUrl = "https://leetembed.vercel.app/assets/leetcode-small.png";
    const largeImageUrl = "https://leetembed.vercel.app/assets/leetcode.png"; 

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="refresh" content="0; url = ${data.url}" /> <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="${leetCodeLogoUrl}">

    <meta property="og:title" content="${titleWithNumber}" />
    <meta property="og:description" content="${metaDescForDiscord}" />
    <meta property="og:url" content="${data.url}" />
    <meta property="og:image" content="${largeImageUrl}" /> <meta property="og:type" content="website" />
    <meta property="og:site_name" content="LeetCode" /> <meta name="twitter:card" content="summary_large_image" /> <meta name="twitter:title" content="${titleWithNumber}" />
    <meta name="twitter:description" content="${metaDescForDiscord}" />
    <meta name="twitter:image" content="${largeImageUrl}" />
    <meta property="og:image:alt" content="LeetCode Logo" />
    <meta property="og:image:width" content="1200" /> <meta property="og:image:height" content="675" />
    
    <meta property="og:site_name" content="${statsLine}" /> <meta property="og:image:alt" content="LeetCode Problem" />

    <title>${titleWithNumber}</title>
</head>
<body>
    <h1>Redirecionando para o problema do LeetCode...</h1>
    <a href="${data.url}">Clique aqui se o redirecionamento não funcionar.</a>
    
    <div style="font-family: sans-serif; padding: 20px;">
        <h2><a href="${data.url}">${titleWithNumber}</a></h2>
        <p><strong>Dificuldade:</strong> ${diffEmoji} ${data.difficulty}</p>
        <p><strong>Tags:</strong> ${data.tags}</p>
        <p>${safeShortDesc}...</p>
        <hr />
        <p>${statsLine}</p>
        <br/>
        <img src="${leetCodeLogoUrl}" alt="LeetCode Logo" width="50" height="50" />
        <br/>
        <a href="${data.url}">Abrir no LeetCode</a>
    </div>
</body>
</html>
`;
}

module.exports = { renderEmbedHTML };
