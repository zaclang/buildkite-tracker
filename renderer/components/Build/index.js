import { Alert } from 'antd';

const Build = ({ state }) => {
  let type;

  switch (state) {
    case 'PASSED':
      type = 'success';
      break;
    case 'BLOCKED':
      type = 'warning';
      break;
    case 'SCHEDULED':
      type = 'info';
      break;
    case 'RUNNING':
      type = 'info';
      break;
    case 'FAILED':
      type = 'error';
      break;
    case 'CANCELING':
      type = 'error';
      break;
    case 'CANCELED':
      type = 'error';
      break;
    case 'NOT_RUN':
      type = 'error';
      break;
    default:
      type = 'error';
  }

  return (
    <Alert
      message={state}
      type={type}
      showIcon
    />
  );
};

export default Build;
