function DefaultLayout(props) {
  const { children } = props;

  return (
    <div className="m-[32px] bg-red-500">
      {children}
    </div>
  )
}

export default DefaultLayout;
