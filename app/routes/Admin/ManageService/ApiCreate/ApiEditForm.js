import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import {
    Card, CardBody, CardHeader, FormGroup, Col, Row, Button, SelectInput, Label, Input, HorizontalInput
} from "components";
import { formatDateTime } from "helper/utilities";
import CUSTOM_CONSTANTS from "helper/constantsDefined";
import Select from "react-select";
import SystemService from "services/SystemService";
const ApiEditForm = (props) => {
    const { t } = useTranslation();
    const {
        isCreate,
        isEdit,
        values,
        setFieldValue,
        dataDetail

    } = props;
    let isChange = false;
    if (isEdit || isCreate) {
        isChange = true;
    }
    const SingleValue = ({ data, ...props }) => {
        return (<div>{data.value}</div>);
    };

    const [serviceList, setServiceList] = useState([])
    const [groupList, setGroupList] = useState([])
    const [methodList, setMethodList] = useState([])
    const [encryptList, setEncryptList] = useState([])
    const changeApiName = (e) => {
        setFieldValue('apiName', e.target.value)
    }
    const changeGroup = (e) => {
        setFieldValue('group', e.value)
    }
    const changeSystem = (e) => {
        setFieldValue('serviceId', e.value)
        listGroup(e.value)
    }

    const changeEncryption = (e) => {
        setFieldValue('encryption', e.value)
    }
    const changeMethod = (e) => {
        setFieldValue('method', e.value)
        listGroup(e.value)
    }
    const changeRequestBody = (e) => {
        setFieldValue('defaultRequestBody', e.value)
    }
    const listApiMethod = async () => {
        let response = await SystemService.listApiMethod();
        if (response.data.status === "OK") {
            let result = response.data.data
            setMethodList(result)
        }
    }
    const listEncryption = async () => {
        let response = await SystemService.listEncryption();
        if (response.data.status === "OK") {
            let result = response.data.data
            setEncryptList(result)
        }
    }
    const listService = async () => {
        let response = await SystemService.listService();
        if (response.data.status === "OK") {
            let result = response.data.data
            setServiceList(result)
            setGroupList([])
        }
    }
    const listGroup = async (systemId) => {
        let response = await SystemService.listGroup(systemId);
        if (response.data.status === "OK") {
            let result = response.data.data
            setGroupList(result)
        }
    }
    useEffect(() => {
        listGroup(values.serviceId)

    }, [values.serviceId])
    useEffect(() => {
        listApiMethod()
        listEncryption()
        listService()
    }, [])

    const systemFilter = (serviceId) => {
        let e = serviceList.find(e => e?.id === serviceId)
        return {
            key: e?.id,
            value: e?.name
        }
    }
    const groupFilter = (groupId) => {
        let e = groupList.find(e => e?.id === groupId)
        return {
            key: e?.id,
            value: e?.groupName
        }
    }

    return (
        <>
            <Card>
                <CardBody className="p-4">
                    <FormGroup>
                        <Row xs='12'>
                            <Col xs='6'>
                                <Row xs='12'>
                                    <Col xs="4" md="4">
                                        <Label
                                        >
                                            {t("Api Name")}
                                        </Label>
                                    </Col>
                                    <Col xs="8" md="8">
                                        <Input
                                            type="text"
                                            defaultValue={values?.name}
                                            onChange={changeApiName}
                                        />
                                    </Col>
                                </Row>
                                <Row xs='12'>
                                    <Col xs="4" md="4">
                                        <Label
                                        >
                                            {t("Service Name")}
                                        </Label>
                                    </Col>
                                    <Col xs="8" md="8">
                                        <Select
                                            onChange={(e) => changeSystem(e)}
                                            options={serviceList.map((element) => ({
                                                label: element.name,
                                                value: element.id
                                            }))}
                                            isSearchable
                                            components={{ SingleValue }}
                                            value={systemFilter(values.serviceId)}
                                        />
                                    </Col>
                                </Row>
                                <Row xs='12'>
                                    <Col xs="4" md="4">
                                        <label
                                        // htmlFor="userName"
                                        // className={classes.inputText1}
                                        >
                                            {t("Encrytion")}
                                        </label>
                                    </Col>
                                    <Col xs="8" md="8" className="label-required">
                                        <Select
                                            components={{ SingleValue }}
                                            onChange={changeEncryption}
                                            options={encryptList.map((element) => ({
                                                label: element.name,
                                                value: element.name
                                            }))}
                                            isSearchable
                                            value={{
                                                key: values?.encryptionType,
                                                value: values?.encryptionType
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row xs='12'>
                                    <Col xs="4" md="4">
                                        <label
                                        // htmlFor="userName"
                                        // className={classes.inputText1}
                                        >
                                            {t("Method")}
                                        </label>
                                    </Col>
                                    <Col xs="8" md="8" className="label-required">
                                        <Select
                                            components={{ SingleValue }}
                                            onChange={changeMethod}
                                            options={methodList.map((element) => ({
                                                label: element.name,
                                                value: element.name
                                            }))}
                                            isSearchable
                                            value={{
                                                key: values?.method,
                                                value: values?.method
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="4" md="4">
                                        <Label
                                        >
                                            {t("Group")}
                                        </Label>
                                    </Col>
                                    <Col xs="8" md="8" className="label-required">
                                        <Select
                                            components={{ SingleValue }}
                                            onChange={(e) => { changeGroup(e) }}
                                            options={groupList.map((element) => ({
                                                label: element.groupName,
                                                value: element.id
                                            }))}
                                            isSearchable
                                            value={groupFilter(values?.groupId)}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs="6" md="6">
                                <HorizontalInput
                                    name="defaultRequestBody"
                                    label={t("Default request body")}
                                    type="textarea"
                                    maxLength={3000}
                                    placeholder={t("Enter default request body")}
                                    // errors={errors.note}
                                    rows={10}
                                    // touched={touched.note}
                                    className="mb-0"
                                    value={values?.requestBody}
                                // disabled={disabled}
                                // onChange={changeRequestBody}

                                />
                            </Col>
                        </Row>


                    </FormGroup>
                </CardBody>
            </Card>
        </>
    );
};

ApiEditForm.propTypes = {
    isCreate: PropTypes.bool.isRequired,
    isEdit: PropTypes.bool.isRequired,
    form: PropTypes.instanceOf(Object).isRequired,
    updateForm: PropTypes.func.isRequired
};

export default ApiEditForm;
