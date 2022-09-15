/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef, useState } from "react";
import {
    Row,
    Col,
    Input,
    // CustomInput
} from "components";
import { Checkbox } from "primereact/checkbox";
const ServiceRequestHeader = (props) => {
    let { requestHeader, onChangeHeader, setFieldValue } = props
    let [header, setHeader] = useState(requestHeader)
    useEffect(() => {
        setHeader(requestHeader.default)
    }, [requestHeader.default])

    return (
        <Row xs="12" className="d-flex mx-0">
            <Col xs="12">
                <Row xs="12" className="d-flex mx-0" style={{ marginTop: '5px', borderBottom: '2px' }}>
                    <Col xs='2'>
                        {requestHeader.paramName} <br /> {requestHeader.dataType}<br /> ({requestHeader.paramType})
                    </Col>
                    <Col xs='4'>
                        {
                            requestHeader.autoGenerate ?
                                <Input style={{ color: 'black', }}
                                    type="text"
                                    value="AUTO GENERATE"
                                    disabled
                                // onChange={e => onChangeHeader(requestHeader.paramName, e, setFieldValue)}
                                /> :
                                <Input style={{ color: 'black', }}
                                    type="text"
                                    value={requestHeader.defaultValue}
                                    onChange={e => onChangeHeader(requestHeader.paramName, e, setFieldValue)}
                                />
                        }
                    </Col>
                    <Col xs='1'>
                        <Checkbox
                            type="checkbox"
                            checked={requestHeader.mandatory}
                            disabled
                        />
                    </Col>
                    <Col xs='5'>
                        <div>{requestHeader.note}</div>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
export default ServiceRequestHeader;