import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { reactLocalStorage } from 'reactjs-localstorage';
import Helpers from '../../Utils/Helpers';

export default function ModalA({ setModalIsOpen }) {
   const [oldPassword, setOldPassword] = useState('');
   const [newPassword, setNewPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');

    const ChangePassword = async(e) => {
      e.preventDefault();
    
      if (!oldPassword || !newPassword || !confirmPassword) {
        toast.error('Please fill in all fields.');
        return;
      }

      if (newPassword !== confirmPassword) {
        toast.error('New password and confirm password do not match.');
        return;
      }

         try {
          let data = {
            old_password: oldPassword,
            new_password: newPassword,
          };
           const res = await Helpers(
             `http://localhost:3004/api/admin/change-password/${reactLocalStorage?.get('id')}`,
             'POST',
             data
           );

           if (res && res?.status) {
             // console.log('UserDatasdfdsfsdfsdfsdfsdf', res);
             toast.success(res?.message);
             // Reset form fields
             setOldPassword('');
             setNewPassword('');
             setConfirmPassword('');
             setModalIsOpen(false);
           } else {
             toast.error(res?.message)
           }
         } catch (error) {
           console.error(error);
         }
    };

  return (
    <>
      <div className="modal fade show" role="dialog" tabIndex={-1}>
        <div className="modal-dialog" role="document">
          <button
            className="btn-close"
            style={{ position: 'absolute', top: "15px", right: "-103px", zIndex: '1', cursor: 'pointer' }}
            onClick={() => setModalIsOpen(false)}
          ></button>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Change Password</h5>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="exampleEmail11" className="form-label">
                      Old Password
                    </label>
                    <input
                      name="email"
                      id="exampleEmail11"
                      placeholder="Enter old password"
                      type="password"
                      className="form-control"
                      value={oldPassword}
                      onChange={e => setOldPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="examplePassword11" className="form-label">
                      New Password
                    </label>
                    <input
                      name="password"
                      id="examplePassword11"
                      placeholder="Enter new password"
                      type="password"
                      className="form-control"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-md-">
                  <div className="mb-6">
                    <label htmlFor="examplePassword11" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      name="password"
                      id="examplePassword11"
                      placeholder="Enter confirm password"
                      type="password"
                      className="form-control"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              {/* <button type="button" className="btn btn-link" onClick={() => { closeModal( false)}}>
                                Cancel
                            </button> */}
              <button type="button" className="btn btn-primary" onClick={ChangePassword}>
                Submit
              </button>{' '}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
