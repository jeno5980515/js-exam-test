const questionList = [
  {
    name: 'Search',
    content: `

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
      </div>
    );
  }
}

const search = (query) => new Promise((resolve, reject) => {
  const result = DATA.filter(({ name }) => name.includes(query.toLowerCase()));
  if (result.length !== 0) {
    resolve(result);
  } else {
    reject(new Error('not found'));
  }
});

const Item = ({ name, price }) => (
  <div>
    { name }: { price }$ 
  </div>
);

const DATA = [
  {
    name: 'apple',
    price: 10,
    id: 1
  },
  {
    name: 'orange',
    price: 15,
    id: 2
  },
  {
    name: 'banana',
    price: 7,
    id: 3
  },
]

ReactDOM.render(
  <App />,
  root
);

`,
    test: `
class AnswerApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', data: [] };
  }
  changeValue = async (name) => {
    this.setState({ value: name });
    if (name.trim() === '') {
      this.setState({ data: [] });
      return;
    }
    try {
      const result = await search(name);
      this.setState({ data: result });
    } catch (e) {
      this.setState({ data: [] });
    }
  }
  render() {
    return (
      <div>
        <div>Hi, I want to buy { this.state.value }</div>
        <input onChange={e => this.changeValue(e.target.value)}/>
        <div>
          {
            this.state.data.map(({ price, name, id }) => <Item price={price} name={name} key={id} /> )
          }
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <AnswerApp />,
  answer
);

`
  },
];

export default questionList;
