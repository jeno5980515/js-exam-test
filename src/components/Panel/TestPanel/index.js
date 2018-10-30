import React from 'react';
import AceEditor from 'react-ace';
import styles from './TestPanel.module.scss';

const TestPanel = ({ data }) => (
  <div
    className={`${styles['test-panel']}`}
  >
    <AceEditor
      showPrintMargin={false}
      mode="javascript"
      theme="textmate"
      value={data}
      readOnly
      tabSize={2}
    />
  </div>
);

export default TestPanel;
