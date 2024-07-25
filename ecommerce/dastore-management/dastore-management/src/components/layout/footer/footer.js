import React from 'react';
import { Layout } from 'antd';

const { Footer} = Layout;

function _Footer(){

    return(
        <Footer style={{
            marginLeft: 230,
            textAlign: 'center'}}>
            Copyright@ 2023 Created by Green Pharmacy
        </Footer>
    );
}

export default _Footer;