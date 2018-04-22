const User = ({ name, ...rest }) => {
  return (
    <div {...rest}>
      { name }
    </div>
  );
};

export default User;
