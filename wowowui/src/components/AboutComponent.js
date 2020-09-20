import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media } from 'reactstrap';
import { Link } from 'react-router-dom';

function About(props){
    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>About Us</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3><b>About Us</b></h3>
                    <hr className="seperation" />
                </div>                
            </div>
            <div className="row row-content">
                <div className="col-12 col-md-5">
                    <h3>Our Website</h3>
                    <p>Our website is a secondhand book and furniture trading platform for the convenience of students. The function of the website will allow sellers to post detailed information about the items such as pictures and descriptions. Students can also log in to their accounts and look for books or furniture that they are interested in buying. There will also be a chatbot that is available to both sellers and buyers when they encounter problems. The project’s goal is to give students a smooth transition experience from one resident to another.</p>
                </div>
                <div className="col-12 col-md-7">
                    <Card>
                        <CardHeader className="bg-primary text-white"><b>Our Team</b></CardHeader>
                        <CardBody>
                            <dl className="row p-1">
                                <dt className="col-7">Full Stack Web Designer</dt>
                                <dd className="col-5">Qiwen Luo</dd>
                                <dt className="col-7">Recommendation System Designer</dt>
                                <dd className="col-5">Peifeng Hu</dd>
                                <dt className="col-7">Credit Model Designers</dt>
                                <dd className="col-5">Lina Dong & Ruyuan Zuo</dd>
                                <dt className="col-7">Chatbot Designer</dt>
                                <dd className="col-5">Tianxin Jiang</dd>
                            </dl>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default About;