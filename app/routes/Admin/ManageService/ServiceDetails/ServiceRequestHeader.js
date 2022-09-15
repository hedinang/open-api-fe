/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef, useState } from "react";
import {
    Row,
    Col,
    Input
} from "components";
const ServiceRequestHeader = (props) => {
    let { requestHeader, onChangeHeader } = props
    let [header, setHeader] = useState(requestHeader)
    useEffect(() => {
        setHeader(requestHeader.default)
    }, [requestHeader.default])

    return (
        <Row xs="12" className="d-flex mx-0">
            <Col xs="12">
                <Row xs="12" className="d-flex mx-0" style={{ marginTop: '5px', borderBottom: '2px' }}>
                    <Col xs='2'>
                        {requestHeader.name} <br /> {requestHeader.type}<br /> (header)
                    </Col>
                    <Col xs='5'>
                        <Input style={{ color: 'black', }}
                            type="text"
                            value={header}
                            onChange={e => onChangeHeader(requestHeader.name, e)}
                        />
                    </Col>
                    <Col xs='5'>
                        <div>{requestHeader.description}</div>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
export default ServiceRequestHeader;