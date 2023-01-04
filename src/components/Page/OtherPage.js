import { Breadcrumb, Col, Row, theme } from "antd";
import Category from "../Other/Category";
import Brand from "../Other/Brand";
import Role from "../Other/Role";


const OtherPage = () => {

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <>
            <Breadcrumb
                style={{
                    margin: "16px 0",
                }}
            >
                <Breadcrumb.Item>Other</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>

            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                }}
            >
                <Row gutter={[24, 16]}>
                    <Col span={12} >
                        <h3>Category:</h3>
                        <Category />
                    </Col>
                    <Col span={12} >
                        <h3>Brand:</h3>
                        <Brand />
                    </Col>
                    <Col span={12} >
                        <h3>Role:</h3>
                        <Role />
                    </Col>
                    
                </Row>


            </div>
        </>
    )

}

export default OtherPage;