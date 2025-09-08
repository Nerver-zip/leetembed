import { fetchLeetCodeData } from '../../src/leetcode/fetchLeetCodeData.js';
import { renderEmbedHTML } from '../../src/templates/renderEmbedHTML.js';

export default async function handler(req, res) {
  const { slug } = req.query;

  try {
    let data = await fetchLeetCodeData(slug);

    const html = renderEmbedHTML(data);

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (err) {
    res.status(404).send('<h1>Questão não encontrada</h1>');
  }
}
