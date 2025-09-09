const { fetchGraphQL } = require('../leetcode/fetchGraphQL.js');

async function main() {
  const slug = 'stone-game-iii'; // teste com qualquer slug do LeetCode
  const question = await fetchGraphQL(slug);
  console.log(question);
}

main().catch(console.error);
