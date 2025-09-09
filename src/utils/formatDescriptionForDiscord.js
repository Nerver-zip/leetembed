function formatDescriptionForDiscord(html) {
    let text = html;

    // Remove tags <p>, <ul>, <li>, <pre> e <strong class="example">Example ...</strong>
    text = text.replace(/<p>/g, '')
               .replace(/<\/p>/g, '\n')
               .replace(/<ul>/g, '')
               .replace(/<\/ul>/g, '')
               .replace(/<li>/g, '- ')
               .replace(/<\/li>/g, '\n')
               .replace(/<pre>/g, '')
               .replace(/<\/pre>/g, '\n')
               .replace(/<strong class="example">Example \d+:<\/strong>/g, '')
               .replace(/<strong>Follow-up:&nbsp;<\/strong>.*/g, ''); // remove Follow-up

    // Tags básicas: <code>, <strong>, <em>
    text = text.replace(/<code>(.*?)<\/code>/g, '`$1`')
               .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
               .replace(/<em>(.*?)<\/em>/g, '*$1*');

    // Remove quaisquer tags restantes
    text = text.replace(/<[^>]+>/g, '');

    // Remove múltiplos espaços e linhas extras
    text = text.replace(/\n\s*\n/g, '\n\n').trim();

    // Corta a partir do primeiro "Example"
    const exampleIdx = text.indexOf('Example');
    if (exampleIdx !== -1) {
        text = text.slice(0, exampleIdx).trim();
    }

    if (text.length > 400) {
        text = text.slice(0, 400) + "...";
    }

    return text;
}
