import React from 'react';
import styles from './TapePanel.module.scss';

const TestRow = row => (
  <div className={styles.test}>
    { row.name }
  </div>
);

const AssertRow = (row) => {
  const actual = typeof row.actual === 'object' ? JSON.stringify(row.actual) : `${row.actual}`;
  const expected = typeof row.expected === 'object' ? JSON.stringify(row.expected) : `${row.expected}`;
  return (
    <div className={`${styles.assert} ${row.ok ? styles.ok : styles.fail}`}>
      <div className={row.ok ? styles.ok : styles.fail}>{row.ok ? 'OK' : 'FAIL'}</div>
      { row.name ? <div className={styles.name}>{ `${row.name}` }</div> : null }
      {
        !row.ok
          ? (
            <>
              <div className={styles.actual}>{ actual }</div>
              <div className={styles['not-equal']}>!=</div>
              <div className={styles.expected}>{ expected }</div>
              {
                typeof row.actual === 'string' && typeof row.expected === 'string'
                  ? (
                    <div className={styles.diff}>
                      <span className={styles.expected}>{ expected }</span>
                      <span className={styles.actual}>{ actual }</span>
                    </div>
                  )
                  : null
              }
            </>
          )
          : null
      }
    </div>
  );
};

// TODO: add endrow component
const EndRow = row => (
  <div>
    { JSON.stringify(row) }
  </div>
);

const DescriptionRow = ({ description }) => (
  <div className={styles.description}>
    { description }
  </div>
);

const getRow = (row) => {
  switch (row.type) {
    case 'test':
      return <TestRow key={JSON.stringify(row)} {...row} />;
    case 'assert':
      return <AssertRow key={JSON.stringify(row)} {...row} />;
    case 'end':
      return <EndRow key={JSON.stringify(row)} {...row} />;
    case undefined && typeof row === 'string':
      return <DescriptionRow description={row} key={row} />;
    default:
      return null;
  }
};

const TapePanel = ({ data }) => (
  <div className={styles.tape}>{ data.map(getRow) }</div>
);

export default TapePanel;
