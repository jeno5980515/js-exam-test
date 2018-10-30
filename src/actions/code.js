export function changeCode({ compiledCode, rawCode, type }) {
  return {
    type: `${type}/CODE/CHANGE`,
    compiledCode,
    rawCode
  };
}

export function changeQuestion({ index, type }) {
  return {
    type: `${type}/QUESTION/CHANGE`,
    index
  };
}

export function resetQuestion({ type }) {
  return {
    type: `${type}/QUESTION/RESET`
  };
}
