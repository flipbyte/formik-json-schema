import React, { Component } from 'react';

import { registerRenderer } from '../registry';
import { Form, Field } from './Element';


// class Tabs extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             activeTab: 1,
//             html: '',
//         };
//     }
//
//     _switchTab(event) {
//
//     }
//
//     _renderTabs() {
//         const {
//             schema: { tabs }
//         } = this.props;
//
//         return (
//             <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
//                 { Object.keys(tabs).map( (key) =>
//                     <a key={ key }
//                         className="nav-link"
//                         href="#v-pills-home"
//                         onClick={ (event) => _switchTab(event) }>{ tabs[key].label }</a>
//                 ) }
//             </div>
//         );
//     }
//
//     _renderTabContent() {
//         const { schema: }
//
//         return (
//             <div className="tab-content" id="v-pills-tabContent">
//                 <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">...</div>
//                 <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">...</div>
//                 <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">...</div>
//                 <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...</div>
//             </div>
//         );
//     }
//
//
//     render() {
//         const { title, fields } = schema;
//
//         return (
//             <Form formikProps={ formikProps }>
//                 { _renderTabs() }
//                 { _renderTabContent() }
//             </Form>
//         );
//     }
// }
//


// const Tabs = ({ schema, formikProps }) => {
//     const { title, fields } = schema;
//
//     return (
//         <Form formikProps={ formikProps }>
//             <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
//                 <a className="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</a>
//                 <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Profile</a>
//                 <a className="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Messages</a>
//                 <a className="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Settings</a>
//             </div>
//             <div className="tab-content" id="v-pills-tabContent">
//                 <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">...</div>
//                 <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">...</div>
//                 <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">...</div>
//                 <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...</div>
//             </div>
//         </Form>
//     );
// }

// registerRenderer('tabs', ( schema ) => ( formikProps ) =>
//     <Tabs schema={ schema } formikProps={ formikProps } />
// );
