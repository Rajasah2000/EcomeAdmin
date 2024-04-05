
import toast from 'react-hot-toast';
import React, { useState } from 'react';
import Helpers from './Utils/Helpers';

const SendEmail = ({setOpenModal}) => {
  const [email, setEmail] = useState('');
 

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };



  const handleEmail = async(e) => {
    e.preventDefault();

    // Simple password validation
    if (email == "") {
      toast.error("Email field is required");
      return;
    }

      try {
        let data = {
          email: email,
        };

        const res = await Helpers('http://localhost:3004/api/admin/send-email', 'POST', data);
        if (res && res?.status) {
          toast.success('Email send successfully');
          setEmail('');
          setOpenModal(false);
          // navigate('/');
        } else {
          toast.error(res?.message);
        }
      } catch (error) {
        console.error(error);
      }

  };

  return (
    <div className="modal fade show" role="dialog" tabIndex={-1}>
      <div className="modal-dialog" role="document">
        <button
          className="btn-close"
          style={{ position: 'absolute', top: 15, right: "-50px", zIndex: '1', cursor: 'pointer' }}
          onClick={() => setOpenModal(false)}
        ></button>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Send Email</h5>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-6d">
                <div className="mb-3">
                  <label htmlFor="examplePassword11" className="form-label">
                    Email
                  </label>
                  <input
                    name="email"
                    id="examplePassword11"
                    placeholder="Enter email"
                    type="text"
                    className="form-control"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={handleEmail}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendEmail