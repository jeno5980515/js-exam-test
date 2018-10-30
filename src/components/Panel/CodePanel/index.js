import React from 'react';
import AceEditor from 'react-ace';

import styles from './CodePanel.module.scss';

const CodePanel = ({
  handleCodeChange,
  data,
  mode,
  theme
}) => (
  <AceEditor
    className={styles.code}
    showPrintMargin={false}
    mode={mode}
    theme={theme}
    onChange={handleCodeChange}
    value={data}
    tabSize={2}
    debounceChangePeriod={800}
  />
);

export default CodePanel;
