const User = ({ name, ...rest }) => {
  return (
    <span {...rest}>{ name }</span>
  );
};

export default User;
