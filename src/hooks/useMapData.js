import {useAppSelector} from "../redux/store";
import {useMemo} from "react";

export const useMapData = (data) => {
  const {products} = useAppSelector(state => state.product);
  const mappedData = useMemo(() => data.map(c => ({...c, product: products.find(p => p._id === c.product)}))
    , [products, data]);

  return {mappedData};
}
