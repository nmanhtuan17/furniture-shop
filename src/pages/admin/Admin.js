import { useEffect } from 'react';
import { AdminSideNav } from '../../components/AdminSideNav';
import { useAppDispatch } from '../../redux/store';
import { getProducts } from '../../redux/actions/app.action';

const AdminPage = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getProducts())
  }, []);


  return (
    <div className='flex flex-1 h-100vh mb-5'>
      <AdminSideNav />
    </div>
  )
}

export default AdminPage