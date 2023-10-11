import React from 'react'

export default function Modal({ closeModal }) {
    return (
        <>

            <div
                className="modal fade show"
                role="dialog"
                tabIndex={-1}

            >
               
                <div className="modal-dialog" role="document">
                <button
                    className="btn-close"
                    style={{ position: "absolute", top: 15, right: 15, zIndex:"1", cursor:"pointer" }}
                    onClick={() => { closeModal( false)}}

                >
                    
                </button>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
                        </div>
                        <div className="modal-body">
                            
                    
                            <div className="row">

                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="exampleEmail11" className="form-label">
                                            First Name
                                        </label>
                                        <input
                                            name="email"
                                            id="exampleEmail11"
                                            placeholder="with a placeholder"
                                            type="text"
                                            className="form-control"
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="examplePassword11" className="form-label">
                                            Last Name
                                        </label>
                                        <input
                                            name="password"
                                            id="examplePassword11"
                                            placeholder="password placeholder"
                                            type="text"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="exampleEmail11" className="form-label">
                                            Email
                                        </label>
                                        <input
                                            name="email"
                                            id="exampleEmail11"
                                            placeholder="with a placeholder"
                                            type="email"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="examplePassword11" className="form-label">
                                            Password
                                        </label>
                                        <input
                                            name="password"
                                            id="examplePassword11"
                                            placeholder="password placeholder"
                                            type="password"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-link" onClick={() => { closeModal( false)}}>
                                Cancel
                            </button>
                            <button type="button" className="btn btn-primary">
                                Do Something
                            </button>{" "}
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
