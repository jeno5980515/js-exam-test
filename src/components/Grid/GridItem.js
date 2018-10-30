import React from 'react';
import styles from './Grid.module.scss';

const GridItem = ({ children }) => (
  <div className={styles.item}>
    { children }
  </div>
);

export default GridItem;
