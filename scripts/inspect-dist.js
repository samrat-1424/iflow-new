const http = require('http');

http.get('http://localhost:3001/solutions/distribution', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Find all occurrences of "End-to-End Partner Lifecycle Journey"
    const regex = /End-to-End Partner Lifecycle Journey/g;
    let match;
    let count = 0;
    while ((match = regex.exec(data)) !== null) {
      count++;
      console.log(`Match ${count} at index ${match.index}:`);
      console.log(data.slice(Math.max(0, match.index - 100), Math.min(data.length, match.index + 150)).replace(/\s+/g, ' '));
    }
  });
});

