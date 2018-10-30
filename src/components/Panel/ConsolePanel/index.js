import React from 'react';
import styles from './Console.module.scss';

const isError = e => e && e.stack && e.message && typeof e.stack === 'string' && typeof e.message === 'string';

const Text = ({ text }) => <>{ `${text}`.trim() === '' ? <br /> : `${text}`.trim() }</>;

const Console = ({ data, className }) => (
  <div className={`${styles.console} ${className || ''}`}>
    Console:
    {
      data.map(({ args }) => (
        <div className="console" key={args}>
          {
            args.map((text, index) => (
              <div className="text" key={index}>
                {
                  typeof text === 'object' && !isError(text)
                    ? JSON.stringify(text, null, 2)
                    : <Text text={text} />
                }
              </div>
            ))
          }
        </div>
      ))
    }
  </div>
);

export default Console;
