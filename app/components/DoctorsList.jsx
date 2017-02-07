var React = require("react");

module.exports = React.createClass({
    render: function () {
        return (
            <div className="panel ">
                {/*<!--<div className="panel-heading">
                    {this.props.info.name}
                </div>
                <div className="panel-body">
                    {this.props.info.post}
                    <br />
                    {this.props.info.clinic[0].name}
                </div>-->*/}


                <div className="panel-group">
                    <div id="doc1" className="panel">
                        <div className="panel-body">
                            <div className="docterDetails">
                                <div className="doctor"><img src={this.props.info.image} alt="" />
                                    <span className="name">{this.props.info.name}</span>
                                    <br /><span className="post">{this.props.info.post}
                                        <br />{this.props.info.education}
                                        <br />{this.props.info.exp}  Years EXP</span></div>
                            </div>
                            <div className="appoinment">
                                <button type="submit" className="btn btn-primary pointer">Make Appointment</button>
                            </div>
                            <div className="clearfix"></div>
                            <hr />
                            <div className="locations">
                                <div className="left loc1"><span className="name"></span><br /><span className="addr"></span>
                                    <div className="timings">
                                        <div className="weekday"><span className="left"></span><span className="right"></span>
                                            <div className="clearfix"></div>
                                        </div>
                                        <div className="weekend"><span className="left">Saturday - Sunday: </span><span className="right">&nbsp09:00 AM - 08:00 PM</span></div>
                                        <div className="clearfix"></div>
                                        <p className="costs">' INR/hours'</p>
                                    </div>
                                </div>
                                <div className="vertical-line"></div>
                                <hr className="locHr" />
                                <div className="loc2"><span className="name"></span><br /><span className="addr"></span>
                                    <div className="timings">
                                        <div className="weekday"><span className="left"></span><span className="right"></span>
                                            <div className="clearfix"></div>
                                        </div>
                                        <div className="weekend"><span className="left">Saturday - Sunday: </span><span className="right">&nbsp09:00 AM - 08:00 PM</span></div>
                                        <div className="clearfix"></div>
                                        <p className="costs">' INR/hours'</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>




            </div>
        )
    }
})