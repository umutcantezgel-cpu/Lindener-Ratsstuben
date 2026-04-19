const fs = require('fs');
const execSync = require('child_process').execSync;

const output = execSync('find public/images/menu -type f -name "*.png"').toString();
const lines = output.trim().split('\n');

const map = {};
for (const line of lines) {
  const match = line.match(/\/(\d+)-[^\/]+\.png$/);
  if (match) {
    const id = match[1];
    // remove public/ prefix
    const path = '/' + line.replace(/^public\//, '');
    map[id] = path;
  }
}

let result = 'const dishImageMap: Record<string, string> = {\n';
for (const [key, value] of Object.entries(map).sort((a, b) => parseInt(a[0]) - parseInt(b[0]))) {
  result += `    '${key}': '${value}',\n`;
}
result += '};\n';
console.log(result);
