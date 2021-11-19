const Notification = ({ message, checker }) => {
  if (message === null) return;

  return <div className={checker ? ' success' : ' error'}>{message}</div>;
};

export default Notification;
