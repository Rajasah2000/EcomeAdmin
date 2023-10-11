import React from 'react'

export default function Form(props) {
    const{ firstName = true,lastName=true,email=true, password=true,roll=true,city=true,textarea=true,radio=true,inputFile=true,check=true,btntxt}=props;
    return (
        <>

            <div component="div" className="TabsAnimation appear-done enter-done">
                <div className="main-card mb-3 card">
                    <div className="card-body">
                        <div className="card-title">Grid Rows</div>
                        <form className="">

                            <div className="row">
                                {firstName &&
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
                                }
                                {lastName && <div className="col-md-6">
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
                                </div>}
                               {email &&<div className="col-md-6">
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
                                </div>}
                               {password && <div className="col-md-6">
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
                                </div>}
                            </div>
                            {roll &&<div className="mb-3">
                                <label htmlFor="exampleFormControlSelect1" className="form-label">
                                    Roll Access
                                </label>
                                <select name="select" className="form-control form-select" id="exampleFormControlSelect1">
                                    <option>Add</option>
                                    <option>Edit</option>
                                    <option>Delete</option>
                                    <option>View</option>
                                </select>
                            </div>}
                           {city &&<div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="exampleCity" className="form-label">
                                            City
                                        </label>
                                        <input
                                            name="city"
                                            id="exampleCity"
                                            type="text"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="mb-3">
                                        <label htmlFor="exampleState" className="form-label">
                                            State
                                        </label>
                                        <input
                                            name="state"
                                            id="exampleState"
                                            type="text"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="mb-3">
                                        <label htmlFor="exampleZip" className="form-label">
                                            Zip
                                        </label>
                                        <input name="zip" id="exampleZip" type="text" className="form-control" />
                                    </div>
                                </div>
                            </div>}



                           {textarea && <div className=" mb-3">
                                <label htmlFor="exampleText" className=" col-form-label">
                                    Text Area
                                </label>
                                <div className="">
                                    <textarea
                                        name="text"
                                        id="exampleText"
                                        className="form-control"
                                        defaultValue={""}
                                    />
                                </div>
                            </div>}
                           {radio && <fieldset className="row mb-3">
                                <legend className="col-form-label col-sm-2">Radio Buttons</legend>
                                <div className="col-sm-10">
                                    <div className="form-check">
                                        <label className="form-check-label form-label">
                                            <input name="radio2" type="radio" className="form-check-input" /> Option
                                            one is this and that—be sure to include why it's great
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <label className="form-check-label form-label">
                                            <input name="radio2" type="radio" className="form-check-input" /> Option
                                            two can be something else and selecting it will deselect option one
                                        </label>
                                    </div>
                                    <div className="form-check disabled">
                                        <label className="form-check-label form-label">
                                            <input
                                                name="radio2"
                                                disabled=""
                                                type="radio"
                                                className="form-check-input"
                                            />{" "}
                                            Option three is disabled
                                        </label>
                                    </div>
                                </div>
                            </fieldset>}
                          {inputFile &&  <div className="row mb-3">
                                <label htmlFor="exampleFile" className="col-sm-2 col-form-label">
                                    File
                                </label>
                                <div className="col-sm-10">
                                    <input name="file" id="exampleFile" type="file" className="form-control" />
                                    <small className="form-text text-muted">
                                        This is some placeholder block-level help text for the above input. It's a
                                        bit lighter and easily wraps to a new line.
                                    </small>
                                </div>
                            </div>}


                          {check &&  <div className="form-check">
                                <input
                                    name="check"
                                    id="exampleCheck"
                                    type="checkbox"
                                    className="form-check-input"
                                />
                                <label htmlFor="exampleCheck" className="form-check-label form-label">
                                    Check me out
                                </label>
                            </div>}


                            <button className="mt-2 btn btn-primary ml-auto d-table">{btntxt}</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
