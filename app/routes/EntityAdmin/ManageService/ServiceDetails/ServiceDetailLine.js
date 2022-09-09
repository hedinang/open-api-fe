/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useState } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PropTypes from "prop-types";
import {
    Row,
    Col,
    Button,
    Input
} from "components";
import { makeStyles } from "@material-ui/core/styles";
import ServiceRequestHeader from './ServiceRequestHeader'
import ServiceRequestParam from './ServiceRequestParam'
import SystemService from "services/SystemService";
import CryptoJS from 'crypto-js'
import fetchToCurl from 'fetch-to-curl';

const useStyles = makeStyles({
    "custom-nav": {
        "&.nav-tabs": {
            borderBottom: "2px solid #DEE2E6"
        },
        "&.nav": {
            padding: "0 16px"
        },
        "&.nav-tabs .nav-link": {
            marginBottom: "-2px",
            border: "2px solid transparent"
        },
        "&.nav-tabs .nav-link.active, &.nav-tabs .nav-item.show .nav-link": {
            borderColor: "#DEE2E6 #DEE2E6 #FFF"
        }
    },
    "custom-card": {
        "&.card": {
            border: 0,
            borderRadius: 0
        }
    }
});

const RequestBody = (props) => {
    let { curl, requestUrl, responseBody } = props
    return (<>
        <Row xs="12" className="d-flex mx-0">
            <div style={{ height: '40px', fontSize: '14px', marginTop: '20px' }}>Responses</div>
        </Row>
        <Row xs="12" className="d-flex mx-0">
            <div style={{ fontSize: '13px' }}>Curl</div>
        </Row>
        <Row xs="12" className="d-flex mx-0">
            <Input style={{ backgroundColor: 'black', color: 'white', height: '300px' }}
                type="textarea"
                value={curl}
            />
        </Row>
        <Row xs="12" className="d-flex mx-0">
            <div style={{ fontSize: '13px' }}>Request URL</div>
        </Row>
        <Row xs="12" className="d-flex mx-0" style={{
            height: '55px', backgroundColor: 'black',
            color: 'white', borderRadius: '3px'
        }}>
            <div style={{ height: '25px', fontSize: '14px', margin: '15px 0px 0px 15px' }}>
                {requestUrl}</div>
        </Row>
        <Row xs="12" className="d-flex mx-0">
            <div style={{ fontSize: '13px' }}>Server response</div>
        </Row>
        <Row xs="12" className="d-flex mx-0" style={{
        }}>
            <Col xs="12">
                <Row xs="12" className="d-flex mx-0" style={{ marginTop: '5px', borderBottom: '2px' }}>
                    <Col xs='2'>
                        Code
                    </Col>
                    <Col xs='10'>
                        <div>Details</div>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row xs="12" className="d-flex mx-0" style={{
            backgroundColor: '#e9f6f0'
        }}>
            <Col xs="12">
                <Row xs="12" className="d-flex mx-0" style={{ marginTop: '5px', borderBottom: '2px' }}>
                    <Col xs='1'>
                        200
                    </Col>
                    <Col xs='11'>
                        <Row >
                            <div style={{ fontSize: '13px' }}>
                                Response body
                            </div>
                        </Row>
                        <Row>
                            <Input style={{ backgroundColor: 'black', color: 'white', height: '460px' }}
                                type="textarea"
                                value={responseBody}
                                disabled
                            />
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    </>)
}

const ServiceDetailLine = (props) => {
    const {
        serverUrl,
        method,
        title,
        defaultExpanded,
        borderTopColor,
        encrypt,
        requestParams,
        requestHeaders,
        requestBody,
        appKey
    } = props;
    let [responseBody, setResponseBody] = useState('')
    let [header, setHeader] = useState(requestHeaders)
    let [param, setParam] = useState(requestParams)
    let [curl, setCurl] = useState('')


    let onChangeHeader = (key, value) => {
        header.forEach(e => {
            if (e.name === key) e.default = value.target.value
        });
        setHeader((prevState) => [...prevState])
    }
    let onChangeParam = (key, value) => {
        param.forEach(e => {
            if (e.name === key) e.default = value.target.value
        });
        setParam((prevState) => [...prevState])
    }


    let requestUrl = serverUrl + title
    let execute = async () => {
        let data = JSON.parse(requestBody)
        let headers = requestHeaders.reduce(
            (obj, item) => Object.assign(obj, { [item.name]: item.default }), {});
        headers.token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMzgiLCJpYXQiOjE2NjI2NTc2NDQsImV4cCI6MTY2MzI2MjQ0NH0.NoNZYTUtqcdTCOk0TCpzDBUrG71UUMPs0iCl9VtIIUF3Mc59LfPWSEw99pRAF2xwpw7rgzT8CMpGDKwERIpKag"
        headers.isTokenRide = headers.isTokenRide.toString()
        const config = {
            headers: headers
        };
        // check encrypt
        let encrytion = checkEncrypt(encrypt, requestBody, headers, data, appKey)
        headers = encrytion.headers
        data = encrytion.data

        curl = fetchToCurl({
            url: requestUrl,
            headers: headers,
            method: 'post',
            body: data
        })
        setCurl(curl)
        const response = await SystemService.execute(requestUrl, data, config, method)
        setResponseBody(JSON.stringify(response.data, null, "\t"))
        setIsExecute(true)

    }
    let [isExecute, setIsExecute] = useState(false)
    let checkEncrypt = (encrypt, requestBody, headers, data, appKey) => {
        switch (encrypt) {
            case 'token':
                var str = requestBody + appKey
                var sign = CryptoJS.MD5(str) + "";
                headers.sign = sign
                var base64RawData =
                    CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(requestBody));
                data = {
                    "data": base64RawData
                };
                return {
                    headers: headers,
                    data: data
                }
            default:
                return {
                    headers: headers,
                    data: data
                }
        }

    }

    return (
        <Accordion style={{ border: `2px solid ${borderTopColor}` }} defaultExpanded={defaultExpanded}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                style={{ borderBottom: `2px solid ${borderTopColor}` }}
            >
                <Typography style={{ width: '100%', }}>
                    <Row xs='12'>
                        <Col xs='4'>
                            <Button className="btn btn-primary" style={{
                                color: 'white', backgroundColor: '#49cc90'
                            }}>
                                {method}
                            </Button>
                            <span style={{ paddingLeft: '20px' }}>{title}</span>
                        </Col>
                        <Col xs='5'>

                        </Col>
                        <Col xs='2'>
                            {encrypt ?
                                <Button className="btn btn-primary" style={{ backgroundColor: 'red', color: 'white', }}>ENCRYPT</Button> : <></>}
                        </Col>
                        <Col xs='1'>
                        </Col>
                    </Row>
                </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ display: "block", padding: 0 }}>
                <Row xs="12" className="d-flex mx-0" >
                    <Col xs="12">
                        <Row xs="12" className="d-flex mx-0">
                            <Col xs="12">
                                <Row xs="12" className="d-flex mx-0" style={{ marginTop: '5px', borderBottom: '2px' }}>
                                    <Col xs='2'>
                                        <Button style={{
                                            color: 'black', fontSize: '14px', backgroundColor: 'white'
                                            , borderTop: 'none', borderLeft: 'none', borderRight: 'none'
                                            , borderWidth: '5px', borderColor: '#49cc90', borderRadius: 'unset'
                                        }}>
                                            Parameters
                                        </Button>
                                    </Col>
                                    <Col xs='9'>
                                    </Col>
                                    <Col xs='1'>
                                        <Button btn btn-primary style={{
                                            color: 'white', backgroundColor: '#4ecb93'
                                        }}>
                                            Edit
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row xs="12" className="d-flex mx-0" style={{
                            backgroundColor: '#e9f6f000'
                        }}>
                            <Col xs="12">
                                <Row xs="12" className="d-flex mx-0" style={{ marginTop: '5px', borderBottom: '2px' }}>
                                    <Col xs='2'>
                                        Name
                                    </Col>
                                    <Col xs='10'>
                                        Description
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        {header.map(e => <ServiceRequestHeader requestHeader={e} onChangeHeader={onChangeHeader} />)}
                        {param.map(e => <ServiceRequestParam requestParam={e} onChangeParam={onChangeParam} />)}
                        <Row xs="12" className="d-flex mx-0">
                            <div style={{ fontSize: '14px' }}>Request body</div>
                        </Row>
                        <Row xs="12" className="d-flex mx-0">
                            <Input style={{ color: 'black', height: '300px' }}
                                type="textarea"
                                value={requestBody}
                                height='100px'
                            />
                        </Row>
                        <Row xs="12" className="d-flex mx-0" style={{
                        }}>
                            <Col xs="12">
                                <Row xs="12" className="d-flex mx-0" style={{ marginTop: '5px', borderBottom: '2px' }}>
                                    <Col xs='6'>
                                        <Button style={{
                                            color: 'white', fontSize: '14px', backgroundColor: '#4990e2', width: '100%'
                                        }}
                                            onClick={execute}
                                        >
                                            Execute
                                        </Button>
                                    </Col>
                                    <Col xs='6'>
                                        <Button style={{
                                            color: 'black', fontSize: '14px', backgroundColor: 'white', width: '100%'
                                        }}>
                                            Clear
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        {
                            isExecute ? <RequestBody curl={curl} requestUrl={requestUrl} responseBody={responseBody} /> : <></>

                        }
                    </Col>
                </Row>

            </AccordionDetails>
        </Accordion>
    );
};

ServiceDetailLine.propTypes = {
    title: PropTypes.string.isRequired,
    activeTab: PropTypes.number.isRequired,
    setActiveTab: PropTypes.func.isRequired,
    sendConversation: PropTypes.func.isRequired,
    addNewRowAttachment: PropTypes.func.isRequired,
    rowDataConversation: PropTypes.instanceOf(Array).isRequired,
    pageSizeConversation: PropTypes.number,
    gridHeightConversation: PropTypes.number,
    rowDataAttachment: PropTypes.instanceOf(Array).isRequired,
    pageSizeAttachment: PropTypes.number,
    gridHeightAttachment: PropTypes.number,
    onDeleteAttachment: PropTypes.func.isRequired,
    onAddAttachment: PropTypes.func.isRequired,
    onCellEditingStopped: PropTypes.func.isRequired,
    defaultExpanded: PropTypes.bool,
    borderTopColor: PropTypes.string
};
ServiceDetailLine.defaultProps = {
    pageSizeConversation: 10,
    gridHeightConversation: 300,
    pageSizeAttachment: 10,
    gridHeightAttachment: 300,
    defaultExpanded: false,
    borderTopColor: "#AEC57D"
};

export default ServiceDetailLine;
