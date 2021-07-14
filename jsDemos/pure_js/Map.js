const map = new Map();

function deleteFunc(param) {
  console.log('delete', param);
}

function addFunc() {
  console.log('add');
}

map.set('delete', deleteFunc);
map.set('add', addFunc);

const finalFunc = map.get('delete');
finalFunc(1);

