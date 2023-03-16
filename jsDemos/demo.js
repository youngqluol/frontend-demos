// 重构前
function changeList(list) {
  console.log('some operation of list')
  for (let i=0; i<list.length; i++) {
    // do sth
  }
  
  console.log('conditional judgment')
  let result
  if (list.length < 4) {
    result = list.pop()
  } else {
    result = list.shift()
  }
    
    
  const today = new Date(Date.now())
  const dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
  
  result.dueDate = dueDate
 
  return result
}

// 重构后
function changeList(list) {
  console.log('some operation of list')
  operationOfList(list)
  
  console.log('conditional judgment')
  const result = judgment(list)
  
  result.dueDate = getRecordTime()
  return result
}

function operationOfList(list) {
  for (let i=0; i<list.length; i++) {
    // do sth
  }
  return list
}

function judgment(list) {
  let result
  if (list.length < 4) {
    result = list.pop()
  } else {
    result = list.shift()
  }
  return result
}

function getRecordTime() {
  const today = new Date(Date.now())
  const dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
  return dueDate
}