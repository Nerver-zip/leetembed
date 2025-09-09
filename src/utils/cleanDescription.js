const he = require('he');

/**
 * cleanDescription(html)
 * - decodes HTML entities (named & numeric)
 * - cuts from "Example 1:" onward
 * - strips tags and normalizes whitespace
 */
function cleanDescription(html) {
    //Decode HTML entities (handles &#39;, &quot;, named entities, etc.)
    let text = he.decode(html);

    //Cut description starting from "Example 1:"
    const exampleIdx = text.indexOf('Example 1:');
    if (exampleIdx !== -1) text = text.slice(0, exampleIdx).trim();

    //Remove block/inline HTML tags lightly turning some blocks into spaces/newlines
    text = text.replace(/<p>/gi, '')
               .replace(/<\/p>/gi, '\n')
               .replace(/<ul>/gi, '')
               .replace(/<\/ul>/gi, '')
               .replace(/<li>/gi, '- ')
               .replace(/<\/li>/gi, '\n')
               .replace(/<pre>/gi, '')
               .replace(/<\/pre>/gi, '\n');

    //Remove any remaining tags (we keep plain text)
    text = text.replace(/<[^>]+>/g, '');

    //Normalize whitespace to single spaces
    text = text.replace(/\r?\n|\r/g, ' ')
               .replace(/\s+/g, ' ')
               .trim();

    //Optional: truncate
    if (text.length > 2000) 
        text = text.slice(0, 2000) + '...';

    return text;
}

module.exports = { cleanDescription };
