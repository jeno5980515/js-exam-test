export function resetTape() {
  return {
    type: 'TAPE/RESET'
  };
}

export function addTape(data) {
  return {
    type: 'TAPE/ADD',
    data
  };
}
