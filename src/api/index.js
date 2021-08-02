let apis = {};
const files = require.context('./', false, /(?<!index)\.[tj]s$/);
files.keys().forEach(fileName => {
  const file = files(fileName);
  const fileModuleName = fileName.replace(/^\.\//, '').replace(/\.\w+$/, '').replace(/.*\//g, '');
  apis[fileModuleName] = file.default;
});
export default apis;
