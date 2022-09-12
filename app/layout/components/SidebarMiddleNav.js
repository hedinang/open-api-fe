/* eslint-disable no-unused-vars */
import React from "react";
import { SidebarMenu } from "../../components";

const SidebarMiddleNav = ({ items, userDetails, permissionReducer }) => {
    const sidbarItems = [{
        id: '1',
        icon: 'fa fa-fw fa-home',
        title: 'Service List',
        path: '/system-service/service-list'
    },
    {
        id: '1',
        icon: 'fa fa-fw fa-home',
        title: 'Service Create',
        path: '/system-service/service-create'
    }, {
        id: '1',
        icon: 'fa fa-fw fa-home',
        title: 'Service Detail',
        path: '/system-service/service-detail'
    }
        , {
        id: '1',
        icon: 'fa fa-fw fa-home',
        title: 'Api Create',
        path: '/system-service/api-create'
    }]
    return (
        <SidebarMenu>
            {sidbarItems ? sidbarItems.map(item => (

                <SidebarMenu.Item
                    key={item.id}
                    icon={<i className={item.icon} />}
                    title={item.title}
                    to={item.path.toString()}
                />

            )) : (<></>)}



        </SidebarMenu>
    );
};

export default SidebarMiddleNav;
