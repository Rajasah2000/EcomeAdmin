
import toast from 'react-hot-toast';
// import '../AdminAuthentication/ResetPassword.css'
import React, { useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import Helpers from '../Utils/Helpers';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {token} = useParams();
  const navigate = useNavigate();
  console.log("token",token);
  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = e => {
    setConfirmPassword(e.target.value);
  };

  const ResetPassword = async(e) => {
    e.preventDefault();

    // Simple password validation
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    if (password == "" ||  confirmPassword == "") {
      toast.error("All fields are required");
      return;
    }

    // Password length validation
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

       try {
        let data = {
          newPassword: password,
        };

        const res = await Helpers(`http://localhost:3004/api/admin//reset-password/${token}`, 'POST', data);
        if (res && res?.status) {
          toast.success(res?.message);
          setPassword("")
          navigate('/');
        } else {
          toast.error(res?.message);
        }
      } catch (error) {
        console.error(error);
      }


    // Clear form fields and error message on successful password reset
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="modal fade show" role="dialog" tabIndex={-1}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Reset Password</h5>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-6d">
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
                    value={password}
                    onChange={handlePasswordChange}
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
                    onChange={handleConfirmPasswordChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={ResetPassword}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
