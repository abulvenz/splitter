const fs = require('fs');
const files = fs.readdirSync('dist/');

const js = files.filter(e=>e.indexOf('.js')===e.length-3);
const css = files.filter(e=>e.indexOf('.css')===e.length-4);
const html = files.filter(e=>e.indexOf('.html')===e.length-5);

console.log(js,css,html)

const htmlContent = fs.readFileSync('dist/'+html[0]);

console.log(htmlContent.toString())

const regex = /(<link rel="stylesheet" href="\/main.[0-9a-f]+.css">)/im;

const regex2 = /(<script src="\/main.[0-9a-f]+.js"><\/script>)/im;

let newContent = htmlContent.toString()
.replace(regex2, `<script>${fs.readFileSync('dist/'+js[0]).toString()}</script>`)
.replace(regex, `<style>${fs.readFileSync('dist/'+css[0]).toString()}</style>`)

fs.writeFileSync('docs/index.html',newContent);
