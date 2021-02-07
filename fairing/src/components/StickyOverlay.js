import React, {Component} from 'react';
import _ from "lodash";
import {Visibility} from "semantic-ui-react";
import PropTypes from 'prop-types'

class StickyOverlay extends Component {
    /**
     * This component can be used to produce sticky elements.
     * This element will then be attached at the top.
     * To have a offset between the top and the element one must provide an offset-value.
     * @type {{offset: Validator<NonNullable<number>>, children: Validator<NonNullable<NonNullable<InferType<Requireable<({} | ReactElementLike | ReactNodeArray | string | number | boolean | null | undefined)[]>|Requireable<ReactNodeLike>>>>>}}
     */
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]).isRequired,
        offset: PropTypes.number.isRequired
    };

    /**
     * This component makes one or more element, given via the props, stick at the top while scrolling.
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            overlayFixed: false,
        }
        this.overlayStyle = {
            float: 'top',
            width: "100%"
        }
        this.fixedOverlayStyle = {
            ...this.overlayStyle,
            position: 'fixed',
            top: this.props.offset.toString().concat("px"),
            zIndex: 5,
        }
    }

    /**
     * This method will set the screen bounding to the state of this component.
     * It is used to determine the bounding of the screen for creating an sticky element.
     * @param context
     */
    handleOverlayRef = (context) => {
        if (!this.overlayStyle.overlayRect) {
            this.setState({overlayRect: _.pick(context.getBoundingClientRect(), 'height', 'width')})
        }
    }

    /**
     * This method returns the sticky element.
     * To detect if the element has passed the area of non-stickiness the visibility is used alongside the local
     * reference before the actual children.
     * @returns {JSX.Element}
     */
    render() {
        const {overlayFixed, overlayRect} = this.state
        return (
            <div>
                <Visibility
                    offset={this.props.offset}
                    once={false}
                    onTopPassed={() => this.setState({overlayFixed: true})}
                    onTopVisible={() => this.setState({overlayFixed: false})}
                    style={overlayFixed ? {...this.overlayStyle, ...overlayRect} : {}}
                />
                <div ref={this.handleOverlayRef} style={overlayFixed ? this.fixedOverlayStyle : this.overlayStyle}>
                    {this.props.children}
                </div>
            </div>

        );
    }
}

export default StickyOverlay;