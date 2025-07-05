function DefaultLayout(props) {
  const { children } = props;

  return (
    <div className={"m-[32px]"}>
      {children}
    </div>
  )
}

export default DefaultLayout;
