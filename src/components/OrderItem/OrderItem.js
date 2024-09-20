export const OrderItem = ({_id, products, status}) => {
  return (
    <div>
      {products.map((product, index) => (
        <div className={'text-black'} key={product._id}>{product.name}</div>
      ))}
    </div>
  )
}
