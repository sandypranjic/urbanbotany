import React, { Component } from 'react';
import './sass/app.scss';

class PageNavigation extends Component {
    render() {
        return(
            <React.Fragment>
                <div className="pageNavigation">

                    <div className="backArrow">
                        {this.props.currentPageProp === 1 ? <span className="greyedOutArrow" onClick={this.props.previousPageFunction}><i className="fas fa-angle-double-left"></i></span> : <span className="backArrowSpan" onClick={this.props.previousPageFunction}><i className="fas fa-angle-double-left"></i></span>}
                    </div>

                    <div className="forwardArrow">
                        {this.props.currentPageProp < Math.ceil(this.props.plantsProp.length / this.props.plantsPerPage) ? <span className="forwardArrowSpan" onClick={this.props.nextPageProp}><i className="fas fa-angle-double-right"></i></span> : <span className="greyedOutArrow" onClick={this.props.nextPageProp}><i className="fas fa-angle-double-right"></i></span>}

                    </div>

                </div>
            </React.Fragment>
        )
    }
}

export default PageNavigation;