function DefaultLayout(props) {
  const { children } = props;

  return (
    <div className="my-[70px] mx-[100px]">
      {children}
    </div>
  )
}

export default DefaultLayout;