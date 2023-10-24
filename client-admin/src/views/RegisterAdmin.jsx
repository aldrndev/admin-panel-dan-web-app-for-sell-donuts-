import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerAdmin } from '../stores/actions/actionCreators';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const RegisterAdmin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
  });

  const dispatch = useDispatch();
  const message = useSelector((state) => state.register.message);
  const error = useSelector((state) => state.register.error);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(registerAdmin(formData));

    setFormData({
      email: '',
      password: '',
      phoneNumber: '',
      address: '',
    });
  };

  useEffect(() => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    if (error) {
      Toast.fire({
        icon: 'error',
        title: error,
      });
    } else if (message) {
      Toast.fire({
        icon: 'success',
        title: message,
      });
    }
  }, [message, error]);

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white w-1/2 rounded-lg shadow-lg">
          <div className="p-8 max-w-[75vw] mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">
              Create New Admin Account
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-center mt-5">
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-500 w-[15vw] text-white rounded-lg"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterAdmin;
