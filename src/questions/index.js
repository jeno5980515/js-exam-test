import javascript from 'questions/javascript';
import react from 'questions/react';

const Questions = {
  javascript,
  react
};

const getCategories = () => Object.keys(Questions).map((name) => { return { name }; });

const getQuestions = type => Questions[type];

export {
  getCategories,
  getQuestions
};
