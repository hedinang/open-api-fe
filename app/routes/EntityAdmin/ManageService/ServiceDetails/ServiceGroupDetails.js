import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import {
    Col
} from "components";
import ServiceDetailLine from "./ServiceDetailLine";
const ServiceGroupDetails = (props) => {
    const { groupService, serverUrl, requestBody } = props
    const { t } = useTranslation();
    return (
        <Col lg={12} style={{ paddingTop: '10px' }}>
            <div style={{ fontSize: '24px' }}>{groupService.name}</div>
            {groupService.api.map(e => {
                return <ServiceDetailLine
                    title={e.title}
                    method={e.method}
                    // defaultExpanded
                    borderTopColor={e.borderTopColor}
                    encrypt={e.encrypt}
                    requestHeaders={e.requestHeaders}
                    requestParams={e.requestParams}
                    serverUrl={serverUrl}
                    requestBody={e.requestBody}
                    appKey={e.appKey}
                // disabled={!purchaseDetailsStates.isEdit}
                />
            })}
        </Col>
    )

}
export default ServiceGroupDetails;