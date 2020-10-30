import React, { Component } from "react";
import PolicyDataService from "../services/policy-data.service";

export default class PoliciesList extends Component {
    // what to render
    // initial state of the Componentwhat 
    // what to do as things inside the component changes

    constructor(props) {
        super(props);
        this.retrievePolicies = this.retrievePolicies.bind(this);
        this.setActivePolicy = this.setActivePolicy.bind(this);
        this.state = {
            policies: [],
            currentPolicy: null,
            currentIndex: -1
        };
    }

    componentDidMount() {
        this.retrievePolicies();
    }

    //call to the API
    retrievePolicies() {
        PolicyDataService.getAll()
            .then(res => {
                this.setState({
                    policies: res.data
                })
            })
            .catch(error => {
                console.log(error);
            });

    }

    setActivePolicy(policy, index) {
        this.setState({
            currentPolicy: policy,
            currentIndex: index
        });



    }

    render() {
        return (
            <div>

                <div>
                    <ul>
                        {this.state.policies.map((policy, index) =>
                            <li
                                onClick={() => this.setActivePolicy(policy, index)}
                                key={index}

                            >{policy.holder_first_name} {policy.holder_last_name} - {policy.name} {index} </li>)}
                    </ul>
                </div>

                <div>
                    {this.state.currentPolicy ?
                        <div>

                            <div>
                                <label><strong>Policy Name:</strong> </label> {""} {this.state.currentPolicy.name} </div>
                            <div>
                                <label><strong> Policy Holder: </strong></label>  {""} {this.state.currentPolicy.holder_first_name} {this.state.currentPolicy.holder_last_name} </div>
                            <div> 
                                <label><strong>Is policy active? </strong></label>  {""} {this.state.currentPolicy.is_active ? "Yes" : "No"}</div>
                            <div>
                                <label><strong> Is there an active claim? </strong></label> {""}  {this.state.currentPolicy.has_active_claim ? "Yes" : "No"}</div>
                            <div> 
                                <label><strong>Policy effective date: </strong></label> {""} {new Date(this.state.currentPolicy.effective_date).toString()}
                               
                             </div>
                            <div>
                                <label><strong> Policy termination date: </strong></label> {""} <span 
                                className="date timeago" title={ this.state.currentPolicy.termination_date }>
                                {new Intl.DateTimeFormat('en-GB', { 
                                    month: 'long', 
                                    day: '2-digit',
                                    year: 'numeric', 
                                }).format(new Date(this.state.currentPolicy.termination_date))}
                             </span></div>

                        </div>

                        : <div> Please click on a Policy</div>
                    }
                </div>

            </div>
        )
    }
}